import { registerAs } from '@nestjs/config';

import { JwtEnvironmentVariables } from './jwt-env.validation';
import { IJwtConfig } from './jwt-config.interface';
import { validateUtil } from 'src/common/validate.utils';

import { ConfigNamespacesEnum } from 'src/common/config-namespaces.enum';

export default registerAs(ConfigNamespacesEnum.APP, (): IJwtConfig => {
  validateUtil(process.env, JwtEnvironmentVariables);
  return {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiration: `${process.env.JWT_ACCESS_EXPIRATION_IN_SECONDS}s`,
    refreshTokenExpiration: `${process.env.JWT_REFRESH_EXPIRATION_IN_DAYS}d`,
  };
});
