import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity, Picker } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const screen = Dimensions.get('window')

/**
 * @param {Object} props:
 *  @param {Object<show: boolean, name: string, value: Array<label: string, value: string | number>>} status
 *  @param {Array<{label: string, value: string}>} data
 */

export default class PickerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      label: '',
    }
  }

  componentDidMount() {
    this.setState({
      value: this.props.status.value.value,
      label: this.props.status.value.label,
    })
  }

  _onPressPickerConfirm = () => {
    this.props.onPressPickerConfirm(this.state.value, this.state.label, this.props.status.name)
  }

  _onValueChange = (val, idx) => {
    const { value, label } = this.props.data[idx]
    this.setState({ value, label }, () => {
      this._onPressPickerConfirm()
    })
  }

  render() {
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={this.state.value}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={this._onValueChange.bind(this)}
          mode="dropdown"
          prompt="as"
        >
          {this.props.data.map((item, idx) => (
            <Picker.Item label={item.label} key={idx} value={item.value} />
          ))}
        </Picker>
        <AntDesign name="caretdown" style={styles.pickerOpenerIconStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 5,
    marginRight: 10,
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 5,
    width: 100,
    height: 22,
    borderWidth: 1,
    borderColor: 'grey',
  },
  pickerItem: {
    backgroundColor: 'white',
  },
  pickerOpenerIconStyle: {
    fontSize: 14,
    color: 'rgb(126,126,126)',
  },
})
