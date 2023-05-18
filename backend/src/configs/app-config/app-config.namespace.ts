import { registerAs } from '@nestjs/config';

import {
  AppEnvironmentVariables,
  Environment,
  IAppConfig,
} from '@configs/app-config';
import { validateUtil } from '@common/validate.utils';
import { ConfigNamespacesEnum } from '@common/config-namespaces.enum';

export default registerAs(ConfigNamespacesEnum.APP, (): IAppConfig => {
  validateUtil(process.env, AppEnvironmentVariables);
  return {
    nodeEnv: process.env.APP_ENV,
    port: parseInt(process.env.BACKEND_ENV_PORT),
    isProd: process.env.APP_ENV === Environment.prod,
  };
});
