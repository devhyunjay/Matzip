import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      .skip(offset)
      .getMany();
  }

  //get post By id
  async getPostById(id: number) {
    try {
      const foundPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.id = :id', { id })
        .getOne();

      if (!foundPost) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return foundPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 가져오는 도중 에러가 발생했습니다.',
      );
    }
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

  //post 수정
  //id 에 해당하는 post 조회,바뀐 데이터로 변경 후 db 에 저장
  async updatePost(
    id: number,
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longditude' | 'address'>,
  ) {
    const post = await this.getPostById(id);
    const { color, title, description, date, score } = updatePostDto;

    post.title = title;
    post.description = description;
    post.color = color;
    post.date = date;
    post.score = score;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 수정하던중 에러가 발생하였습니다.',
      );
    }
    return post;
  }

  //post 삭제
  async deletePost(id: number) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .from('post')
        .where('post.id = :id', { id })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }
      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }
}
