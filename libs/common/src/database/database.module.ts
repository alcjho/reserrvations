import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbname = configService.get('DBNAME');
        const dbport = configService.get('DBPORT');
        const dbhost = configService.get('DBHOST');
        return { uri: `mongodb://${dbhost}:${dbport}/${dbname}` };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
