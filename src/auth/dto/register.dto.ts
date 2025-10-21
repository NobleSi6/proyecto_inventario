import{IsNotEmpty,IsString, IsEmail, MinLength,MaxLength, IsIn, IsOptional, IsInt} from 'class-validator';

export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

    @IsString()
    @MaxLength(100)
    apellido:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsOptional()
    @MaxLength(20)
    telefono: string;


    @IsString()
    @MinLength(8,{message:'La contraseña debe tener al menos 8 caracteres'})
    password:string;

    @IsInt()
    @IsOptional()
    idRol: number = 3;
    
}