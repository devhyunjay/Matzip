import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //post 조회
  @Get('/posts')
  getPosts() {
    return this.postService.getPosts();
  }

  //podt 생성
  // @Post('/posts')
  // createPost(@Body() createPostDto: CreatePostDto){
  //   return this.postService.createPost()
  // }
}
