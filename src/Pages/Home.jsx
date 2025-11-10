import { useAuth } from "@/Contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { reportsAPI } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, DollarSign, PiggyBank, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  const { currentUser } = useAuth();

  const { data: summary, isLoading } = useQuery({
    queryKey: queryKeys.summary(currentUser?.email),
    queryFn: () => reportsAPI.getSummary(currentUser?.email),
    enabled: !!currentUser?.email,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary-600 to-primary-700 text-black dark:text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Take Control of Your Finances
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Track, Manage, and Grow Your Wealth with FinEase
            </p>
            {currentUser ? (
              <Link to="/add-transaction">
                <Button
                  size="lg"
                  className="bg-primary dark:bg-secondary text-secondary dark:text-primary hover:scale-105 transition ease-in-out cursor-pointer font-bold"
                >
                  Add Transaction
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-primary dark:bg-secondary text-secondary dark:text-primary hover:scale-105 transition ease-in-out cursor-pointer font-bold"
                >
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {currentUser && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Your Financial Overview
            </h2>

            {isLoading ? (
              <div className="flex justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full mr-4">
                        <TrendingUp
                          className="text-green-600 dark:text-green-400"
                          size={24}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">
                          Total Income
                        </p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                          ${summary?.totalIncome?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full mr-4">
                        <DollarSign
                          className="text-red-600 dark:text-red-400"
                          size={24}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                          Total Expense
                        </p>
                        <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                          ${summary?.totalExpense?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full mr-4">
                        <PiggyBank
                          className="text-blue-600 dark:text-blue-400"
                          size={24}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Current Balance
                        </p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          ${summary?.balance?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Budgeting Tips Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Budgeting Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Track Every Expense</h3>
                    <p className="text-muted-foreground">
                      Small purchases add up. Track everything to get a complete
                      picture of your spending habits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Set Realistic Goals</h3>
                    <p className="text-muted-foreground">
                      Start with small, achievable savings goals and gradually
                      increase them as you build momentum.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Use the 50/30/20 Rule</h3>
                    <p className="text-muted-foreground">
                      Allocate 50% for needs, 30% for wants, and 20% for savings
                      and debt repayment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Financial Planning Matters Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Why Financial Planning Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Achieve Your Goals</h3>
                    <p className="text-muted-foreground">
                      Whether it's buying a home, funding education, or retiring
                      early, financial planning makes your dreams achievable.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Reduce Financial Stress
                    </h3>
                    <p className="text-muted-foreground">
                      Knowing you have a plan and emergency fund provides peace
                      of mind during uncertain times.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Build Wealth Over Time
                    </h3>
                    <p className="text-muted-foreground">
                      Consistent saving and investing allows compound interest
                      to work in your favor.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Prepare for Emergencies
                    </h3>
                    <p className="text-muted-foreground">
                      Life is unpredictable. Financial planning ensures you're
                      prepared for unexpected expenses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
