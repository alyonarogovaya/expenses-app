import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import AllExpensesScreen from './screens/AllExpensesScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyles } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
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
            headerTintColor: GlobalStyles.colors.primary50,
            headerRight: () => (
              <Ionicons
                name="add"
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => {
                  console.log('Pressed!');
                }}
              />
            ),
          }}
        >
          <Tab.Screen
            name="Recent"
            component={RecentExpensesScreen}
            options={{
              title: 'Recent Expenses',
              tabBarIcon: ({ color }) => (
                <Ionicons name="hourglass-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="All"
            component={AllExpensesScreen}
            options={{
              title: 'All Expenses',
              tabBarIcon: ({ color }) => (
                <Ionicons name="calendar-outline" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
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
