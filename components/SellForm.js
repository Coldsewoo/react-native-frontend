import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import PickerView from '../atoms/PickerVIewAndroid'
import { AntDesign } from '@expo/vector-icons'
import Chip from '../atoms/Chip'
import FormTextInput from '../atoms/FormTextInput'
import { district1Options, district2Options } from '../store/DealOptions'

const screen = Dimensions.get('window')

export default class SellForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickers: [
        {
          name: 'district1',
          value: { label: '전체', value: '전체' },
        },
        {
          name: 'district2',
          value: { label: '전체', value: '전체' },
        },
      ],
      address: '',
      floor: 0,
      area: 0,
    }
  }

  /**
   *  @param {string} type name of the picker to show
   */
  _renderPicker = type => {
    const pickerStatus = this.state.pickers.filter(picker => picker.name === type)[0]
    const district1Value = this.state.pickers.filter(picker => picker.name === 'district1')[0].value.value
    let data
    switch (type) {
      case 'district1':
        data = district1Options
        break
      case 'district2':
        data = district2Options[district1Value]
        break
    }
    return (
      <PickerView
        status={pickerStatus}
        data={data}
        key={type}
        onPress={this._onPressPickerConfirm.bind(this)}
        onPressPickerConfirm={(value, label, name) => this._onPressPickerConfirm(value, label, name)}
      />
    )
  }

  _onPressPickerConfirm = (value, label, name) => {
    const pickers = this.state.pickers.map(e => e)
    for (const idx in pickers) {
      if (pickers[idx].name === name) {
        pickers[idx].value = { value, label }
      }
    }
    this.setState({ pickers })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>지역 설정</Text>
          </View>
          <View style={{ ...styles.picker, justifyContent: 'space-between' }}>
            <View style={styles.pickerWithLabel}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>구 </Text>
              {this._renderPicker.bind(this)('district1')}
            </View>
            <View style={styles.pickerWithLabel}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>동 </Text>
              {this._renderPicker.bind(this)('district2')}
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <FormTextInput labelText="건물명" placeholder="예) 은마아파트" />
        </View>
        <View style={styles.inputContainer}>
          <FormTextInput labelText="층수" placeholder="예) 8" appendText="층" keyboardType="numeric" />
        </View>
        <View style={styles.inputContainer}>
          <FormTextInput labelText="평형" placeholder="예) 32" appendText="평" keyboardType="numeric" />
        </View>
        <View style={styles.sendFrom}>
          <TouchableOpacity style={styles.sendFormButton}>
            <Text style={styles.sendFormButtonText}>견적요청 보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  picker: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    marginBottom: 10,
  },
  pickerWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipContainer: {
    height: 70,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  chipItemContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomColor: 'rgba(155,155,155,0.2)',
    borderBottomWidth: 1,
  },
  chipItemText: {
    marginRight: 10,
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  chipsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  checkTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  sendFrom: {
    marginTop: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendFormButton: {
    backgroundColor: 'rgb(220,20,60)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screen.width - 100,
  },
  sendFormButtonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
})
