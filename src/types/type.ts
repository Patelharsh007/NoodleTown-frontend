export interface OrderItem {
  // itemId: number;
  id: string | number;
  itemName: string;
  image: string;
  quantity: number;
  price: number;
  itemTotal: number;
}

export interface Order {
  id: number;
  userId: number | string;
  orderedAt: Date | string;
  address: AddressItem;
  items: OrderItem[];
  subTotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  delivery: number;
  stripePaymentId: string;
  paymentStatus: PaymentStatus;
}

export type OrderStatus =
  | "completed"
  | "pending"
  | "cancelled"
  | "processing"
  | "shipped";

export type PaymentStatus = "completed" | "pending" | "failed";

export interface AddressItem {
  // id: number;
  id: string;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface NewAddress {
  id: string;
  recipientName: string;
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
  id: number | string;
  email: string;
  userName: string;
  profileImage: string;
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
