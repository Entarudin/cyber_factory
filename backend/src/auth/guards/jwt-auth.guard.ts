import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenExpiredException } from '../exceptions';
import { IJwtConfig } from '@/configs/jwt-config';
import { ConfigNamespacesEnum } from '@/common/constants/config-namespaces.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new AccessTokenExpiredException();
      }
      console.log(token);

      request.user = this.jwtService.verify(token, {
        secret: this.jwtConfig.accessTokenSecret,
      });

      return true;
    } catch (err) {
      throw new AccessTokenExpiredException();
    }
  }

  private readonly jwtConfig = this.configService.get<IJwtConfig>(
    ConfigNamespacesEnum.JWT,
  );
}
