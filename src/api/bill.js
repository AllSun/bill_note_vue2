import request from '@/utils/request'
export const getBillList = () => {
  return request.get('/api/bill/list?date=2024-07&type_id=all&page=1&page_size=5')
}
