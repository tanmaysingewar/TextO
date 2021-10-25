import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Explore from './screens/Explore';
import MyTabs from './navigation/tab';
import { StatusBar } from 'expo-status-bar';
import Comment from './screens/Comment';
import Username from './screens/Username';
import Welcome from './screens/info/Welcome';
import TandC from './screens/info/TandC';
import Creator from './screens/info/Creator';
import ProfileO from './screens/ProfileO';
import Edit_profile from './screens/Edit_profile';
import createPost from './screens/createPost';

const Stack = createStackNavigator();

const MyTheme = {
  colors: {
    primary: '#fff',
    background: '#fff',
  },
};
const horizontalAnimation = {
  gestureDirection: 'horizontal',
  headerShown : false,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ]},
      };
    },
  };
         
function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={horizontalAnimation}>
      
        <Stack.Screen name="Login" component={Login} screenOptions={horizontalAnimation} />
        <Stack.Screen name="UserName" component={Username} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Welcome" component={Welcome} screenOptions={horizontalAnimation} />
        <Stack.Screen name="TandC" component={TandC} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Creator" component={Creator} screenOptions={horizontalAnimation} />
        {/* Home Tab */}
        <Stack.Screen name="Home" component={MyTabs} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Profile" component={Profile} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Explore" component={Explore} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Comment" component={Comment} screenOptions={horizontalAnimation} />
        <Stack.Screen name="ProfileO" component={ProfileO} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Edit_Profile" component={Edit_profile} screenOptions={horizontalAnimation} />
        <Stack.Screen name="Create_Post" component={createPost} screenOptions={horizontalAnimation} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;