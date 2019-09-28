import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from 'react-native'
import EstimationBuyItem from '../components/EstimationBuyItem'
import EstimationSellItem from '../components/EstimationSellItem'
import Separator from '../atoms/Separator'
import MyEstimationModal from '../templates/MyEstimationModal'

const screen = Dimensions.get('window')

const myCartData = [
  {
    id: 1,
    type: '매수',
    district1: '강남구',
    district2: '압구정동',
    transactionOptions: ['매매', '전세'],
    buildingOptions: ['아파트', '빌라'],
    depositFrom: 1000,
    depositTo: 5000,
    currentDeal: [
      {
        id: 1,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 2,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'fjiejife 부동산',
        value: 0.4,
      },
      {
        id: 3,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'asd 부동산',
        value: 0.3,
      },
    ],
    status: '진행중',
  },
  {
    id: 2,
    type: '매수',
    district1: '성북구',
    district2: '안암동',
    depositFrom: 5000,
    depositTo: 7000,
    transactionOptions: ['매매', '전세', '월세'],
    buildingOptions: ['아파트', '빌라', '원룸'],
    currentDeal: [
      {
        id: 1,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 2,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'fjiejife 부동산',
        value: 0.4,
      },
      {
        id: 3,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'as12d 부동산',
        value: 0.3,
      },
      {
        id: 4,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'as12d 부동산',
        value: 0.3,
      },
      {
        id: 5,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'as12d 부동산',
        value: 0.3,
      },
      {
        id: 6,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 7,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 8,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 9,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 10,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
      {
        id: 11,
        address: '서울시 강남구 압구정동',
        star: 1.5,
        name: 'abc 부동산',
        value: 0.5,
      },
    ],
    status: '진행중',
  },
  {
    id: 3,
    type: '매도',
    floor: 3,
    area: 24.3,
    district1: '성북구',
    district2: '정릉동',
    address: '정릉아파트',
    currentDeal: [],
    status: '진행중',
  },
  {
    id: 4,
    type: '매도',
    district1: '강남구',
    district2: '압구정동',
    address: '압구정아파트',
    floor: 10,
    area: 32,
    currentDeal: [
      {
        id: 1,
        name: 'abc 부동산',
        address: '서울시 강남구 압구정동',
        star: 1.5,
        value: 0.5,
      },
      {
        id: 2,
        name: 'fjiejife 부동산',
        address: '서울시 강남구 압구정동',
        star: 3.5,
        value: 0.4,
      },
      {
        id: 3,
        name: 'as12d 부동산',
        address: '서울시 강남구 압구정동',
        star: 4.2,
        value: 0.3,
      },
      {
        id: 5,
        name: 'as12d 부동산',
        address: '서울시 강남구 압구정동',
        star: 4.5,
        value: 0.3,
      },
    ],
    status: '진행중',
  },
]

export default class MyEstimationPage extends Component {
  constructor() {
    super()
    this.state = {
      currentModal: [],
    }
  }

  _keyExtractor = item => {
    return item.id.toString()
  }

  _onPressItem = id => {
    const current = this.state.currentModal.map(e => e)
    current.push(id)
    this.setState({ currentModal: current })
  }

  _onCloseModal = id => {
    const current = this.state.currentModal.map(e => e)
    const index = current.indexOf(id)
    current.splice(index, 1)
    this.setState({ currentModal: current })
  }

  _renderModal = id => {
    const item = myCartData.filter(e => e.id === id)[0]
    return <MyEstimationModal key={id} item={item} onPress={id => this._onCloseModal(id)} />
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>내 견적 확인하기</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.EstimationListContainer}>
            <FlatList
              style={styles.EstimationList}
              data={myCartData}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }}></View>}
              renderItem={({ item }) =>
                item.type === '매수' ? (
                  <EstimationBuyItem
                    onPressItem={item => this._onPressItem(item)}
                    width={screen.width - 30}
                    item={item}
                  />
                ) : (
                  <EstimationSellItem
                    onPressItem={item => this._onPressItem(item)}
                    width={screen.width - 30}
                    item={item}
                  />
                )
              }
            />
          </View>
          {this.state.currentModal.map(id => {
            return this._renderModal(id)
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  topTextContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    marginHorizontal: 10,
  },
  EstimationListContainer: {
    marginVertical: 30,
  },
  EstimationList: {},
})
