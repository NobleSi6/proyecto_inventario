import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { TopProductsDto } from './dto/top-products.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('top-products')
  async getTopProducts(@Query() query: TopProductsDto) {
    return this.reportsService.getTopProducts(query);
  }
}