import { AddressItem, CartItem } from "../types/type";

export const mockAddresses: AddressItem[] = [
  {
    id: "1",
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  {
    id: "2",
    street: "456 Park Ave",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India"
  },
  {
    id: "3",
    street: "789 Green Rd",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    country: "India"
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    meal: {
      id: 12,
      title: "Butter Chicken",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=3084&auto=format&fit=crop",
      shortDescription: "Tender chicken in a rich, creamy tomato sauce",
      mealId: "",
      restaurantId: "",
      category: "",
      fullDescription: [],
      isPopular: false,
    },
    quantity: 2,
    mealId: "",
    email: "",
  },
  {
    id: 3,
    meal: {
      id: 3,
      title: "Paneer Tikka",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?q=80&w=3174&auto=format&fit=crop",
      shortDescription: "Marinated cottage cheese grilled to perfection",
      mealId: "",
      restaurantId: "",
      category: "",
      fullDescription: [],
      isPopular: false,
    },
    quantity: 1,
    mealId: "",
    email: "",
  },
  {
    id: 4,
    meal: {
      id: 4,
      title: "Veg Biryani",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=3174&auto=format&fit=crop",
      shortDescription: "Fragrant rice with mixed vegetables and spices",
      mealId: "",
      restaurantId: "",
      category: "",
      fullDescription: [],
      isPopular: false,
    },
    quantity: 1,
    mealId: "",
    email: "",
  },
];
