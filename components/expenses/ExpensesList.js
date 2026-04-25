import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function ExpensesList({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ExpenseItem
          title={item.title}
          amount={item.amount}
          date={item.date}
          id={item.id}
        />
      )}
    />
  );
}

export default ExpensesList;
