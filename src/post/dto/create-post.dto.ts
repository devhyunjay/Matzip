//post 생성시 client 에서 받아올 데이터

import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MarkerColor } from '../marker-color.enum';

export class CreatePostDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longtitude: number;

  @IsNotEmpty()
  color: MarkerColor;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  score: number;

  @IsArray()
  imageUris: { uri: string }[];
}
