import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class MyEstimationModalBuyInfo extends Component {
  constructor(props) {
    super(props)
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
              <Text style={styles.optionTitleText}>주거형태: </Text>
            </View>
            {this.props.item.buildingOptions.map((e, idx) => {
              return (
                <View key={idx} style={styles.optionsTextContainer}>
                  <Text style={styles.optionsText}>
                    {idx === this.props.item.buildingOptions.length - 1 ? e : e + ','}
                  </Text>
                </View>
              )
            })}
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>견적유형: </Text>
            </View>
            {this.props.item.transactionOptions.map((e, idx) => {
              return (
                <View key={idx} style={styles.optionsTextContainer}>
                  <Text style={styles.optionsText}>
                    {idx === this.props.item.transactionOptions.length - 1 ? e : e + ','}
                  </Text>
                </View>
              )
            })}
          </View>
          <View style={styles.optionsContainer}>
            <View>
              <Text style={styles.optionTitleText}>예산: </Text>
            </View>
            <View style={styles.optionsTextContainer}>
              <Text
                style={styles.optionsText}
              >{`${this.props.item.depositFrom}만원 ~ ${this.props.item.depositTo}만원`}</Text>
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
    fontWeight: '500',
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
