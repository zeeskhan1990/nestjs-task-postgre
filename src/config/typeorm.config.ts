import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config'

const dbConfig = config.get('db')
/**
 * RDS - Relational Database service. RDS is a service in AWS which would be used as the database
 * in production. Environment variable RDS_* would be provided by the elastic beanstalk service
 * which is the service we are going to use to deploy our application.
 * Synchronize should be true only for the first deploy so that the tables are automaticlaly made,
 * following which we don't want to keep on updating everytime while in production
 *
 * When we start the application in production, the TypeScript code is the transpiled into JavaScript.
 * Therefore, our entity files (*.entity.ts) will not be picked up by TypeORM.
 * Fixing this is easy. Simply change the "entities" configuration to this:Notice the {js,ts} part.
 * This means that both .js and .ts extensions will be picked up.
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    ssl: process.env.TYPEORM_SSL || dbConfig.ssl,
}
console.log(' ################# ')
console.log(dbConfig)
console.log(typeOrmConfig)
console.log(process.env.RDS_DB_NAME, process.env.RDS_NAME, process.env.RDS_USERNAME)