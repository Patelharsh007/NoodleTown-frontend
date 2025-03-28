import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

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
    const response = await axios.get(`${BASE_URL}/meal/allMeals`);
    if (response.data.status === "success") {
      const weatherMeals = response.data.meals;
      return weatherMeals.sort(() => Math.random() - 0.5).slice(0, 6);
    } else {
      throw new Error(response.data.message || "Failed to fetch top brands.");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};
