//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react'
//import react in our code.
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ScrollView, Image, FlatList, Alert } from 'react-native'
// import all basic components
import { Icon } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import HomeKCComponent from '../components/HomeKCComponent'
import Separator from '../atoms/Separator'
import UserFrom from '../templates/UserForm'

const screen = Dimensions.get('window')

const KCData = [
  {
    id: 1,
    date: 20190920,
    district1: '성북구',
    district2: '안암동',
    buildingType: '아파트',
    trasactionType: '전세',
    saved: 100,
    comment:
      '투자부동산 전문 투자자가 소개하는 실전 부자 공부 노하우를 지금 확인해보세요. ... 부동산을 거래하면 세금이 발생합니다. ',
  },
  {
    id: 2,
    date: 20190920,
    district1: '동대문구',
    district2: '용두동',
    buildingType: '아파트',
    trasactionType: '전세',
    saved: 250,
    comment: '너무너무 좋아요~',
  },
  {
    id: 3,
    date: 20190920,
    district1: '종로구',
    district2: '숭인2동',
    buildingType: '빌라',
    trasactionType: '매매',
    saved: 150,
    comment: '너무너무 좋아요~',
  },
  {
    id: 4,
    date: 20190920,
    district1: '성북구',
    district2: '안암동',
    buildingType: '아파트',
    trasactionType: '전세',
    saved: 100,
    comment: '너무너무 좋아요~',
  },
]

export default class HomePage extends Component {
  //Screen1 Component
  constructor() {
    super()
    this.state = {
      showUserForm: false,
      myCart: [11],
    }
  }

  _navigateToEstimationPage = () => {
    if (this.state.myCart.length > 0) {
      global.currentScreenIndex = 1
      this.props.navigation.navigate('MyEstimationPage')
    } else {
      Alert.alert(
        '현재 등록된 견적 요청이 없습니다.',
        '견적 요청을 보내시겠습니까?',
        [
          {
            text: '예',
            onPress: () => {
              this.setState({ showUserForm: true })
            },
          },
          {
            text: '아니오',
            onPress: () => {},
          },
        ],
        { cancelable: false },
      )
    }
  }

  _navigateToDealerPage = () => {
    global.currentScreenIndex = 3
    this.props.navigation.navigate('DealerPage')
  }

  _keyExtractor(item) {
    return item.id.toString()
  }

  render() {
    return (
      <View style={styles.Container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 30 }}>
          <View style={styles.getEstimationContainer}>
            <View style={styles.getEstimation}>
              <View style={styles.estimationTextContainer}>
                <Text style={styles.estimationText}>공인중개 수수료</Text>
                <Text style={styles.estimationText}>계약 전 미리 확인하세요!</Text>
              </View>

              <View style={styles.estimationImageContainer}>
                <Text style={{ fontSize: 18, color: 'rgb(160,195,255)' }}>평균 9개 견적도착</Text>
                <Image
                  source={require('../assets/buildingMoney.png')}
                  style={{ width: 150, height: 120, backgroundColor: 'rgba(255,255,255,0)' }}
                />
              </View>
              <View style={styles.estimationTouchContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ showUserForm: true })}
                  style={{ flexDirection: 'row' }}
                >
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>견적요청</Text>
                  <Icon name="arrowright" type="antdesign" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.estimationCartContainer} onPress={this._navigateToEstimationPage.bind(this)}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.estimationText}>내 견적 확인하기 </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...styles.estimationText, fontSize: 15 }}>견적확인</Text>
              <AntDesign style={{ ...styles.estimationText, fontSize: 20 }} name="arrowright" />
            </View>
          </TouchableOpacity>
          <Separator color="rgb(230,230,230)" height={7} width={screen.width} />
          <View style={styles.KCContainer}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>최근 거래후기</Text>
            <FlatList
              style={styles.KCList}
              data={KCData}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <Separator height={1} color="rgb(240,240,240)" width={screen.width - 30} />}
              renderItem={({ item }) => <HomeKCComponent item={item} width={screen.width - 30} />}
            />
          </View>
          <Separator color="rgb(230,230,230)" height={7} width={screen.width} />
          <View style={styles.agentPageCntainer}>
            <TouchableOpacity style={styles.agentPageTouchContainer} onPress={this._navigateToDealerPage.bind(this)}>
              <Text style={{ color: 'white', fontSize: 26, fontWeight: '700' }}>공인중개사용 페이지 가기</Text>
              <Icon name="arrowright" type="antdesign" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <UserFrom visible={this.state.showUserForm} onPress={() => this.setState({ showUserForm: false })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 20,
    marginTop: 80,
    alignItems: 'center',
  },
  getEstimationContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  getEstimation: {
    width: screen.width - 30,
    height: 250,
    padding: 25,
    borderRadius: 5,
    backgroundColor: 'rgb(25,148,255)',
  },

  estimationTextContainer: {
    alignItems: 'flex-start',
  },
  estimationText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  estimationImageContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  estimationTouchContainer: {
    alignItems: 'flex-end',
    paddingRight: 5,
    marginTop: 10,
  },
  KCContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  KCList: {
    marginVertical: 15,
  },
  agentPageCntainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  agentPageTouchContainer: {
    width: screen.width - 30,
    height: 60,
    padding: 6,
    borderRadius: 5,
    backgroundColor: 'rgb(25,148,255)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  estimationCartContainer: {
    width: screen.width - 30,
    marginLeft: 15,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 30,
    height: 80,
    borderRadius: 5,
    backgroundColor: 'rgb(15,90,180)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  estimationText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
})
