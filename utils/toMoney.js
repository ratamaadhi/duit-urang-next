export const toMoney = (money=0) =>{
  const _money = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(money)
  return _money
}