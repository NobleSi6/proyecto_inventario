import{IsNotEmpty,IsString, IsEmail, MinLength,MaxLength, IsIn} from 'class-validator';

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
    @MinLength(8,{message:'La contraseña debe tener al menos 8 caracteres'})
    password:string;

    @IsIn(['ADMINISTRADOR', 'SUPERVISOR', 'BODEGUERO', 'LECTOR'])
    rol: string = 'BODEGUERO'; // Valor por defecto


}