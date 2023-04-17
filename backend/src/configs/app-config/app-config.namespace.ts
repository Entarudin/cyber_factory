import { registerAs } from '@nestjs/config';

import { AppEnvironmentVariables, Environment } from './app-env.validation';
import { IAppConfig } from './app-config.interface';
import { validateUtil } from 'src/common/validate.utils';

import { ConfigNamespacesEnum } from 'src/common/config-namespaces.enum';

export default registerAs(ConfigNamespacesEnum.APP, (): IAppConfig => {
  validateUtil(process.env, AppEnvironmentVariables);
  return {
    nodeEnv: process.env.APP_ENV,
    port: parseInt(process.env.BACKEND_ENV_PORT),
    isProd: process.env.APP_ENV === Environment.prod,
  };
});
