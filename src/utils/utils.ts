import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constant/httpStatusCode.enum'
import { ErrorResponseAPI } from 'src/types/utils.type'

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

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  )
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<
      ErrorResponseAPI<{ name: string; message: string }>
    >(error) && error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(number: number) {
  return '₫' + new Intl.NumberFormat('de-DE').format(number)
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

export const removeSpecialCharacter = (str: string) => {
  /* eslint-disable no-useless-escape */
  return str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i.')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName: string) => {
  return `${avatarName}`
}
