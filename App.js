import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from './constants/styles';
import { ExpensesProvider } from './context/ExpensesContext';
import { createStackNavigator } from '@react-navigation/stack';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import IconButton from './components/ui/IconButton';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function ExpensesOverview() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary50,
        sceneStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: GlobalStyles.colors.white,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="Recent"
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color }) => (
            <Ionicons name="hourglass-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="All"
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={20} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: GlobalStyles.colors.white,
              headerLeft: Platform.OS === 'ios' ? () => null : undefined,
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenseScreen}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
