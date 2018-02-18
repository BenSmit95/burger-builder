import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

export const purchaseBurgerFailed = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData).then((response) => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    }).catch((error) => {
      dispatch(purchaseBurgerFailed(error))
    });
  }
}

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json').then((res) => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
    }).catch((error) => {
      dispatch(fetchOrdersFailed(error));
    })
  }
}