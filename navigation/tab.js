import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import { Image, Platform } from 'react-native';
import icon from '../icon/icon';
import Profile from '../screens/Profile';
const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel : false,
    style : {
        height : Platform.OS == 'ios' ? '9%' : '8%' ,
        backgroundColor : "#000000"
    },
    keyboardHidesTabBar: true
}

function MyTabs() {
  return (
    <Tab.Navigator
        tabBarOptions={tabOptions}
        screenOptions={({route}) => ({
        tabBarIcon : ({focused}) => {
            const tintColor = focused ? "#FF7300" : "#ccc"
            
            switch (route.name) {
                case 'Home':
                    return(
                        <Image 
                            source={icon.home_icon}
                            resizeMode='contain'
                            style={{
                                tintColor : tintColor,
                                width : Platform.OS == 'android' ? 33 : 28,
                                height : Platform.OS == 'android' ? 28 : 22
                            }}
                        />
                    )
                case 'Explore':
                    return(
                        <Image 
                            source={icon.explore_icon}
                            resizeMode='contain'
                            style={{
                                tintColor : tintColor,
                                width : Platform.OS == 'android' ? 33 : 28,
                                height : Platform.OS == 'android' ? 28 : 22
                            }}
                        />
                    )
                case 'Profile':
                    return(
                        <Image 
                            source={icon.profile_icon}
                            resizeMode='contain'
                            style={{
                                tintColor : tintColor,
                                width : Platform.OS == 'android' ? 33 : 28,
                                height : Platform.OS == 'android' ? 28 : 22
                            }}
                        />
                    )        
                default:
                    break;
            }
        }
    })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs