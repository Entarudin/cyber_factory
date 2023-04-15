import { registerAs } from '@nestjs/config';

import { AppEnvironmentVariables } from './app-env.validation';
import { IAppConfig } from './app-config.interface';
import { validateUtil } from 'src/common/validate.utils';

export default registerAs('app', (): IAppConfig => {
  validateUtil(process.env, AppEnvironmentVariables);
  return {
    nodeEnv: process.env.APP_ENV,
    port: parseInt(process.env.BACKEND_ENV_PORT),
  };
});
