import { useNavigate, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransaction, useTransactions } from "@/Hooks/useTransactions";
import { queryKeys } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import TransactionForm from "@/components/transactions/TransactionForm";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { transaction, isLoading } = useTransaction(id);
  const { updateTransaction, isUpdating } = useTransactions(currentUser?.email);

  const handleSubmit = (data) => {
    updateTransaction(
      { id, data },
      {
        onSuccess: () => {
          // Invalidate BOTH the single transaction and the list of transactions
          queryClient.invalidateQueries({
            queryKey: queryKeys.transactionById(id),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.transactionsByUser(
              currentUser?.email,
              "createdAt",
              "desc"
            ),
          });

          navigate(`/transaction/${id}`); // Navigate *after* invalidating
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Transaction not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Update Transaction</h1>
      <TransactionForm
        initialData={transaction}
        onSubmit={handleSubmit}
        isEditing={true}
        isSubmitting={isUpdating}
      />
    </div>
  );
};

export default UpdateTransaction;
