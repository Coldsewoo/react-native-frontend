import React from 'react'
import { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity, Picker } from 'react-native'
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
    this.setState({ value, label })
  }

  render() {
    return (
      <Modal transparent={true} visible={this.props.status.show}>
        <View style={{ flex: 1, backgroundColor: 'rgba(160,160,160,0.2)', justifyContent: 'flex-end' }}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.value}
              style={styles.picker}
              onValueChange={this._onValueChange.bind(this)}
            >
              {this.props.data.map((item, idx) => (
                <Picker.Item label={item.label} key={idx} value={item.value} />
              ))}
            </Picker>
            <View style={styles.pickerConfirm}>
              <TouchableOpacity onPress={this._onPressPickerConfirm.bind(this)}>
                <Text style={{ color: 'rgb(15,105,255)', fontSize: 25 }}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    backgroundColor: 'rgb(224,224,224)',
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  pickerConfirm: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
})
