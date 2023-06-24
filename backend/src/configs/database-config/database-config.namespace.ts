import { registerAs } from '@nestjs/config';

import {
  DatabaseEnvironmentVariables,
  IDatabaseConfig,
} from '@configs/database-config';
import { validateEnvironments } from '@common/validation/validate-environments';
import { ConfigNamespacesEnum } from '@common/constants/config-namespaces.enum';

export default registerAs(
  ConfigNamespacesEnum.DATABASE,
  (): IDatabaseConfig => {
    validateEnvironments(process.env, DatabaseEnvironmentVariables);
    return {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    };
  },
);
