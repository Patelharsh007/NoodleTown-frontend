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
    console.log(url);
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
