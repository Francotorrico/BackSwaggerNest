import {Strategy, ExtractJwt} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoggedInUserData } from 'src/interfaces/authenticated-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'qwerty',
        })
    }

    public async validate(payload: LoggedInUserData) {
        return{
            id: payload.id,
            email: payload.email,
            type: payload.type,
            orgs: payload.orgs
        }
    }
}