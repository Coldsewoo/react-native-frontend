import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import DealerFilterModal from '../templates/DealerFilterModal'
import Separator from '../atoms/Separator'
import DealerBuyItem from '../components/DealerBuyItem'
import DealerSellItem from '../components/DealerSellItem'

const screen = Dimensions.get('window')
const dealRequestData = [
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
    transactionOptions: ['매매', '전세'],
    buildingOptions: ['아파트'],
  },
  {
    id: 4,
    type: '매도',
    district1: '강남구',
    district2: '압구정동',
    address: '압구정아파트',
    floor: 10,
    area: 32,
    transactionOptions: ['매매'],
    buildingOptions: ['아파트'],
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

export default class DealerPage extends Component {
  constructor() {
    super()
    this.state = {
      filter: {
        district1: '전체',
        district2: '전체',
        type: '전체',
        transactionOptions: [],
        buildingOptions: [],
        dealOptions: [],
        estimationOptions: 0.25,
      },
      filters: [],
      showFilterModal: false,
      selected: [],
    }
  }

  _filteredItems = () => {
    const { district1, district2, type, transactionOptions, buildingOptions } = this.state.filter
    const district1Filter = v => {
      if (district1 === '전체') return true
      return v.district1 === district1
    }
    const district2Filter = v => {
      if (district2 === '전체') return true
      return v.district2 === district2
    }
    const typeFilter = v => {
      if (type === '전체') return true
      return v.type === type
    }
    const transactionOptionsFilter = v => {
      if (transactionOptions.length === 0) return true
      return v.transactionOptions.some(e => transactionOptions.includes(e))
    }
    const buildingOptionsFilter = v => {
      if (buildingOptions.length === 0) return true
      return v.buildingOptions.some(e => buildingOptions.includes(e))
    }
    const filters = [district1Filter, district2Filter, typeFilter, transactionOptionsFilter, buildingOptionsFilter]
    const filteredData = dealRequestData.filter(v => filters.every(f => f(v)))
    return filteredData
  }

  _closeFilterModal = () => this.setState({ showFilterModal: false })

  _confirmFilter = data => {
    const filters = [data.district1, data.district2, data.type, ...data.transactionOptions, ...data.buildingOptions]
    this.setState({ showFilterModal: false, filter: data, filters })
  }

  _countCheck = id => {
    return this.state.selected.includes(id)
  }

  _onPressItem = id => {
    const current = this.state.selected.map(e => e)
    const index = current.indexOf(id)
    if (index === -1) {
      current.push(id)
    } else {
      current.splice(index, 1)
    }
    this.setState({ selected: current })
  }

  _keyExtractor = item => {
    return item.id.toString()
  }

  _onPressConfirm = () => {
    Alert.alert(
      `문의 보내기`,
      `선택한 ${this.state.selected.length}개의 견적을 보내시겠습니까?`,
      [
        {
          text: '문의하기',
          onPress: () => {},
        },
        {
          text: '취소',
          onPress: () => {},
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    const filteredItems = this._filteredItems()

    return (
      <View style={styles.MainContainer}>
        <View style={styles.topTextContainer}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>견적 보내기</Text>
        </View>
        <View style={styles.filterContainer}>
          <View
            style={{ flexWrap: 'wrap', flexDirection: 'row', flex: 1, overflow: 'hidden', alignItems: 'flex-start' }}
          >
            {this.state.filters.filter(e => e !== '전체').length === 0 ? (
              <Text style={styles.filterText}>필터 : 전체</Text>
            ) : (
              this.state.filters
                .filter(e => e !== '전체')
                .map((filter, idx) => {
                  return (
                    <View key={idx} style={styles.filterTextContainer}>
                      <Text style={styles.filterText}>#{filter}</Text>
                    </View>
                  )
                })
            )}
          </View>

          <TouchableOpacity style={styles.filterButton} onPress={() => this.setState({ showFilterModal: true })}>
            <AntDesign name="USB" style={styles.filterButtonText} />
            <Text style={styles.filterButtonText}>필터 적용하기</Text>
          </TouchableOpacity>
        </View>
        <Separator height={8} color="rgba(155,155,155,0.2)" width={screen.width} />

        <View style={styles.estimationOptionsContainer}>
          <View style={styles.centerBar}></View>
          <View>
            <Text>현재 설정 : {this.state.filter.estimationOptions}%</Text>
          </View>
          <View style={styles.centerBar}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 20 }}>
          {filteredItems.map(item => {
            return item.type === '매수' ? (
              <View key={item.id.toString()} style={{ marginBottom: 10 }}>
                <DealerBuyItem
                  onPressItem={item => this._onPressItem(item)}
                  width={screen.width - 30}
                  type={item.type}
                  checked={this._countCheck(item.id)}
                  item={item}
                />
              </View>
            ) : (
              <View key={item.id.toString()} style={{ marginBottom: 10 }}>
                <DealerSellItem
                  onPressItem={item => this._onPressItem(item)}
                  width={screen.width - 30}
                  item={item}
                  type={item.type}
                  checked={this._countCheck(item.id)}
                />
              </View>
            )
          })}
        </ScrollView>
        <View style={styles.sendForm}>
          <TouchableOpacity style={styles.sendFormButton} onPress={this._onPressConfirm.bind(this)}>
            <Text style={styles.sendFormButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
        <DealerFilterModal
          visible={this.state.showFilterModal}
          onPress={this._closeFilterModal.bind(this)}
          onConfirm={data => this._confirmFilter(data)}
          filter={this.state.filter}
        />
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
  },
  topTextContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(155,155,155,0.05)',
    marginHorizontal: 10,
  },
  filterContainer: {
    marginVertical: 15,
    width: screen.width - 30,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTextContainer: {
    marginRight: 5,
  },
  filterText: {
    fontSize: 13,
    color: 'rgb(80,80,80)',
    fontWeight: '400',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(25,148,255)',
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 18,
    height: 30,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 12,
  },
  EstimationListContainer: {
    marginVertical: 30,
  },
  EstimationList: {},
  estimationOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  centerBar: {
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.2)',
    height: 1,
    width: 30,
  },
  sendForm: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: screen.width - 30,
    height: 50,
    bottom: 30,
  },
  sendFormButton: {
    backgroundColor: 'rgb(25,148,255)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: screen.width - 160,
  },
  sendFormButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
})
