import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ParseIntPipe, Request, ForbiddenException } from '@nestjs/common';

import { CreateQuoteDto } from './dto/create-quote.dto';
import { QuoteUpdateDto } from './dto/update-quote.dto';
import { AuthGuard } from '@nestjs/passport'; // Use NestJS's built-in AuthGuard
import { Quote } from './entities/quote.entity';
import { QuotesService } from './quote.service';

@Controller('quotes')
@UseGuards(AuthGuard('jwt')) // Protect the whole controller with JwtAuthGuard
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto, @Request() req: any): Promise<Quote> {
    const userId = req.user.id;
    return this.quotesService.create(createQuoteDto, userId);
  }

  @Get(':userId')
async findAllByUserId(
  @Param('userId', ParseIntPipe) userIdParam: number,
  @Request() req: any,
): Promise<Quote[]> {
  const userId = req.user.id;

  if (userId !== userIdParam) {
    throw new ForbiddenException('You are not allowed to access this data');
  }

  return this.quotesService.findAll(userId);
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any): Promise<Quote> {
    const userId = req.user.id;
    const quote = await this.quotesService.findOne(id, userId);
    if (!quote) throw new NotFoundException('Quote not found');
    return quote;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteDto: QuoteUpdateDto,
    @Request() req: any,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const updated = await this.quotesService.update(id, updateQuoteDto, userId);
    if (!updated) throw new NotFoundException('Quote not found on update');
    return { message: 'Quote updated successfully' };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<{ message: string; deletedQuoteId: number }> {
    const userId = req.user.id;
    const deleted = await this.quotesService.remove(id, userId);
    if (!deleted) throw new NotFoundException('Quote not found');
    return { message: 'Quote deleted successfully', deletedQuoteId: id };
  }
}
