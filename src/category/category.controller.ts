import { Controller, Get, Post, Req, Render } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Controller('categories')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>
    ) {}

    @Get()
    index(): Promise<Category[]> {
        return this.categoryRepo.find()
    }

    @Get('list')
    @Render('category_list')
    async category_list() {
        const categories = await this.categoryRepo.find()
        return { layout: false, categories }
    }

    @Get('create')
    async category_create(): Promise<Category> {
        const category = await this.categoryRepo.create({ name: 'category teste' })
        return this.categoryRepo.save(category)
    }

    @Post()
    async store(@Req() request: Request): Promise<Category[]> {
        const category = await this.categoryRepo.create(request.body as any)
        return this.categoryRepo.save(category)
    }
}
