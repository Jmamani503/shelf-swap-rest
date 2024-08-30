import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { ExchangeShelfModule } from './exchange-shelf/exchange-shelf.module';
import { SwapsModule } from './swaps/swaps.module';

@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shelf-swap',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,  // Habilita el logging de consultas SQL
    }), BooksModule, ExchangeShelfModule, SwapsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
