import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TopProductsDto } from './dto/top-products.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('top-products')
  // Tipificamos el retorno para reflejar el objeto que genera el service
  async getTopProducts(@Query() query: TopProductsDto): Promise<{ materialId: number, materialName: string, totalUsed: number }[]> { 
    return this.reportsService.getTopProducts(query);
  }
}