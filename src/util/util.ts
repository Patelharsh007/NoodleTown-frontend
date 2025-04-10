import axios from "axios";
import { showErrorToast } from "../components/ToastContainer";
import { AddressItem } from "../types/type";
const BASE_URL = "http://localhost:8080/api";

//-----------+------------Menu Page----------------------------

//get Top Brands ---- Menu/tobrand
export const fetchTopBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurant/topbrands`);
    if (response.data.status === "success") {
      return response.data.restaurants;
    } else {
      throw new Error(response.data.message || "Failed to fetch top brands.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching the top brands.");
  }
};

//get food by weather ----- menu/food bt weather
export const fetchRandomWeatherMeal = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meal/weatherMeals`);
    if (response.data.status === "success") {
      return response.data.meals;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

//-------------------------Product Page----------------------------

export const fetchMealDetailById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/meal/${id}`);
    if (response.data.status === "success") {
      return response.data.meal;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

//-------------------------Restaurant Page----------------------------

export const fetchRestaurantDetailById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurant/${id}`);
    if (response.data.status === "success") {
      return response.data.restaurant;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

export const fetchMenuCategories = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/meal/${id}/categories`);
    if (response.data.status === "success") {
      return response.data.categoriesCount;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

export const fetchMenu = async (id: string, category: string) => {
  let url = "";
  if (category === "Recommended") {
    url = `${BASE_URL}/meal/${id}/menu`;
  } else {
    url = `${BASE_URL}/meal/${id}/menu?category=${category}`;
  }

  try {
    const response = await axios.get(url);

    if (response.data.status === "success") {
      return response.data.menu;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

//-------------------------Home Page----------------------------

//get food by weather ----- menu/food bt weather
export const fetchBestDelievered = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meal/weatherMeals`);
    if (response.data.status === "success") {
      return response.data.meals.slice(0, 3);
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};
export const fetchCarosuelCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/meal/categories`);
    if (response.data.status === "success") {
      return response.data.categories;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};
export const fetchCarosuelItems = async (category: string) => {
  let url;
  if (category === undefined) {
    return;
  } else {
    url = `${BASE_URL}/meal/carosuelItems?category=${category}`;
  }
  try {
    // console.log(url);
    const response = await axios.get(url);
    if (response.data.status === "success") {
      return response.data.carosuelItem;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

//search values
export const fetchSearchRestaurants = async (city: string, value: string) => {
  let url = "";
  console.log(city, value);
  if (city && value) {
    url = `${BASE_URL}/restaurant/searchRestaurant?city=${city}&value=${value}`;
  } else {
    url = `${BASE_URL}/restaurant/searchRestaurant`;
  }
  try {
    const response = await axios.get(url);
    if (response.data.status === "success") {
      return response.data.restaurantData;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};
export const fetchSearchMeals = async (city: string, value: string) => {
  let url = "";
  console.log(city, value);
  if (city && value) {
    url = `${BASE_URL}/restaurant/searchMeal?city=${city}&value=${value}`;
  } else {
    url = `${BASE_URL}/restaurant/searchMeal`;
  }
  try {
    console.log(url);
    const response = await axios.get(url);
    if (response.data.status === "success") {
      return response.data.mealsData;
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

//-------------------------Cart Mangement----------------------------
export const getUserCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/allCartData`, {
      withCredentials: true,
    });
    if (response.data && response.data.cartItem) {
      return response.data.cartItem;
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to check if item is in the cart."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while checking item in cart."
      );
    }
  }
};

export const getCartItemByMealId = async (mealId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/cartMeal/${mealId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to check if item is in the cart."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while checking item in cart."
      );
    }
  }
};

export const addToCartBackend = async (mealId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/addToCart/${mealId}`,
      {}, // Empty body for POST request
      {
        withCredentials: true,
      }
    );
    if (response.data.status === "success") {
      return response.data;
    } else {
      showErrorToast(response.data.message);
      throw new Error(
        response.data.message || "Failed to add item to the cart."
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while adding to the cart."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while adding item to the cart."
      );
    }
  }
};

export const removeFromCartBackend = async (mealId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/cart/removeFromCart/${mealId}`,
      {
        withCredentials: true,
      }
    );
    if (response.data.status === "success") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while removing from the cart."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while removing item from the cart."
      );
    }
  }
};

export const incrementCartMealBackend = async (mealId: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/cart/increment/${mealId}`,
      {}, // No body data is needed
      {
        withCredentials: true,
      }
    );
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "An unknown error occurred.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while processing the increment request."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while incrementing item quantity."
      );
    }
  }
};

export const decrementCartMealBackend = async (mealId: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/cart/decrement/${mealId}`,
      {}, // No body data is needed
      {
        withCredentials: true,
      }
    );
    if (response.data.status === "success") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while processing the decrement request."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while decrementing item quantity."
      );
    }
  }
};
export const emptyCartBackend = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/clearCart`, {
      withCredentials: true,
    });
    if (response.data.status === "success") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message ||
          "An error occurred while processing the decrement request."
      );
    } else {
      throw new Error(
        "An unexpected error occurred while decrementing item quantity."
      );
    }
  }
};

//-------------------------User Profile----------------------------
export const getUserAddresses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/addresses`, {
      withCredentials: true,
    });
    if (response.data && response.data.addresses) {
      console.log("Backend", response.data.addresses);
      return response.data.addresses;
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to get addresses");
    } else {
      throw new Error(
        "An unexpected error occurred while checking user's addresses."
      );
    }
  }
};

//-------------------------User Address Management----------------------------
export const addAddress = async (address: Omit<AddressItem, "id">) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addAddress`,
      { address },
      { withCredentials: true }
    );

    if (response.data.status === "success") {
      return response.data.address;
    } else if (response.data.status === "info") {
      throw new Error(response.data.message);
    } else {
      throw new Error(response.data.message || "Failed to add address");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to add address");
    } else {
      throw new Error("An unexpected error occurred while adding the address.");
    }
  }
};

export const updateAddress = async (
  addressId: string,
  updatedFields: Partial<AddressItem>
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/updateAddress/${addressId}`,
      updatedFields,
      { withCredentials: true }
    );

    if (response.data.status === "success") {
      return response.data.updatedAddress;
    } else if (response.data.status === "error") {
      throw new Error(response.data.message);
    } else {
      throw new Error("Failed to update address");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to update address"
      );
    } else {
      throw new Error(
        "An unexpected error occurred while updating the address"
      );
    }
  }
};

export const deleteAddress = async (addressId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/user/deleteAddress/${addressId}`,
      { withCredentials: true }
    );

    if (response.data.status === "success") {
      return response.data;
    } else if (response.data.status === "error") {
      throw new Error(response.data.message);
    } else {
      throw new Error("Failed to delete address");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to delete address"
      );
    } else {
      throw new Error(
        "An unexpected error occurred while deleting the address"
      );
    }
  }
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNew: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/updatePassword`, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to update password"
      );
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error(
        error.message || "An error occurred while updating password"
      );
    }
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error("Logout failed");
    }
  } catch (error: any) {
    console.error("Logout error:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during logout"
    );
  }
};

//-------------------------User Profile Image Update----------------------------
export const updateProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await axios.post(
      `${BASE_URL}/user/changeProfileImage`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(
        response.data.message || "Failed to update profile image"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to update profile image"
      );
    } else {
      throw new Error(
        "An unexpected error occurred while updating profile image"
      );
    }
  }
};
