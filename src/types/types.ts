// Interfaces for the Prisma models

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: IRole[];
  basket?: IBasket[] | null;
  createdAt: Date;
  updatedAt: Date;
  rentals?: IRental[] | null;
}

export enum IRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IProperty {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  availableFrom: Date;
  createdAt: Date;
  updatedAt: Date;
  rentals: IRental[];
  images: IImage[];
  rentalItems: IRentalItem[];
}

export interface IImage {
  id: number;
  url: string;
  propertyId: number;
  property: IProperty;
}

export interface IRentalItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  stock: number;
  propertyId: number;
  property: IProperty;
  rentals: IRental[];
  baskets: IBasket[];
}

export interface IRental {
  id: number;
  startDate: Date;
  endDate: Date;
  rentalItems: IRentalItem[];
  propertyId: number;
  property: IProperty;
  userId: number;
  user: IUser;
}

export interface IBasket {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
  user: IUser;
  product: IRentalItem;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
