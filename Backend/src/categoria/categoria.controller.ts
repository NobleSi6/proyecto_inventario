import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './categoria.entity'; // Asegúrate de importar la entidad

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateCategoriaDto): Promise<Categoria> { // Tipificar retorno
    return this.categoriaService.create(createDto);
  }

  @Get()
  findAll(): Promise<Categoria[]> { // Tipificar retorno
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> { // Usar Pipe
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, // Usar Pipe
    @Body() updateDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.remove(id); // Llama al soft delete
  }

  // DELETE /categorias/permanent/:id (Hard Delete, nuevo endpoint)
  // Nota: Deberías proteger esta ruta con guardas de autenticación/roles
  @Delete('permanent/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  hardRemove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.hardRemove(id); // Llama al hard delete
  }
}