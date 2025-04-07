import axios from "axios";
import { showErrorToast } from "../components/ToastContainer";
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
    const response = await axios.put(
      `${BASE_URL}/cart/increment/${mealId}`,
      {}, // Empty body for PUT request
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
    const response = await axios.put(
      `${BASE_URL}/cart/decrement/${mealId}`,
      {}, // Empty body
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
