import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//importo
import {
  SwaggerModule,
   DocumentBuilder
  } from '@nestjs/swagger';
// import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { write, writeFileSync } from 'fs';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('ProductsTitle')
  .setDescription('The Product API description')
  .setVersion('1.0')
  //.addTag('ProductsTag')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'enter your JWT token',
  })
  .addSecurityRequirements('bearer')
  .build();

  const document = SwaggerModule.createDocument(app, options);


  SwaggerModule.setup('api/docs', app, document,{
    explorer: true, // activar explorador
    swaggerOptions:{
      filter:true, // filtrar la api
      showCommonExtensions:true, // cuanto tiempo tarda en responder la solilitud
    }
  });

  writeFileSync('./swagger.json',JSON.stringify(document,null,2));
  
  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.useGlobalGuards(jwtAuthGuard);

  app.useGlobalPipes(new ValidationPipe)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
