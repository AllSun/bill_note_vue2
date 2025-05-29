/* eslint-disable camelcase */
import request from '@/utils/request'
export const getBillList = (date, type_id, page) => {
  console.log(`/api/bill/list?date=${date}&type_id=${type_id || 'all'}&page=${page || 1}&page_size=5`)
  // date: '2023-10-01', type_id: 'all', page: 1
  return request.get(`/api/bill/list?date=${date}&type_id=${type_id || 'all'}&page=${page || 1}&page_size=6`)
}
