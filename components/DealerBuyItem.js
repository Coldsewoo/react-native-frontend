import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import Chip from '../atoms/Chip'
import CircleText from '../atoms/CircleText'

export default class DealerBuyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      color: 'rgb(25,148,255)',
    }
  }

  componentDidMount() {
    const color = this.props.type === '매수' ? 'rgb(25,148,255)' : 'rgb(220,20,60)'
    this.setState({ color })
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
    return (
      <View style={{ ...styles.Container, width: this.props.width }}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => this.props.onPressItem(this.props.item.id)}>
          <CircleText
            size={45}
            textColor={this.props.checked ? 'white' : this.state.color}
            textSize={30}
            paddingTop={5}
            text={<AntDesign style={{ fontSize: 30 }} name="check" />}
            color={this.props.checked ? this.state.color : 'white'}
          />
        </TouchableOpacity>
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
        </View>
      </View>
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
  buttonContainer: {
    justifyContent: 'center',
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
