import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class MyEstimationModalBuyInfo extends Component {
  constructor(props) {
    super(props)
  }

  _convertedArea = area => {
    return Number.prototype.toFixed.bind(area * 3.30579)(2)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'rgb(80,80,80)' }}>견적 요청정보</Text>
        </View>
        <View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>지역: </Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text style={styles.optionsText}>{this.props.item.district1}</Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text style={styles.optionsText}>{this.props.item.district2}</Text>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>건물명(단지명): </Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text style={styles.optionsText}>{this.props.item.address}</Text>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>층수: </Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text style={styles.optionsText}>{this.props.item.floor}층</Text>
            </View>
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>면적: </Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text style={styles.optionsText}>
                {this.props.item.area}평 / {this._convertedArea(this.props.item.area)}㎡
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 5,
  },
  optionTitleText: {
    fontWeight: '600',
    fontSize: 16,
  },
  optionsTextContainer: {
    marginHorizontal: 3,
    justifyContent: 'center',
  },
  optionsText: {
    fontSize: 16,
  },
})
