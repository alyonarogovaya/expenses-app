import axios from 'axios';

const ROOT_URL =
  'https://react-native-expenses-23413-default-rtdb.europe-west1.firebasedatabase.app';

export async function addExpense(expenseData) {
  const response = await axios.post(`${ROOT_URL}/expenses.json`, expenseData);

  return response.data;
}

export async function getExpenses() {
  const response = await axios.get(`${ROOT_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = response.data[key];

    expenses.push({
      id: key,
      title: expenseObj.title,
      amount: expenseObj.amount,
      date: new Date(expenseObj.date),
    });
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  return await axios.put(`${ROOT_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return await axios.delete(`${ROOT_URL}/expenses/${id}.json`);
}
