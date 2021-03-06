import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    CustomersModule,
    MongooseModule.forRoot('mongodb://localhost/customers-nest-db')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
