import { AddressItem } from "../types/type";
import { axiosInstance } from "./axiosInstance";

//-----------+------------Menu Page----------------------------

//get Top Brands ---- Menu/tobrand
export const fetchTopBrands = async () => {
  const response = await axiosInstance.get(`/restaurant/topbrands`);
  return response.data.restaurants;
};

//get food by weather ----- menu/food bt weather
export const fetchRandomWeatherMeal = async () => {
  const response = await axiosInstance.get(`/meal/weatherMeals`);
  return response.data.meals;
};

//-------------------------Product Page----------------------------

export const fetchMealDetailById = async (id: string) => {
  const response = await axiosInstance.get(`/meal/${id}`);
  return response.data.meal;
};

//-------------------------Restaurant Page----------------------------

export const fetchRestaurantDetailById = async (id: string) => {
  const response = await axiosInstance.get(`/restaurant/${id}`);
  return response.data.restaurant;
};

export const fetchMenuCategories = async (id: string) => {
  const response = await axiosInstance.get(`/meal/${id}/categories`);
  return response.data.categoriesCount;
};

export const fetchMenu = async (id: string, category: string) => {
  let url = "";
  if (category === "Recommended") {
    url = `/meal/${id}/menu`;
  } else {
    url = `/meal/${id}/menu?category=${category}`;
  }
  const response = await axiosInstance.get(url);
  return response.data.menu;
};

//-------------------------Home Page----------------------------

//get food by weather ----- menu/food bt weather
export const fetchBestDelievered = async () => {
  const response = await axiosInstance.get(`/meal/weatherMeals`);
  return response.data.meals.slice(0, 3);
};

export const fetchCarosuelCategories = async () => {
  const response = await axiosInstance.get(`/meal/categories`);
  return response.data.categories;
};

export const fetchCarosuelItems = async (category: string) => {
  if (!category) {
    return;
  }
  const response = await axiosInstance.get(
    `/meal/carosuelItems?category=${category}`
  );
  return response.data.carosuelItem;
};

//search values
export const fetchSearchRestaurants = async (city: string, value: string) => {
  let url = "";
  console.log(city, value);
  if (city && value) {
    url = `/restaurant/searchRestaurant?city=${city}&value=${value}`;
  } else {
    url = `/restaurant/searchRestaurant`;
  }
  const response = await axiosInstance.get(url);
  return response.data.restaurantData;
};

export const fetchSearchMeals = async (city: string, value: string) => {
  let url = "";
  if (city && value) {
    url = `/restaurant/searchMeal?city=${city}&value=${value}`;
  } else {
    url = `/restaurant/searchMeal`;
  }

  const response = await axiosInstance.get(url);
  return response.data.mealsData;
};

//-------------------------Cart Mangement----------------------------
export const getUserCart = async () => {
  const response = await axiosInstance.get(`/cart/allCartData`);
  return response.data.cartItem;
};

export const addToCartBackend = async (mealId: string) => {
  const response = await axiosInstance.post(
    `/cart/addToCart/${mealId}`,
    {} // Empty body for POST request
  );
  return response.data;
};

export const removeFromCartBackend = async (mealId: string) => {
  const response = await axiosInstance.delete(`/cart/removeFromCart/${mealId}`);
  return response.data;
};

export const incrementCartMealBackend = async (mealId: string) => {
  const response = await axiosInstance.patch(
    `/cart/increment/${mealId}`,
    {} // No body data is needed
  );
  return response.data;
};

export const decrementCartMealBackend = async (mealId: string) => {
  const response = await axiosInstance.patch(
    `/cart/decrement/${mealId}`,
    {} // No body data is needed
  );
  return response.data;
};

export const emptyCartBackend = async () => {
  const response = await axiosInstance.delete(`/cart/clearCart`);
  return response.data;
};

//-------------------------User Profile----------------------------

//-------------------------User Address Management----------------------------
export const getUserAddresses = async () => {
  const response = await axiosInstance.get(`/user/addresses`);
  return response.data.addresses;
};

export const addAddress = async (address: Omit<AddressItem, "id">) => {
  const response = await axiosInstance.post(`/user/addAddress`, {
    address,
  });
  return response.data.address;
};

export const updateAddress = async (
  addressId: string,
  updatedFields: Partial<AddressItem>
) => {
  const response = await axiosInstance.patch(
    `/user/updateAddress/${addressId}`,
    updatedFields
  );
  return response.data.updatedAddress;
};

export const deleteAddress = async (addressId: string) => {
  const response = await axiosInstance.delete(
    `/user/deleteAddress/${addressId}`
  );
  return response.data;
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNew: string;
}) => {
  const response = await axiosInstance.post(`/user/updatePassword`, data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post(`/auth/logout`, {});
};
export const login = async (email: string, password: string): Promise<void> => {
  const loginInfo = {
    email: email,
    password: password,
  };

  const response = await axiosInstance.post(`/auth/login`, loginInfo);
  return response.data;
};

//-------------------------User Profile Image Update----------------------------
export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await axiosInstance.post(
    `/user/changeProfileImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

//-------------------------Checkout Page----------------------------

export const createPayment = async (coupon_code: string, addressId: string) => {
  const response = await axiosInstance.post(`/order/createOrder`, {
    coupon_code: coupon_code,
    addressId: addressId,
  });
  return response.data;
};

//-------------------------Order Management----------------------------
export const getOrders = async () => {
  const response = await axiosInstance.get(`/order/getOrders`);
  return response.data.orders;
};

export const getCoupon = async (coupon_code: string) => {
  const response = await axiosInstance.post(`/order/getCoupons`, {
    coupon_code,
  });
  return response.data.coupon;
};
