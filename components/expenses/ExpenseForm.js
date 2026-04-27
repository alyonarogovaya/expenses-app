import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import FormField from '../ui/FormField';
import { useExpenses } from '../../context/ExpensesContext';
import { GlobalStyles } from '../../constants/styles';
import {
  getFormattedDate,
  isFutureDate,
  isValidDateFormat,
} from '../../utils/date';
import Button from '../ui/Button';
import { useNavigation } from '@react-navigation/native';
import {
  addExpense as addExpenseApi,
  updateExpense as updateExpenseApi,
} from '../../utils/api';

function ExpenseForm({ initialData }) {
  const { addExpense, updateExpense } = useExpenses();

  const [inputValues, setInputValues] = useState({
    title: initialData ? initialData.title : '',
    amount: initialData ? initialData.amount.toFixed(2).toString() : '',
    date: initialData ? getFormattedDate(initialData.date) : '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues((curValues) => ({
      ...curValues,
      [inputIdentifier]: enteredValue,
    }));
  };

  const clearForm = () => {
    setInputValues({
      title: '',
      amount: '',
      date: '',
    });
    setErrors({});
    navigation.goBack();
  };

  const submitHandler = async () => {
    const { title, amount, date } = inputValues;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Description cannot be empty';
    }

    if (amount <= 0 || isNaN(amount)) {
      newErrors.amount = 'Enter valid amount';
    }

    if (!date.trim()) {
      newErrors.date = 'Enter a date';
    } else if (!isValidDateFormat(date)) {
      newErrors.date = 'Format: YYYY-MM-DD';
    } else if (isFutureDate(date)) {
      newErrors.date = 'Date cannot be in the future';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert(
        'Invalid input',
        'Please check the highlighted fields and try again.',
      );
      return;
    }

    const data = {
      title,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    try {
      setIsLoading(true);
      if (initialData) {
        await updateExpenseApi(initialData.id, data);

        updateExpense(initialData.id, data);
      } else {
        const response = await addExpenseApi(data);

        addExpense({
          ...data,
          id: response.name,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not save expense.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <FormField
        label="Description"
        placeholder="Enter description"
        multiline
        value={inputValues.title}
        onChangeText={(text) => inputChangedHandler('title', text)}
        error={errors.title}
      />

      <View style={styles.formFieldRow}>
        <View style={styles.formField}>
          <FormField
            label="Amount"
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={inputValues.amount}
            onChangeText={(text) => {
              const cleaned = text
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*)\./g, '$1');

              inputChangedHandler('amount', cleaned);
            }}
            onBlur={() => {
              const amount = inputValues.amount;
              if (!amount) return;

              const number = parseFloat(amount);

              if (!isNaN(number)) {
                inputChangedHandler('amount', number.toFixed(2));
              }
            }}
            error={errors.amount}
          />
        </View>

        <View style={styles.formField}>
          <FormField
            label="Date"
            placeholder="YYYY-MM-DD"
            maxLength={10}
            value={inputValues.date}
            onChangeText={(text) => inputChangedHandler('date', text)}
            error={errors.date}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={clearForm}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={submitHandler}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginBottom: 8,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: GlobalStyles.colors.white,
  },
  formFieldRow: {
    flexDirection: 'row',
  },
  formField: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});
