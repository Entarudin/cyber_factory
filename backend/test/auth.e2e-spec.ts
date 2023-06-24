import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

import { AuthLoginDto } from '@/auth/dtos';
import { CreateUserDto } from '@/users/dtos';

import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from './utils/constants';

const userDto: CreateUserDto = {
  email: TESTER_EMAIL,
  password: TESTER_PASSWORD,
  role: 'User',
};

const authLoginDto: AuthLoginDto = {
  email: TESTER_EMAIL,
  password: TESTER_PASSWORD,
};

describe('AuthController (e2e)', () => {
  const app = APP_URL;
  let refreshToken;

  it('/auth/registration (POST) - success', async () => {
    return request(app)
      .post('/auth/registration')
      .send(userDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }: request.Response) => {
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
      });
  });

  it('/auth/registration (POST) - failed (user with email exist) ', async () => {
    return request(app)
      .post('/auth/registration')
      .send(userDto)
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toBe('User with this email already exists');
      });
  });

  it('/auth/registration (POST) - failed (incorrect email) ', async () => {
    return request(app)
      .post('/auth/registration')
      .send({ ...userDto, email: 'test' })
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toBe('Bad Request Exception');
      });
  });

  it('/auth/login (POST) - success', async () => {
    return request(app)
      .post('/auth/login')
      .send(authLoginDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }: request.Response) => {
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        refreshToken = body.refreshToken;
      });
  });

  it('/auth/login (POST) - fail email', async () => {
    return request(app)
      .post('/auth/login')
      .send({ ...authLoginDto, email: 'test123@gmail.com' })
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toBe('Incorect login or password');
      });
  });

  it('/auth/login (POST) - fail password', async () => {
    return request(app)
      .post('/auth/login')
      .send({ ...authLoginDto, password: 'qwerty' })
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toBe('Incorect login or password');
      });
  });

  it('/auth/refresh (POST) - success', async () => {
    return request(app)
      .post('/auth/refresh')
      .send({ refreshToken })
      .expect(HttpStatus.CREATED)
      .then(({ body }: request.Response) => {
        expect(body.accessToken).toBeDefined();
        expect(body.refreshToken).toBeDefined();
        refreshToken = body.refreshToken;
      });
  });

  it('/auth/refresh (POST) - failed', async () => {
    return request(app)
      .post('/auth/refresh')
      .send({ refreshToken: '1234' })
      .expect(HttpStatus.UNAUTHORIZED)
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toBe(
          'The refresh token has expired or the token is not in the database',
        );
      });
  });

  it('/auth/logout (POST) - success', async () => {
    return request(app)
      .post('/auth/logout')
      .send({ refreshToken })
      .expect(HttpStatus.CREATED);
  });

  it('/auth/logout (POST) - failed', async () => {
    return request(app)
      .post('/auth/logout')
      .send({ refreshToken: '1234' })
      .expect(HttpStatus.NOT_FOUND)
      .then(({ body }: request.Response) => {
        expect(body.status).toBe(HttpStatus.NOT_FOUND);
        expect(body.message).toBe('Token Entity with refreshToken not found');
      });
  });
});
