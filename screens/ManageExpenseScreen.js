import { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpenses } from '../context/ExpensesContext';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { deleteExpense as deleteExpenseApi } from '../utils/api';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function ManageExpenseScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { deleteExpense, expenses } = useExpenses();
  const itemToEdit = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await deleteExpenseApi(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not delete expense.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm expenseId={expenseId} initialData={itemToEdit} />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
});
