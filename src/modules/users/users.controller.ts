import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, TokenDto, LoginDto } from './user.dto';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { HashService } from '../services/hash.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('User')
@Controller('users')
export class UsersController {


    constructor(public userService: UserService, public hashService: HashService, private jwtService: JwtService) {}

    @Post('/create')
    @ApiCreatedResponse({
        type: TokenDto,
    })
    async createUser(@Body() body: CreateUserDto ): Promise<any>  {
        let user = await this.userService.findOne({ email: body.email })

        if(user) {
            throw new HttpException('User Already Exists', HttpStatus.UNAUTHORIZED);
        }

        if(body.password != body.password_verification) {
            throw new HttpException('Password Do Not Match', HttpStatus.UNAUTHORIZED);
        }

        user = new User()
        user.email = body.email;
        user.password = await this.hashService.hash(body.password)
        user.name = body.name;
        user.validated = false;

        user = await this.userService.create(user);

        const payload = { username: user.name, sub: user.id };

        return {
          access_token: this.jwtService.sign(payload),
        };

    }


    @Post('/login')
    @ApiCreatedResponse({
        type: TokenDto,
    })
    async login(@Body() body: LoginDto): Promise<any> {
        let user = await this.userService.findOne({ email: body.email })
        if(!user) {
            throw new HttpException('User Not Found', HttpStatus.UNAUTHORIZED);
        }

        const isValid = await this.hashService.compare(body.password, user.password)

        if(!isValid) {
            throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
        }

        const payload = { username: user.name, sub: user.id };

        return {
          access_token: this.jwtService.sign(payload),
        };
    }

}
