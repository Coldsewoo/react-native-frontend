import { types } from 'mobx-state-tree'
import { KCData } from './KCInfo'

const KC = types.model('KC', {
  id: types.number,
  date: types.number,
  district1: types.string,
  district2: types.string,
  buildingType: types.string,
  transactionType: types.string,
  saved: types.number,
  comment: types.string,
})

const KCStore = types
  .model('KCStore', {
    KCArray: types.array(KC),
  })
  .views(self => ({
    get data() {
      return self
    },
  }))
  .create({ KCArray: KCData })

export default KCStore
