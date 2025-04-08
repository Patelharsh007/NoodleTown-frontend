import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  emptyCartBackend,
  getUserCart,
  addToCartBackend,
  incrementCartMealBackend,
  decrementCartMealBackend,
  removeFromCartBackend,
} from "../util/util";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../components/ToastContainer";
import { RootState } from "../redux/Store";
import { CartItem } from "../types/type";

const useCart = () => {
  const auth = useSelector((state: RootState) => state.authUser.authUser);
  const queryClient = useQueryClient();

  // Fetch the user's cart data
  const {
    data: cart,
    isLoading: isLoadingCart,
    error: errorCart,
  } = useQuery({
    queryKey: ["cartItems", auth.email],
    queryFn: getUserCart,
    staleTime: 5 * 60 * 1000,
  });

  // Mutation for clearing the cart
  const clearCart = useMutation({
    mutationFn: emptyCartBackend,
    onSuccess: (clearCart) => {
      showSuccessToast(clearCart.message);
      queryClient.setQueryData(["cartItems", auth.email], {
        cartItem: [],
      });
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while clearing the cart."
      );
    },
  });

  // Mutation for adding an item to the cart
  const addToCartMutation = useMutation({
    mutationFn: (mealId: string) => addToCartBackend(mealId),
    onSuccess: (addData) => {
      showSuccessToast(addData.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while adding item to the cart."
      );
    },
  });

  // Mutation for removing an item from the cart
  const removeFromCartMutation = useMutation({
    mutationFn: (mealId: string) => removeFromCartBackend(mealId),
    onSuccess: (removeData) => {
      showSuccessToast(removeData.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while removing item from the cart."
      );
    },
  });

  // Mutation for incrementing the quantity of an item
  const incrementItemMutation = useMutation({
    mutationFn: (mealId: string) => incrementCartMealBackend(mealId),
    onSuccess: (incrementData) => {
      showInfoToast(incrementData.message);
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while incrementing the item."
      );
    },
  });

  // Mutation for decrementing the quantity of an item
  const decrementItemMutation = useMutation({
    mutationFn: (mealId: string) => decrementCartMealBackend(mealId),
    onSuccess: (decrementData, mealId) => {
      if (
        decrementData &&
        cart?.find((cart: CartItem) => cart.mealId === mealId)?.quantity === 1
      ) {
        queryClient.setQueryData(["cartItems", auth.email], {
          cartItem: [],
        });
        showSuccessToast("Item removed from cart");
      } else {
        showInfoToast(decrementData.message);
      }
      queryClient.invalidateQueries({ queryKey: ["cartItems", auth.email] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while decrementing the item."
      );
    },
  });

  return {
    cart,
    isLoadingCart,
    errorCart,
    emptyCart: clearCart.mutate,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    incrementItem: incrementItemMutation.mutate,
    decrementItem: decrementItemMutation.mutate,
    isAdding: addToCartMutation.isPending,
    isIncrementing: incrementItemMutation.isPending,
    isDecrementing: decrementItemMutation.isPending,
  };
};

export default useCart;
