import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";


const SummaryCards = ({ summary }) => {
  const { totalIncome, totalExpense, balance } = summary || {};

  const cards = [
    {
      title: "Total Income",
      value: totalIncome ? `$${totalIncome.toFixed(2)}` : "$0.00",
      icon: <TrendingUp size={24} />,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Total Expense",
      value: totalExpense ? `$${totalExpense.toFixed(2)}` : "$0.00",
      icon: <TrendingDown size={24} />,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      title: "Current Balance",
      value: balance ? `$${balance.toFixed(2)}` : "$0.00",
      icon: <Wallet size={24} />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-600 dark:text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card key={index} className={card.bgColor}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold mt-1 ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <div className={card.iconColor}>{card.icon}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
