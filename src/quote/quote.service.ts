import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteUpdateDto } from './dto/update-quote.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto, userId: number): Promise<Quote> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const quote = this.quoteRepository.create({
      ...createQuoteDto,
      user: user,
    });
    return this.quoteRepository.save(quote);
  }

  async findAll(userId: number): Promise<Quote[]> {
    return this.quoteRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: number, userId: number): Promise<Quote | null> {
    const quote = await this.quoteRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!quote) {
      return null;
    }
    return quote;
  }

  async update(id: number, updateQuoteDto: QuoteUpdateDto, userId: number): Promise<Quote> {
    const existingQuote = await this.quoteRepository.findOne({
      where: { id, user: { id: userId } }, // Ensure user owns the quote
      relations: ['user'],
    });
    if (!existingQuote) {
      throw new NotFoundException('Quote not found');
    }

    // Update fields, but keep the original user association
    if (updateQuoteDto.quote !== null && updateQuoteDto.quote !== undefined) {
  existingQuote.quote = updateQuoteDto.quote;
}

if (updateQuoteDto.author !== null && updateQuoteDto.author !== undefined) {
  existingQuote.author = updateQuoteDto.author;
}


    return this.quoteRepository.save(existingQuote);
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const quote = await this.quoteRepository.findOne({ where: { id, user: { id: userId } } });
    if (!quote) {
      return false;
    }
    await this.quoteRepository.remove(quote);
    return true;
  }
}