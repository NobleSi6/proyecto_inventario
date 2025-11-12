import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres', // Usa 'postgres' como tipo forzado
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'), // Asegúrate de que el .env tenga un valor numérico o conviértelo
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Solo para desarrollo; en producción, usa migraciones
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
      
    }),
    ReportsModule
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
