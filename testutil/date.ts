import { add, sub } from 'date-fns'

export const dayOfWeekStr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const monthShortStr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
export const monthStr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDateObj = (
  date: Date,
): { year: number; month: number; date: number } => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
})

export const getDateStr = (date: Date): string => {
  const obj = getDateObj(date)
  return `${obj.year}/${(obj.month < 10 ? '0' : '') + obj.month}/${
    (obj.date < 10 ? '0' : '') + obj.date
  }`
}

export const getPlusMinusOneDate = (
  date: Date,
): { plus: Date; minus: Date } => ({
  plus: new Date(add(date, { days: 1 })),
  minus: new Date(sub(date, { days: 1 })),
})

export const getLazySecDate = (date: Date): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  )
