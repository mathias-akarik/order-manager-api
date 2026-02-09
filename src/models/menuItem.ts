// In Memory Menu Model
//src/models/menu

export interface MenuItem {
    id: number | string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string
  }
  