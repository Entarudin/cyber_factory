import { registerAs } from '@nestjs/config';

import {
  AppEnvironmentVariables,
  Environment,
  IAppConfig,
} from '@configs/app-config';
import { validateEnvironments } from '@common/validation/validate-environments';
import { ConfigNamespacesEnum } from '@common/constants/config-namespaces.enum';

export default registerAs(ConfigNamespacesEnum.APP, (): IAppConfig => {
  validateEnvironments(process.env, AppEnvironmentVariables);
  return {
    nodeEnv: process.env.APP_ENV,
    port: parseInt(process.env.BACKEND_ENV_PORT),
    isProd: process.env.APP_ENV === Environment.prod,
  };
});
