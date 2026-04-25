import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpenses } from '../context/ExpensesContext';
import Button from '../components/ui/Button';

function ManageExpenseScreen({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { deleteExpense, addExpense, updateExpense } = useExpenses();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = () => {
    if (isEditing) {
      updateExpense({});
    } else {
      addExpense({});
    }
    navigation.goBack();
  };

  const deleteHandler = () => {
    navigation.goBack();
    deleteExpense(expenseId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={cancelHandler}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={submitHandler}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </View>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});
