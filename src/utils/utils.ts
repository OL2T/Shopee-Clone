import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  )
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat('de-DE').format(number)
}

export function formatNumberToSocialStyle(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}

export function formatDifferencePriceToPercent(
  originalPrice: number,
  newPrice: number
) {
  const discount = Math.round(
    ((originalPrice - newPrice) / originalPrice) * 100
  )
  return discount > 0 ? `-${discount}%` : `+${discount * -1}%`
}
