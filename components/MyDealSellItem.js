import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class EstimationSellItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      color: 'rgb(25,148,255)',
    }
  }

  componentDidMount() {
    const color = 'rgba(80,80,80,0.5)'
    this.setState({ color })
  }
  _convertedArea = area => {
    return Number.prototype.toFixed.bind(area * 3.30579)(2)
  }

  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.Container, width: this.props.width }}
        onPress={this.props.onPressItem.bind(this, this.props.item.id)}
      >
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
          <View
            style={{
              alignContent: 'center',
              borderColor: 'rgba(155,155,155,0.2)',
              borderWidth: 1,
              marginHorizontal: 5,
              width: 10,
            }}
          ></View>
          <View style={styles.valueContainer}>
            <View
              style={{
                width: 46,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: this.state.color,
                borderRadius: 5,
                paddingHorizontal: 3,
              }}
            >
              <Text style={styles.valueText}>{this.props.item.deal}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  valueContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  valueText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
})
