// api-gateway/src/app.controller.ts
import { Controller, All, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express'; // ← ¡import type!
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  private readonly services: Record<string, string>;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    // Validamos que las variables existan
    const proyectosUrl = this.getRequiredEnv('PROYECTOS_URL');
    const configuracionUrl = this.getRequiredEnv('CONFIGURACION_URL');
    const reportesUrl = this.getRequiredEnv('REPORTES_URL');
    const backendUrl = this.getRequiredEnv('BACKEND_URL');

    this.services = {
      '/proyectos': proyectosUrl,
      '/estados': configuracionUrl,
      '/reportes': reportesUrl,
      default: backendUrl,
    };
  }

  // Helper para obtener variables requeridas con error claro
  private getRequiredEnv(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Environment variable ${key} is missing`);
    }
    return value;
  }

  @All('*')
  async proxyRequest(@Req() req: Request, @Res() res: Response) {
    const path = req.path;
    let targetUrl = this.services.default;

    for (const [route, url] of Object.entries(this.services)) {
      if (route !== 'default' && path.startsWith(route)) {
        targetUrl = url;
        break;
      }
    }

    const fullUrl = `${targetUrl}${path}`;

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method as any,
          url: fullUrl,
          data: req.body,
          headers: req.headers,
          params: req.query,
        }),
      );

      res.status(response.status).json(response.data);
    } catch (error: any) {
      const status = error.response?.status || 500;
      const message = error.response?.data || { message: 'Error en el gateway' };
      res.status(status).json(message);
    }
  }
}