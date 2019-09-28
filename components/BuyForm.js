import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import PickerView from '../atoms/PickerVIewAndroid'
import Chip from '../atoms/Chip'

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

const depositToOptions = [
  { label: '무제한', value: 50000000 },
  { label: '0만원', value: 0 },
  { label: '100만원', value: 100 },
  { label: '500만원', value: 500 },
  { label: '1000만원', value: 1000 },
  { label: '2000만원', value: 2000 },
  { label: '3000만원', value: 3000 },
  { label: '4000만원', value: 4000 },
  { label: '5000만원', value: 5000 },
  { label: '6000만원', value: 6000 },
  { label: '7000만원', value: 7000 },
  { label: '8000만원', value: 8000 },
  { label: '9000만원', value: 9000 },
  { label: '10000만원', value: 10000 },
  { label: '12000만원', value: 12000 },
  { label: '14000만원', value: 14000 },
  { label: '18000만원', value: 18000 },
  { label: '20000만원', value: 20000 },
  { label: '25000만원', value: 25000 },
  { label: '30000만원', value: 30000 },
]
const depositFromOptions = depositToOptions.map(e => e)
depositFromOptions.shift()

const buildingOptions = ['아파트', '빌라', '오피스텔', '원룸']
const transactionOptions = ['매매', '전세', '월세']

export default class BuyForm extends Component {
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
        {
          name: 'depositFrom',
          value: { label: '0만원', value: 0 },
        },
        {
          name: 'depositTo',
          value: { label: '무제한', value: 50000000 },
        },
      ],
      activatedChips: [],
    }
  }

  componentDidMount() {
    const pickers = this.state.pickers.slice()
    for (const i in pickers) {
      pickers[i].show = false
    }
    this.setState({ pickers, activatedChips: [] })
  }

  /**
   *  @param {string} type name of the picker to show
   */
  _renderPicker = type => {
    const pickerStatus = this.state.pickers.filter(picker => picker.name === type)[0]
    const district1Value = this.state.pickers.filter(picker => picker.name === 'district1')[0].value.value
    const depositFromValue = this.state.pickers.filter(picker => picker.name === 'depositFrom')[0].value.value
    const depositToOptionsFilterd = depositToOptions.filter(e => e.value >= depositFromValue)
    let data
    switch (type) {
      case 'depositFrom':
        data = depositFromOptions
        break
      case 'depositTo':
        data = depositToOptionsFilterd
        break
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

  _renderChips = options => {
    return options.map((option, idx) => {
      const activated = this.state.activatedChips.indexOf(option) !== -1
      return (
        <Chip
          key={idx}
          name={option}
          onChipTouched={option => this._onChipTouched(option)}
          activated={activated}
          style={{
            height: 30,
            borderRadius: 15,
            textSize: 15,
            paddingHorizontal: 10,
            marginVertical: 5,
            marginRight: 8,
          }}
        />
      )
    })
  }

  _onChipTouched = option => {
    if (this.state.activatedChips.indexOf(option) === -1) {
      this._onChipSelected(option)
    } else {
      this._onChipUnSelected(option)
    }
  }

  _onChipSelected = option => {
    const activated = this.state.activatedChips.slice()
    activated.push(option)
    this.setState({ activatedChips: activated })
  }

  _onChipUnSelected = option => {
    const activated = this.state.activatedChips.slice()
    const idx = activated.indexOf(option)
    activated.splice(idx, 1)
    this.setState({ activatedChips: activated })
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
        <View style={styles.pickerContainer}>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>예산</Text>
          </View>

          <View style={styles.pickerWithLabel}>
            <View>{this._renderPicker.bind(this)('depositFrom')}</View>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                borderColor: 'black',
                borderWidth: 1,
                marginHorizontal: 5,
              }}
            ></View>
            <View>{this._renderPicker.bind(this)('depositTo')}</View>
          </View>
        </View>
        <View style={styles.chipContainer}>
          <View style={{ ...styles.chipItemContainer }}>
            <View style={styles.chipItemText}>
              <Text style={styles.checkTitle}>구조</Text>
            </View>
            <View style={styles.chipsContainer}>{this._renderChips(buildingOptions)}</View>
          </View>
          <View style={{ ...styles.chipItemContainer }}>
            <View style={styles.chipItemText}>
              <Text style={styles.checkTitle}>거래형태</Text>
            </View>
            <View style={styles.chipsContainer}>{this._renderChips(transactionOptions)}</View>
          </View>
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
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendFormButton: {
    backgroundColor: 'rgb(25,148,255)',
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
