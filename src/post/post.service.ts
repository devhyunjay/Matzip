import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  //post 조회
  async getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;

    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.date', 'DESC')
      .take(perPage)
      .skip(offset);
  }

  //post 생성
  async createPost(createPostDto: CreatePostDto) {
    const {
      latitude,
      longtitude,
      color,
      address,
      title,
      description,
      date,
      score,
    } = createPostDto;

    const post = this.postRepository.create({
      latitude,
      longtitude,
      color,
      address,
      title,
      description,
      date,
      score,
    });

    try {
      //db 에 저장
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하던중 에러가 발생하였습니다.',
      );
    }
    return post;
  }
}
