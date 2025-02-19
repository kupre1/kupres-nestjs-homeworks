import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { category, price, id } = value;

    const categories = ['boom', 'green', 'dogfood'];
    if (category && !categories.includes(category))
      throw new BadRequestException('wrong category provided');

    if (price && price <= 0)
      throw new BadRequestException('price is less than 0');

    if (id && (Number(id) < 0 || !Number(id)))
      throw new BadRequestException('id is not number or its less than 0 ');
    return value;
  }
}
