import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prismaService.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prismaService.article.findMany({ where: { published: true } });
  }

  async findOne(id: number) {
    const article = await this.prismaService.article.findUnique({
      where: { id },
    });
    if (!article) {
      throw new NotFoundException(HttpStatus.NOT_FOUND, 'Artical not fount');
    }
    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prismaService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prismaService.article.delete({
      where: { id },
    });
  }
}
