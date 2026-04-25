import { StyleSheet, View, Text } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpensesList data={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
