//Order-Item used in OrderSlice and OrderSummary
export interface OrderItem {
  id: number;
  user_email: string | null;
  orderedAt: Date | string;
  address: AddressItem;
  items: {
    // itemId: number;
    id: string;
    itemName: string;
    quantity: number;
    price: number;
    itemTotal: number;
  }[];
  subTotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  deliveryCharges: number;
}

export type OrderStatus =
  | "completed"
  | "pending"
  | "cancelled"
  | "processing"
  | "shipped";

//Adress used in AddressForm and addressSlice
export interface AddressItem {
  // id: number;
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface NewAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

//CartItem for CartSlice
export interface CartItem {
  id: number;
  mealId: string;
  email: string;
  quantity: number;
  meal: MealItem;
}

//AuthItem for AuthUserSlice
export interface AuthUserItem {
  isAuthenticated: boolean;
  id: number | null;
  email: string | null;
  userName: string | null;
  profileImage: string | null;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  profileImage: string | null;
  createdAt?: Date;
}

export interface MealItem {
  id: number;
  mealId: string;
  restaurantId: string;
  category: string;
  image: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  price: number;
  isPopular: boolean;
  restaurant?: RestaurantItem;
}

export interface RestaurantItem {
  id: number;
  restaurantId: string;
  title: string;
  logo: string;
  posterImages: string[];
  cuisines: string[];
  avgCostPerPerson: number;
  address: string;
  isOpen: boolean;
  timing: string;
  menuImages: string[];
  isFeatured: boolean;
  rating: number;
  meals?: MealItem[];
}

//removing after backend connected:
export interface CartItem1 {
  id: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  category: string;
  description?: string;
}
