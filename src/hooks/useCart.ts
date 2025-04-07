import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartItemByMealId,
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

const useCart = (mealId: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productCart", mealId],
    queryFn: () => getCartItemByMealId(mealId),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const addToCartMutation = useMutation({
    mutationFn: (mealId: string) => addToCartBackend(mealId),
    onSuccess: (addData) => {
      showSuccessToast(addData.message);
      queryClient.invalidateQueries({ queryKey: ["productCart", mealId] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while adding item to the cart."
      );
    },
  });
  const removeFromCartMutation = useMutation({
    mutationFn: (mealId: string) => removeFromCartBackend(mealId),
    onSuccess: (removeData) => {
      showSuccessToast(removeData.message);
      queryClient.invalidateQueries({ queryKey: ["productCart", mealId] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while adding item to the cart."
      );
    },
  });

  const incrementItemMutation = useMutation({
    mutationFn: (mealId: string) => incrementCartMealBackend(mealId),
    onSuccess: (incrementData) => {
      showInfoToast(incrementData.message);
      queryClient.invalidateQueries({ queryKey: ["productCart", mealId] });
    },
    onError: (error) => {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while incrementing the item."
      );
    },
  });

  const decrementItemMutation = useMutation({
    mutationFn: (mealId: string) => decrementCartMealBackend(mealId),
    onSuccess: (decrementData) => {
      if (decrementData && data?.cartItem.quantity === 1) {
        showSuccessToast("Item removed from cart");
      } else {
        showInfoToast(decrementData.message);
      }
      queryClient.invalidateQueries({ queryKey: ["productCart", mealId] });
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
    data,
    isLoading,
    error,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    incrementItem: incrementItemMutation.mutate,
    decrementItem: decrementItemMutation.mutate,
  };
};

export default useCart;
