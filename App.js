import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

import HomePage from './pages/home/home-page.component';
import NewLogPage from './pages/new-log/new-log-page.component';
import PreviousLogsPage from './pages/previous-logs/previous-logs-page.component';
import ViewLogPage from './pages/view-log/view-log-page.component';
import { InstructionsPage } from './pages/instructions/instructions-page.component';

import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Previous Logs') {
              iconName = 'view-list';
            }
            else if (route.name === 'Instructions') {
              iconName = 'information-outline';
            }
            return <IconButton icon={iconName} iconColor={color} size={size} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen  icon='home' options={{ headerShown: false }} name="Home" component={HomeStackScreen} />
        <Tab.Screen icon='past' options={{ headerShown: false }} name="Previous Logs" component={PreviousLogsStackScreen} />
        <Tab.Screen icon='info' name="Instructions" component={InstructionsPage}/>
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ()=>{
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ title: 'Home' }} name="homepage" component={HomePage} />
      <HomeStack.Screen options={{ title: "Today's Symptom Log" }}name="new-log" component={NewLogPage} />
  </HomeStack.Navigator>
  )
}

const PreviousLogsStack = createNativeStackNavigator();
  const PreviousLogsStackScreen = ()=>{
    return(
      <PreviousLogsStack.Navigator>
          <PreviousLogsStack.Screen options={{ title: 'Past Symptom Logs' }} name="Previous Logs Stack" component={PreviousLogsPage} />
          <PreviousLogsStack.Screen options={(route)=>{return ViewLogTitle(route.route)}} name="view-log" component={ViewLogPage}/>
      </PreviousLogsStack.Navigator>
    )
  }

  const ViewLogTitle = (route)=>{
    let params = route.params
    let date = new Date(params.logData.item.date).toLocaleString()
    let dateString = date.split(',')[0]
    let titleString = String("Symptoms for " + dateString)
    let returnObj = {}
    returnObj.title = titleString
    return (returnObj)
  }

  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
  };
  
  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
  };