import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/expenses/ExpensesOutput';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useExpenses } from '../context/ExpensesContext';
import { getDateMinusDays } from '../utils/date';
import { getExpenses as getExpensesApi } from '../utils/api';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function RecentExpensesScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const { expenses, setFetchedExpenses } = useExpenses();

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const expenses = await getExpensesApi();
        setFetchedExpenses(expenses);
      } catch (error) {
        console.log(error);
        setError('Could not fetch expenses!');
      } finally {
        setIsFetching(false);
      }
    }

    fetchExpenses();
  }, [setFetchedExpenses]);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const period = getDateMinusDays(today, 7);

    return expense.date >= period && expense.date <= today;
  });

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No registered expenses for the last 7 days."
    />
  );
}

export default RecentExpensesScreen;
