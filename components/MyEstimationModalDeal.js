import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import CircleText from '../atoms/CircleText'
import { AntDesign } from '@expo/vector-icons'

export default class MyEstimationModalDeal extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={this.props.onPress.bind(this, this.props.item.id)}>
          <CircleText
            size={45}
            textColor={this.props.checked ? 'white' : this.state.color}
            textSize={30}
            paddingTop={5}
            text={<AntDesign style={{ fontSize: 30 }} name="check" />}
            color={this.props.checked ? this.state.color : 'white'}
          />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.infoText, fontWeight: '600' }}>{this.props.item.name}</Text>
          <Text style={{ ...styles.infoText, fontSize: 11 }}>{this.props.item.address}</Text>
          <Text style={{ ...styles.infoText, color: 'rgb(249, 102, 16)' }}>
            <AntDesign name="star" size={12} /> {this.props.item.star} / 5
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <View
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: this.state.color,
              borderRadius: 10,
            }}
          >
            <Text style={styles.valueText}>{this.props.item.value}%</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(155,155,155,0.2)',
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  infoContainer: {
    marginRight: 5,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    fontWeight: '300',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  valueText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
})
