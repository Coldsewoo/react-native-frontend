//This is an example code for Navigation Drawer with Custom Side bar//
//This Example is for React Navigation 3.+//
import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default class CustomSidebarMenu extends Component {
  constructor() {
    super()
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: '홈',
        screenToNavigate: 'HomePage',
      },
      {
        navOptionThumb: 'copy1',
        navOptionName: '내 견적확인',
        screenToNavigate: 'MyEstimationPage',
      },
      {
        navOptionThumb: 'user',
        navOptionName: '마이 페이지',
        screenToNavigate: 'MyPagePage',
      },
      {
        navOptionThumb: 'search1',
        navOptionName: '공인중개사용',
        screenToNavigate: 'DealerPage',
      },
    ]
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: '#ffffff',
              }}
              key={key}
              onPress={() => {
                global.currentScreenIndex = key
                this.props.navigation.navigate(item.screenToNavigate)
              }}
            >
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <AntDesign name={item.navOptionThumb} style={{ fontSize: 25, color: '#808080' }} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                }}
              >
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
})
