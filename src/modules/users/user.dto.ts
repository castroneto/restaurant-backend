import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    password_verification: string;
}

export class TokenDto {
    @ApiProperty()
    token: string;
}


export class LoginDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}