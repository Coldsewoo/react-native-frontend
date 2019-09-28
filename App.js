//This is an example code for Navigation Drawer with Custom Side bar//
//This Example is for React Navigation 3.+//
import React, { Component } from 'react'
//import react in our code.
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Text } from 'react-native'
// import all basic components

//Import required react-navigation component
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

//Import all the screens
import HomePage from './pages/Home'
import MyEstimationPage from './pages/MyEstimation'
import MyPagePage from './pages/MyPage'
import DealerPage from './pages/Dealer'

//Import Custom Sidebar
import SidebarMenu from './SidebarMenu'

global.currentScreenIndex = 0

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer()
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image source={require('./image/drawer.png')} style={{ width: 30, height: 30, marginLeft: 5 }} />
        </TouchableOpacity>
      </View>
    )
  }
}

//Stack Navigator for the First Option of Navigation Drawer
const HomePage_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: HomePage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

//Stack Navigator for the Second Option of Navigation Drawer
const MyEstimationPage_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Second: {
    screen: MyEstimationPage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

//Stack Navigator for the Third Option of Navigation Drawer
const MyPagePage_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Third: {
    screen: MyPagePage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

const DealerPage_StackNavigator = createStackNavigator({
  //All the screen from the Third Option will be indexed here
  Fourth: {
    screen: DealerPage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    HomePage: {
      screen: HomePage_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 1',
      },
    },
    MyEstimationPage: {
      screen: MyEstimationPage_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    MyPagePage: {
      screen: MyPagePage_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 3',
      },
    },
    DealerPage: {
      screen: DealerPage_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Demo Screen 4',
      },
    },
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: SidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 160,
  },
)
export default createAppContainer(DrawerNavigatorExample)
