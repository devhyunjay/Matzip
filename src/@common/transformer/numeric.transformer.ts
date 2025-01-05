export class ColumlnNumericTransformer {
  to(data: number) {
    return data;
  }
  //DB 에 숫자값이 문자열로 저장 또는 반환을 대비해 문자-> 숫자값으로 변환
  from(data: string) {
    return parseFloat(data);
  }
}
