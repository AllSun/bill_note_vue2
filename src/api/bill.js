/* eslint-disable camelcase */
import request from '@/utils/request'
export const getBillList = (date, type_id, page) => {
  // console.log(`/api/bill/list?date=${date}&type_id=${type_id || 'all'}&page=${page || 1}&page_size=5`)
  // date: '2023-10-01', type_id: 'all', page: 1
  return request.get(`/api/bill/list?date=${date}&type_id=${type_id || 'all'}&page=${page || 1}&page_size=6`)
}
export const addBill = (params) => {
  console.log('添加数据的参数', params)
  return request.post('/api/bill/add', params)
}

export const getBillDetail = (id) => {
  console.log('获取订单语句', `/api/bill/detail?${id}`)
  return request.get(`/api/bill/detail?id=${id}`)
}

export const deleteBill = (id) => {
  return request.post('/api/bill/delete', { id })
}

export const updateBill = (params) => {
  return request.post('/api/bill/update', params)
}
