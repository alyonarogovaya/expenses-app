import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import FormField from './ui/FormField';
import Button from './ui/Button';
import { useExpenses } from '../context/ExpensesContext';

function ExpenseForm({ onClose }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const { addExpense } = useExpenses();

  const submitHandler = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name cannot be empty';
    }

    if (!amount || isNaN(amount)) {
      newErrors.amount = 'Enter valid amount';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addExpense({ title: name, amount: parseFloat(amount), date: Date.now() });
      onClose();
    }
  };

  const clearForm = () => {
    setName('');
    setAmount('');
    setErrors({});
    onClose();
  };

  return (
    <View>
      <FormField
        label="Name"
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />

      <FormField
        label="Amount"
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={(text) => {
          const cleaned = text
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*)\./g, '$1');
          setAmount(cleaned);
        }}
        onBlur={() => {
          if (!amount) return;

          const number = parseFloat(amount);

          if (!isNaN(number)) {
            setAmount(number.toFixed(2));
          }
        }}
        error={errors.amount}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button mode="outlined" onPress={clearForm}>
            Close
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={submitHandler}>Add</Button>
        </View>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonContainer: {
    flex: 1,
  },
});
