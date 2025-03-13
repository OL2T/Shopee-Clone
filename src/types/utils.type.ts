export interface SuccessResponseAPI<Data> {
  message: string
  data: Data
}
export interface ErrorResponseAPI<Data> {
  message: string
  data?: Data
}

// cú pháp '-?' để loại bỏ undefined của key optional
export type NotUndefinedField<T> = {
  [P in keyof T]-?: NotUndefinedField<NonNullable<T[P]>>
}
