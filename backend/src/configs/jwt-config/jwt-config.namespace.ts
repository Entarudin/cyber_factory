import { registerAs } from '@nestjs/config';

import { JwtEnvironmentVariables, IJwtConfig } from '@configs/jwt-config';
import { validateEnvironments } from '@common/validation/validate-environments';
import { ConfigNamespacesEnum } from '@common/constants/config-namespaces.enum';

export default registerAs(ConfigNamespacesEnum.JWT, (): IJwtConfig => {
  validateEnvironments(process.env, JwtEnvironmentVariables);
  return {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiration: `${process.env.JWT_ACCESS_EXPIRATION_IN_SECONDS}s`,
    refreshTokenExpiration: `${process.env.JWT_REFRESH_EXPIRATION_IN_DAYS}d`,
  };
});
