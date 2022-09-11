type Customer = {
  email: string,
  name: string
}

type CustomerList ={
  name: ID,
  value: Customer
}

type Item = {
  item_id: ID
  name: string,
  price: number,
  quantity: number
}

type TrackingItem = {
  customer_id: ID,
  customer: Customer, 
  items: Item[]
}

type TrackingItemsList = {
  name: string,
  value: TrackingItem
}

type OrderResponse = {
  value: Order,
}

type CustomerResponse = {
  name: ID,
  value: Customer
}

type Order = {
  Address: string,
  City: string,
  Lat: number,
  Lng: number,
  carrier: string,
  createdAt: string,
  shippingCost: number,
  trackingId: string,
  trackingItems: TrackingItem,
}
