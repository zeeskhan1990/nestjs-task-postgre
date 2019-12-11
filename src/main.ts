import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'

/**
 * You can use dotenv and config.env file or, as used here npm lib 'config' and separate configs.
 * node-win-env works only in cmd and not powershell.
 * Using dotenv, the variables are directly set in process.env at runtime, with config lib the 
 * comfigs are to be separately retrieved.
 * with node-win-env, you can enter -> PORT=3005 npm run start:dev, and the value of PORT would be set in process.env
 * Another way is to modify "start:dev" script 'set PORT=3005&& nest start --watch'
 */

/**
 * You need to set CORS for the front end to be able to access the server at separate origin.
 * In development, we will set it to true so that anyone can access api
 * In production, we will maintain a whitelist
 */
async function bootstrap() {
  const serverConfig = config.get('server')
  console.log("Bootstrapping")
  console.log(process.env.NODE_ENV )
  const port = process.env.PORT || serverConfig.port
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  } else {
    app.enableCors({origin: serverConfig.origin})
  }

  await app.listen(port);
}
bootstrap();
