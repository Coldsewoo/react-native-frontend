import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import ModalLayout from '../components/ModalLayout'
import MyEstimationModalBuyInfo from '../components/MyEstimationModalBuyInfo'
import MyEstimationModalSellInfo from '../components/MyEstimationModalSellInfo'
import Separator from '../atoms/Separator'
import CircleText from '../atoms/CircleText'
import MyEstimationModalDeal from '../components/MyEstimationModalDeal'
import { AntDesign } from '@expo/vector-icons'

import { observer, inject } from 'mobx-react'

const screen = Dimensions.get('window')

@inject('rootStore')
@observer
export default class MyEstimationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDeal: [],
      currentDealModal: [],
      dragged: false,
      offsetTimeout: 0,
      offset: 0,
      color: 'rgb(25,148,255)',
    }
  }

  componentDidMount() {
    const color = this.props.item.type === '매수' ? 'rgb(25,148,255)' : 'rgb(220,20,60)'

    this.setState({
      currentDeal: this.props.item.currentDeal,
      color,
    })
  }

  _countCheck = deal => {
    return this.state.currentDealModal.includes(deal.id)
  }

  _onPressItem = id => {
    const current = this.state.currentDealModal.map(e => e)
    const index = current.indexOf(id)
    if (index === -1) {
      current.push(id)
    } else {
      current.splice(index, 1)
    }
    this.setState({ currentDealModal: current })
  }

  _onCloseModal = id => {
    const current = this.state.currentDealModal.map(e => e)
    const index = current.indexOf(id)
    current.splice(index, 1)
    this.setState({ currentDealModal: current })
  }

  _onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const dif = currentOffset - (this.state.offset || 0)
    const time = new Date().getTime()
    if (Math.abs(dif) < 20) {
      // do nothing
    } else if (dif < 0) {
      if (time > this.state.offsetTimeout + 400) {
        this.setState({ offsetTimeout: time })
      }
    } else {
      if (time > this.state.offsetTimeout + 200) {
        this.setState({ dragged: true, offsetTimeout: time })
      }
    }
    this.setState({ offset: currentOffset })
  }

  _selectAll = () => {
    const current = this.state.currentDeal.map(e => e.id)
    this.setState({ currentDealModal: current })
  }

  _dismissAll = () => {
    const current = []
    this.setState({ currentDealModal: current })
  }

  _cancelSelectedAlert = () => {
    Alert.alert(
      `견적 삭제하기`,
      `선택한 ${this.state.currentDealModal.length}개의 견적을 삭제하시겠습니까?`,
      [
        {
          text: '삭제',
          onPress: () => {
            this._cancelSelected()
          },
        },
        {
          text: '취소',
          onPress: () => {},
        },
      ],
      { cancelable: false },
    )
  }

  _cancelSelected = () => {
    const dealToCancel = this.state.currentDeal
      .map(e => e)
      .filter(deal => {
        return this.state.currentDealModal.includes(deal.id)
      })
    dealToCancel.map(deal => this.props.rootStore.removeDeal(deal.id))
    // this.props.item.setDeals(current)
    this.setState({ currentDealModal: [] })
  }

  _sendQueryAlert = () => {
    Alert.alert(
      `문의 보내기`,
      `선택한 ${this.state.currentDealModal.length}개의 견적에 문의를 보내시겠습니까?`,
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
    return (
      <ModalLayout visible={true} onPress={this.props.onPress.bind(this, this.props.item.id)} title="견적상세">
        {!this.state.dragged ? null : (
          <TouchableOpacity onPress={() => this.setState({ dragged: false })} style={styles.expandInfo}>
            <AntDesign name="caretdown" style={{ color: 'rgb(80,80,80)' }} />
          </TouchableOpacity>
        )}
        {!this.state.dragged ? (
          <View style={styles.infoContainer}>
            {this.props.item.type === '매수' ? (
              <MyEstimationModalBuyInfo item={this.props.item} />
            ) : (
              <MyEstimationModalSellInfo item={this.props.item} />
            )}
          </View>
        ) : null}

        <Separator height={3} color="rgb(240,240,240)" width={screen.width} />
        <View style={styles.currentDealContainer}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'rgb(80,80,80)' }}>견적 진행상황</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={{ fontSize: 23, fontWeight: '500' }}>{this.props.item.status}</Text>
            <View
              style={{
                alignContent: 'center',
                borderColor: 'rgba(155,155,155,0.3)',
                borderWidth: 1,
                marginHorizontal: 3,
                width: 35,
              }}
            ></View>
            <View>
              <CircleText
                size={40}
                color={this.state.currentDeal.length > 0 ? 'rgb(220,20,60)' : 'rgb(25,148,255)'}
                textSize={25}
                text={this.state.currentDeal.length}
                textColor="white"
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
          <TouchableOpacity
            style={{
              ...styles.dealSelectButton,
              marginLeft: 10,
              backgroundColor:
                this.state.currentDealModal.length !== this.state.currentDeal.length ? 'white' : this.state.color,
              borderColor: this.props.item.type === '매수' ? 'rgba(25,148,255, 0.5)' : 'rgba(220,20,60, 0.5)',
            }}
            onPress={this._selectAll.bind(this)}
          >
            <Text
              style={{
                ...styles.dealSelectButtonText,
                color:
                  this.state.currentDealModal.length === this.state.currentDeal.length ? 'white' : this.state.color,
              }}
            >
              전체선택
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.dealSelectButton,
              backgroundColor: this.state.currentDealModal.length === 0 ? 'white' : this.state.color,
              borderColor: this.props.item.type === '매수' ? 'rgba(25,148,255, 0.5)' : 'rgba(220,20,60, 0.5)',
            }}
            onPress={this._dismissAll.bind(this)}
          >
            <Text
              style={{
                ...styles.dealSelectButtonText,
                color: this.state.currentDealModal.length !== 0 ? 'white' : this.state.color,
              }}
            >
              선택 초기화
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{
                ...styles.dealSelectButton,
                backgroundColor: this.state.currentDealModal.length === 0 ? 'white' : this.state.color,
                borderColor: this.props.item.type === '매수' ? 'rgba(25,148,255, 0.5)' : 'rgba(220,20,60, 0.5)',
                marginRight: 20,
              }}
              onPress={this._cancelSelectedAlert.bind(this)}
            >
              <Text
                style={{
                  ...styles.dealSelectButtonText,
                  color: this.state.currentDealModal.length !== 0 ? 'white' : this.state.color,
                }}
              >
                선택삭제
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.dealComponentContainer}
          onScroll={this._onScroll.bind(this)}
          scrollEventThrottle={500}
        >
          {this.state.currentDeal.map(deal => {
            return (
              <MyEstimationModalDeal
                onPress={deal => this._onPressItem(deal)}
                width={screen.width - 30}
                item={deal}
                type={this.props.item.type}
                key={deal.id.toString()}
                checked={this._countCheck(deal)}
              />
            )
          })}
        </ScrollView>
        {this.state.currentDealModal.length === 0 ? null : (
          <TouchableOpacity
            onPress={this._sendQueryAlert.bind(this)}
            style={{ ...styles.sendQuery, backgroundColor: this.state.color }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
              }}
            >
              {this.state.currentDealModal.length}개의 견적 문의 보내기
            </Text>
          </TouchableOpacity>
        )}
      </ModalLayout>
    )
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    width: screen.width - 30,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  expandInfo: {
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDealContainer: {
    width: screen.width - 30,
    marginVertical: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dealComponentContainer: {
    width: screen.width - 30,
    margin: 5,
    height: 1000,
  },
  dealSelectButton: {
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginHorizontal: 3,
    height: 20,
    borderWidth: 1,
    borderRadius: 12,
  },
  dealSelectButtonText: {
    fontSize: 11,
    fontWeight: '200',
    color: 'rgb(80,80,80)',
  },
  sendQuery: {
    width: screen.width - 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 3,
  },
})
