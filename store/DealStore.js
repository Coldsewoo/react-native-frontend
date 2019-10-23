import { types } from 'mobx-state-tree'
import { myCartData, DealData } from './DeallInfo'

const Deal = types.model('Deal', {
  id: types.identifierNumber,
  address: types.string,
  star: types.number,
  name: types.string,
  value: types.number,
  cartId: types.number,
})

const Cart = types
  .model('Cart', {
    id: types.identifierNumber,
    type: types.string,
    district1: types.string,
    district2: types.string,
    transactionOptions: types.optional(types.array(types.string), []),
    buildingOptions: types.optional(types.array(types.string), []),
    depositFrom: types.optional(types.number, 0),
    depositTo: types.optional(types.number, 0),
    currentDeal: types.optional(types.array(types.reference(types.late(() => Deal))), []),
    status: types.string,
    floor: types.optional(types.number, 0),
    area: types.optional(types.number, 0),
    deal: types.optional(types.number, 0),
  })
  .actions(self => ({
    setDeals(deals) {
      self.currentDeal = [...deals]
    },
  }))

const root = types
  .model('root', {
    carts: types.array(Cart),
    deals: types.array(Deal),
  })
  .views(self => ({
    currentDeals(cartId) {
      return self.deals.filter(deal.cartId === cartId)
    },
    get sellItems() {
      return self.carts.filter(cart => cart.type === '매도')
    },
    get buyItems() {
      return self.carts.filter(cart => cart.type === '매수')
    },
  }))
  .actions(self => ({
    addCart(cart) {
      self.carts.push(cart)
    },
    addDeal(deal) {
      self.deals.push(deal)
    },
    removeDeal(dealId) {
      const dealIdx = self.deals.map(deal => deal.id).indexOf(dealId)
      self.deals.splice(dealIdx, 1)
    },
    removeCart(cartId) {
      const cartIdx = self.carts.map(cart => cart.id).indexOf(cartId)
      self.carts.splice(cartIdx, 1)
    },
    currentCart(id) {
      const item = self.carts.filter(cart => cart.id === id)[0]
      return item
    },
    filteredDeal(filters) {
      return self.carts.filter(v => filters.every(f => f(v)))
    },
  }))
  .create({
    carts: myCartData,
    deals: DealData,
  })

export default root
