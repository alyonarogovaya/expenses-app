import ExpensesOutput from '../components/expenses/ExpensesOutput';
import { useExpenses } from '../context/ExpensesContext';
import { getDateMinusDays } from '../utils/date';

function RecentExpensesScreen() {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const period = getDateMinusDays(today, 7);

    return expense.date >= period && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No registered expenses for the last 7 days."
    />
  );
}

export default RecentExpensesScreen;
