import { registerAs } from '@nestjs/config';

import { DatabaseEnvironmentVariables } from './app-env.validation';
import { validateUtil } from '../../common/validate.utils';
import { IDatabaseConfig } from './database-config.interface';
import { ConfigNamespacesEnum } from '../../common/config-namespaces.enum';

export default registerAs(
  ConfigNamespacesEnum.DATABASE,
  (): IDatabaseConfig => {
    validateUtil(process.env, DatabaseEnvironmentVariables);
    return {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    };
  },
);
