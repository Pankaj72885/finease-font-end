import { Spinner } from "@/components/ui/spinner";
import { useTransaction, useTransactions } from "@/Hooks/useTransactions";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  Tag,
  Trash2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { queryKeys, transactionAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";

const TransactionDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { transaction, isLoading } = useTransaction(id);
  const { deleteTransaction } = useTransactions(currentUser?.email);

  // Get all transactions for category total calculation
  const { data: allTransactions } = useQuery({
    queryKey: queryKeys.transactionsByUser(
      currentUser?.email,
      "createdAt",
      "desc"
    ),
    queryFn: () =>
      transactionAPI.getAll(currentUser?.email, "createdAt", "desc"),
    enabled: !!currentUser?.email,
    staleTime: 5 * 60 * 1000,
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id, {
          onSuccess: () => {
            navigate("/my-transactions");
          },
        });
      }
    });
  };

  const calculateCategoryTotal = () => {
    if (!transaction || !allTransactions) return 0;

    const category = transaction.category;
    const type = transaction.type;

    return allTransactions
      .filter((t) => t.category === category && t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
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
          <Link to="/my-transactions">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Back to Transactions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { type, category, amount, description, date, userEmail, userName } =
    transaction;
  const isIncome = type === "Income";
  const categoryTotal = calculateCategoryTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/my-transactions">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Transactions
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Transaction Details</h1>
          <div className="flex space-x-2">
            <Link to={`/update-transaction/${id}`}>
              <Button variant="outline" size="sm">
                <Edit size={16} />
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isIncome
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <Tag size={20} />
            </div>
            <div>
              <h3 className="font-medium">{category}</h3>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p
                className={`text-xl font-bold ${
                  isIncome ? "text-green-600" : "text-red-600"
                }`}
              >
                {isIncome ? "+" : "-"}${amount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {format(new Date(date), "MMMM dd, yyyy")}
              </p>
            </div>
          </div>

          {description && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="font-medium">{description}</p>
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-1">
              Total in this category
            </p>
            <p
              className={`text-lg font-bold ${
                isIncome ? "text-green-600" : "text-red-600"
              }`}
            >
              ${categoryTotal.toFixed(2)}
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-1">User</p>
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
