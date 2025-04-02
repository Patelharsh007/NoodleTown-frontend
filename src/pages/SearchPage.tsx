import React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Grid2, Stack, Chip } from "@mui/material";
import SearchRestaurant from "../section/search/SearchRestaurant";
import SearchMeal from "../section/search/SearchMeal";

export const SearchPage: React.FC = () => {
  const { selectedCity, searchValue } = useParams<{
    selectedCity: string;
    searchValue: string;
  }>();

  return (
    <>
      <Navbar linkColor="#000000" />
      <Container sx={{ paddingTop: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Search Results for: {searchValue?.toUpperCase()}
          </Typography>
        </Box>

        {selectedCity && searchValue && (
          <>
            <SearchRestaurant city={selectedCity} value={searchValue} />
            <SearchMeal city={selectedCity} value={searchValue} />
          </>
        )}
      </Container>
    </>
  );
};
