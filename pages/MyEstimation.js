import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from 'react-native'
import EstimationBuyItem from '../components/EstimationBuyItem'
import EstimationSellItem from '../components/EstimationSellItem'
import Separator from '../atoms/Separator'
import MyEstimationModal from '../templates/MyEstimationModal'
import { observer, inject } from 'mobx-react'

const screen = Dimensions.get('window')

@inject('rootStore')
@observer
export default class MyEstimationPage extends Component {
  constructor(props) {
    super(props)
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
    const deals = this.props.rootStore.deals.filter(deal => deal.cartId === id).map(e => e)
    const item = this.props.rootStore.currentCart(id, deals)
    item.setDeals(deals)
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
              data={this.props.rootStore.carts}
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
