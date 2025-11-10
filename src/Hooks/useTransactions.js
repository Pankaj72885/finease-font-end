import { transactionAPI } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useTransactions = (userEmail, sortBy, sortOrder) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
    queryFn: () => transactionAPI.getAll(userEmail, sortBy, sortOrder),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
  });

  const createMutation = useMutation({
    mutationFn: transactionAPI.create,
    onSuccess: () => {
      toast.success("Transaction created successfully!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.summary(userEmail),
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create transaction");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => transactionAPI.update(id, data),
    onSuccess: () => {
      toast.success("Transaction updated successfully!");
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.summary(userEmail),
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update transaction");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: transactionAPI.delete,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
      });

      // Snapshot the previous value
      const previousTransactions = queryClient.getQueryData(
        queryKeys.transactionsByUser(userEmail, sortBy, sortOrder)
      );

      // Optimistically update to the new value
      queryClient.setQueryData(
        queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
        (old) => old?.filter((transaction) => transaction._id !== id)
      );

      // Return a context object with the snapshotted value
      return { previousTransactions };
    },
    onError: (err, id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
        context.previousTransactions
      );
      toast.error(err.message || "Failed to delete transaction");
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactionsByUser(userEmail, sortBy, sortOrder),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.summary(userEmail),
      });
    },
  });

  return {
    transactions: data,
    isLoading,
    error,
    refetch,
    createTransaction: createMutation.mutate,
    updateTransaction: updateMutation.mutate,
    deleteTransaction: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

export const useTransaction = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.transaction(id),
    queryFn: () => transactionAPI.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  return {
    transaction: data,
    isLoading,
    error,
  };
};
