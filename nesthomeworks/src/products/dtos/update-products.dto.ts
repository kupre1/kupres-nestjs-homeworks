export class UpdateProductsDto {
  readonly id: number;
  readonly category: string;
  readonly productName: string;
  readonly quantity: number;
  readonly price: number;
  readonly totalPrice: number;
}
