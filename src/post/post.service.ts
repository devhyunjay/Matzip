import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  //post 조회
  getPosts() {
    return ['임시 게시글'];
  }
}
