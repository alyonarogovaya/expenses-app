import { useExpenses } from '../context/ExpensesContext';
import ExpensesOutput from '../components/expenses/ExpensesOutput';

function AllExpensesScreen() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpensesScreen;
