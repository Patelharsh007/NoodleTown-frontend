import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

//-------------------------Menu Page----------------------------
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
      return response.data.meal[0];
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
      return response.data.restaurant[0];
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

export const fetchRestaurantAndMealById = async (id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/restaurant/restaurantmeal/${id}`
    );
    if (response.data.status === "success") {
      return response.data.restaurant[0];
    } else {
      throw new Error(response.data.message || "Failed to fetch data.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};
