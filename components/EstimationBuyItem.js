import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Chip from '../atoms/Chip'
import CircleText from '../atoms/CircleText'
import { observer, inject } from 'mobx-react'

@inject('rootStore')
@observer
export default class EstimationBuyItem extends Component {
  constructor(props) {
    super(props)
  }

  _renderChips = options => {
    return options.map((option, idx) => {
      const activated = false
      return (
        <Chip
          key={idx}
          name={option}
          onChipTouched={() => {}}
          activated={activated}
          style={{
            height: 18,
            borderRadius: 9,
            textSize: 10,
            paddingHorizontal: 3,
            marginVertical: 2,
            marginRight: 1,
          }}
        />
      )
    })
  }

  render() {
    const len = this.props.rootStore.deals.filter(e => e.cartId === this.props.item.id).length

    return (
      <TouchableOpacity
        style={{ ...styles.Container, width: this.props.width }}
        onPress={this.props.onPressItem.bind(this, this.props.item.id)}
      >
        <View style={styles.typeTextContainer}>
          <Text style={styles.typeText}>매수</Text>
        </View>
        <View style={styles.districtContainer}>
          <Text style={styles.districtText}>{this.props.item.district1}</Text>
          <Text style={styles.districtText}>{this.props.item.district2}</Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>{this._renderChips(this.props.item.buildingOptions)}</View>
          <View style={{ flexDirection: 'row' }}>{this._renderChips(this.props.item.transactionOptions)}</View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{this.props.item.status}</Text>
          <View
            style={{
              alignContent: 'center',
              borderColor: 'rgba(155,155,155,0.2)',
              borderWidth: 1,
              marginHorizontal: 5,
              width: 10,
            }}
          ></View>
          <View>
            <CircleText
              size={25}
              color={len > 0 ? 'rgb(220,20,60)' : 'rgb(25,148,255)'}
              textSize={15}
              text={len}
              textColor="white"
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    borderColor: 'rgba(15,90,180,0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 15,
  },
  typeTextContainer: {
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 7,
  },
  typeText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgb(25,148,255)',
  },
  districtContainer: {
    alignItems: 'flex-start',
    marginLeft: 8,
    justifyContent: 'center',
    width: 47,
  },
  districtText: {
    fontSize: 11,
    fontWeight: '400',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
})
