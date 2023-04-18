import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function useSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Cyber Factory')
    .addBasicAuth()
    .addBearerAuth()
    .setDescription(
      'Welcome! Using endpoints below to interact with api cyber factory',
    )
    .setContact(
      'Maksim Riazanov',
      'https://github.com/Entarudin',
      'riazanov@sfedu.ru',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1/docs', app, document, {
    customSiteTitle: 'Cyber Factory',
  });
}
