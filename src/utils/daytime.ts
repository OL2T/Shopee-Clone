export const salesDay = [
  '1/1',
  '2/2',
  '3/3',
  '4/4',
  '5/5',
  '6/6',
  '7/7',
  '8/8',
  '9/9',
  '10/10',
  '11/11',
  '12/12'
]
export const currentDayWithoutYear = new Date()
  .toISOString()
  .split('T')[0]
  .slice(5)
