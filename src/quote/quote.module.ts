import { Module } from '@nestjs/common';
import { QuotesService } from './quote.service';
import { QuotesController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { UsersModule } from 'src/user/user.module';




@Module({
  imports: [TypeOrmModule.forFeature([Quote]), UsersModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuoteModule {}
