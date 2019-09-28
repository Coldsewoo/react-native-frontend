import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import PickerView from '../atoms/PickerVIewAndroid'
import { AntDesign } from '@expo/vector-icons'
import Chip from '../atoms/Chip'
import FormTextInput from '../atoms/FormTextInput'

const screen = Dimensions.get('window')

const district1Options = [
  { label: '전체', value: '전체' },
  { label: '강남구', value: '강남구' },
  { label: '서초구', value: '서초구' },
  { label: '송파구', value: '송파구' },
  { label: '성북구', value: '성북구' },
]
const district2Options = {
  전체: [{ label: '전체', value: '전체' }],
  강남구: [
    { label: '전체', value: '전체' },
    { label: '신사동', value: '신사동' },
    { label: '논현동', value: '논현동' },
    { label: '압구정동', value: '압구정동' },
    { label: '청담동', value: '청담동' },
    { label: '삼성동', value: '삼성동' },
    { label: '대치동', value: '대치동' },
    { label: '역삼동', value: '역삼동' },
    { label: '도곡동', value: '도곡동' },
    { label: '개포동', value: '개포동' },
    { label: '세곡동', value: '세곡동' },
    { label: '일원동', value: '일원동' },
    { label: '수서동', value: '수서동' },
  ],
  서초구: [
    { label: '전체', value: '전체' },
    { label: '서초동', value: '서초동' },
    { label: '잠원동', value: '잠원동' },
    { label: '반포동', value: '반포동' },
    { label: '방배동', value: '방배동' },
    { label: '양재동', value: '양재동' },
    { label: '내곡동', value: '내곡동' },
  ],
  송파구: [
    { label: '전체', value: '전체' },
    { label: '풍납동', value: '풍납동' },
    { label: '거여동', value: '거여동' },
    { label: '마천동', value: '마천동' },
    { label: '방이동', value: '방이동' },
    { label: '오륜동', value: '오륜동' },
    { label: '오금동', value: '오금동' },
    { label: '송파동', value: '송파동' },
    { label: '석촌동', value: '석촌동' },
    { label: '삼전동', value: '삼전동' },
    { label: '가락동', value: '가락동' },
    { label: '문정동', value: '문정동' },
    { label: '장지동', value: '장지동' },
    { label: '위례동', value: '위례동' },
    { label: '잠실동', value: '잠실동' },
  ],
  성북구: [
    { label: '전체', value: '전체' },
    { label: '성북동', value: '성북동' },
    { label: '삼선동', value: '삼선동' },
    { label: '동선동', value: '동선동' },
    { label: '돈암동', value: '돈암동' },
    { label: '안암동', value: '안암동' },
    { label: '보문동', value: '보문동' },
    { label: '정릉동', value: '정릉동' },
    { label: '길음동', value: '길음동' },
    { label: '종암동', value: '종암동' },
    { label: '월곡동', value: '월곡동' },
    { label: '장위동', value: '장위동' },
    { label: '석관동', value: '석관동' },
  ],
}

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
