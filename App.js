import React, { Component } from 'react'
import { View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Provider } from 'mobx-react'

import HomePage from './pages/Home'
import MyEstimationPage from './pages/MyEstimation'
import MyPagePage from './pages/MyPage'
import DealerPage from './pages/Dealer'

import SidebarMenu from './SidebarMenu'

import rootStore from './store/DealStore'
import KCStore from './store/KCStore'

global.currentScreenIndex = 0

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer()
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image source={require('./image/drawer.png')} style={{ width: 30, height: 30, marginLeft: 5 }} />
        </TouchableOpacity>
      </View>
    )
  }
}

const HomePage_StackNavigator = createStackNavigator({
  First: {
    screen: HomePage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

const MyEstimationPage_StackNavigator = createStackNavigator({
  Second: {
    screen: MyEstimationPage,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerTransparent: true,
    }),
  },
})

const MyPagePage_StackNavigator = createStackNavigator({
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

const DrawerNavigator = createDrawerNavigator(
  {
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
    contentComponent: SidebarMenu,
    drawerWidth: Dimensions.get('window').width - 160,
  },
)
let Navigation = createAppContainer(DrawerNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider rootStore={rootStore} KCStore={KCStore}>
        <Navigation />
      </Provider>
    )
  }
}
