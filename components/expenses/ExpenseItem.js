import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

function ExpenseItem({ title, date, amount, id }) {
  const navigation = useNavigation();
  const formattedAmount = amount.toFixed(2);

  const pressExpense = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={pressExpense}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${formattedAmount}</Text>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    justifyContent: 'space-between',
    padding: 12,
    flexDirection: 'row',
    marginVertical: 8,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
  },
  title: {
    color: GlobalStyles.colors.primary50,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: GlobalStyles.colors.primary50,
  },
  amountContainer: {
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  amount: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.75,
  },
});
