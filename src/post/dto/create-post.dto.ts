//post 생성시 client 에서 받아올 데이터

import { MarkerColor } from '../marker-color.enum';

export class CreatePostDto {
  latitude: number;
  longtitude: number;
  color: MarkerColor;
  adress: string;
  title: string;
  description: string;
  date: Date;
  score: number;
  imageUris: { uri: string }[];
}
