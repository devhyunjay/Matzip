import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'simplogis',
      database: 'mttzip-app',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      //  개발에서만 true
      synchronize: true,
    }),
    PostModule,
    AuthModule,
  ],
  controllers: [PostController],
  providers: [],
})
export class AppModule {}
