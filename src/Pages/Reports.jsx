import CategoryChart from "@/components/reports/CategoryChart";
import MonthlyChart from "@/components/reports/MonthlyChart";
import SummaryCards from "@/components/reports/SummaryCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/Contexts/AuthContext";
import { useMonthlyData, useReports } from "@/Hooks/useReports";
import { Calendar } from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const { summary, categoryData } = useReports(currentUser?.email);
  const { monthlyData, isLoading: monthlyLoading } = useMonthlyData(
    currentUser?.email,
    selectedYear
  );

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar size={18} />
            <span className="font-medium">Year:</span>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={categoryData} />
        <MonthlyChart data={monthlyData} isLoading={monthlyLoading} />
      </div>
    </div>
  );
};

export default Reports;
