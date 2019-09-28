import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
const screen = Dimensions.get('window')

export default class MapFilterModalChip extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          ...styles.chipStyle,
          height: this.props.style.height,
          borderRadius: this.props.style.borderRadius,
          paddingHorizontal: this.props.style.paddingHorizontal,
          marginVertical: this.props.style.marginVertical,
          marginRight: this.props.style.marginRight,
          backgroundColor: this.props.activated ? 'rgb(25,148,255)' : 'white',
          width: 'auto',
        }}
        onPress={() => this.props.onChipTouched(this.props.name)}
      >
        <Text
          style={{ fontSize: this.props.style.textSize, color: this.props.activated ? 'white' : 'rgb(126,126,126)' }}
        >
          #{this.props.name}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  chipStyle: {
    backgroundColor: 'white',
    marginRight: 8,
    borderColor: 'rgba(155,155,155,0.2)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
})
