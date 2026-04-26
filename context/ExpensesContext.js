import { createContext, useContext, useState } from 'react';

const DUMMY_DATA = [
  { title: 'A lipstick', amount: 50.99, id: '1', date: new Date('2026-01-11') },
  { title: 'A jeans', amount: 120, id: '2', date: new Date('2026-02-01') },
  { title: 'Groceries', amount: 70.99, id: '3', date: new Date('2026-04-25') },
  { title: 'Cleaning', amount: 150.99, id: '4', date: new Date('2026-04-23') },
  { title: 'A hookah', amount: 30, id: '5', date: new Date('2026-04-23') },
  { title: 'Padel', amount: 50, id: '6', date: new Date('2026-04-23') },
  { title: 'Americano', amount: 3.5, id: '7', date: new Date('2026-04-22') },
  { title: 'Dinner', amount: 70.25, id: '8', date: new Date('2026-02-21') },
  { title: 'Rent', amount: 600, id: '9', date: new Date('2026-04-01') },
];

const ExpensesContext = createContext();

const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(DUMMY_DATA);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedExpense } : item,
      ),
    );
  };
  return (
    <ExpensesContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

function useExpenses() {
  const context = useContext(ExpensesContext);

  if (context === undefined)
    throw new Error('ExpensesContext was used outside of ExpensesProvider');

  return context;
}

export { ExpensesProvider, useExpenses };
