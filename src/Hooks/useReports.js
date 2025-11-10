import { reportsAPI } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";


export const useReports = (userEmail) => {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: queryKeys.summary(userEmail),
    queryFn: () => reportsAPI.getSummary(userEmail),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: queryKeys.categoryBreakdown(userEmail),
    queryFn: () => reportsAPI.getCategoryBreakdown(userEmail),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000,
  });

  const { data: monthlyData, isLoading: monthlyLoading } = useQuery({
    queryKey: queryKeys.monthlyData(
      userEmail,
      new Date().getFullYear().toString()
    ),
    queryFn: () =>
      reportsAPI.getMonthlyData(userEmail, new Date().getFullYear().toString()),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000,
  });

  return {
    summary,
    categoryData,
    monthlyData,
    isLoading: summaryLoading || categoryLoading || monthlyLoading,
  };
};

export const useMonthlyData = (userEmail, year) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.monthlyData(userEmail, year),
    queryFn: () => reportsAPI.getMonthlyData(userEmail, year),
    enabled: !!userEmail && !!year,
    staleTime: 5 * 60 * 1000,
  });

  return {
    monthlyData: data,
    isLoading,
    error,
  };
};
