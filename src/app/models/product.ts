export class Product {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  width: number;
  density: number;
  dollar_price: number;
  dollar_rate: number;
  width_shop: number;
  density_shop: number;
  weight_for_count: number;
  length_for_count: number;
  price_pre: number;
  image: string | any;
  image_url: string;

  constructor(obj: any) {
    this.id        = obj && obj.id         || null;
    this.name      = obj && obj.name       || '';
    this.price     = obj && obj.price      || 0;
    this.createdAt = obj && obj.created_at || null;
    this.updatedAt = obj && obj.updated_at || null;
    this.weight    = obj && obj.weight     || 0;
    this.width     = obj && obj.width      || 0;
    this.density   = obj && obj.density    || 0;
    this.dollar_price = obj && obj.dollar_price || 0;
    this.dollar_rate  = obj && obj.dollar_rate  || 0;
    this.width_shop = obj && obj.width_shop || 0;
    this.density_shop = obj && obj.density_shop || 0;
    this.weight_for_count = obj && obj.weight_for_count || 0;
    this.length_for_count = obj && obj.length_for_count || 1;
    this.price_pre = obj && obj.price_pre || 0;
    this.image      = obj && obj.image       || null;
    this.image_url = obj && obj.image_url || null;

  };

  price_rub_kg(): number {
      return 44;
  };

//  price_rub_m(): number {
//    return (this.dollar_price * this.dollar_rate /
//            (1000 / ((this.density / (100 * 100)) * this.width * 100)));
//  };

//  meters(): number {
//    return (this.weight / ((this.density * (this.width / 100)) / 1000));
//  };
  
//  density_count(): number {
//      return this.weight_for_count / this.length_for_count / (this.width / 100);
//    };
}

