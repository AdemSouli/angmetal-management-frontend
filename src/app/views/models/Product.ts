export class Product {
  productID!: number;
  name!: string;
  description!:string
  prixUnitaire!: number;
  quantiteEnStock!: number;
  taxe!: number;
  totalAmount!: number;
  selected?: boolean;
  selectedQuantity?: number;
}