import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import CircleText from '../atoms/CircleText'
import { AntDesign } from '@expo/vector-icons'

export default class DealerSellItem extends Component {
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
  _convertedArea = area => {
    return Number.prototype.toFixed.bind(area * 3.30579)(2)
  }

  render() {
    return (
      <View style={styles.Container}>
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
          <Text style={styles.typeText}>매도</Text>
        </View>
        <View>
          <View style={styles.districtContainer}>
            <View style={styles.districtTextContainer}>
              <Text style={styles.districtText}>{this.props.item.district1}</Text>
            </View>
            <View style={styles.districtTextContainer}>
              <Text style={styles.districtText}>{this.props.item.district2}</Text>
            </View>
            <View style={styles.districtTextContainer}>
              <Text style={styles.districtText}>{this.props.item.address}</Text>
            </View>
          </View>
          <View style={styles.districtContainer}>
            <View style={styles.districtTextContainer}>
              <Text style={styles.districtText}>{`${this.props.item.area}평 / ${this._convertedArea(
                this.props.item.area,
              )}㎡ / ${this.props.item.floor}층`}</Text>
            </View>
          </View>
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
    borderColor: 'rgba(190,15,40,0.3)',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
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
    color: 'rgb(220,20,60)',
  },
  districtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    justifyContent: 'flex-start',
    marginBottom: 3,
  },
  districtText: {
    fontSize: 12,
    fontWeight: '400',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  districtTextContainer: {
    marginRight: 5,
  },
})
