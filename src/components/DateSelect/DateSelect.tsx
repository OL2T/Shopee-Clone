import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface DateSelectProps {
  errors?: string
  value?: Date
  onChange?: (date: Date) => void
}

export default function DateSelect({
  value,
  onChange,
  errors
}: DateSelectProps) {
  const currentYear = new Date().getFullYear()
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1910
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = e.target
    const newDate = {
      date: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1910,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className=''>
      <div className='flex items-center'>
        <div className='text-right mr-5 w-1/4 text-gray-600'>Ngày sinh</div>
        <div className='w-full flex justify-between gap-x-4'>
          <select
            name='date'
            onChange={handleChange}
            value={value?.getDate() || date.date}
            className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 cursor-pointer  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm hover:border-orange'
          >
            <option value=''>Ngày</option>
            {range(1, 32).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            value={value?.getMonth() || date.month}
            className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 cursor-pointer  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm hover:border-orange'
          >
            <option value=''>Tháng</option>
            {range(0, 12).map((month) => (
              <option key={month} value={month}>
                Tháng {month + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            value={value?.getFullYear() || date.year}
            className='w-1/3 bg-white px-4 py-2 border placeholder-gray-400 border-gray-300 cursor-pointer  focus:outline-none focus:ring-1 focus:ring-gray-900 placeholder:text-sm hover:border-orange'
          >
            <option value=''>Năm</option>
            {range(currentYear, 1909).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <span className='flex w-3/4 pl-[calc(20%+20px)] mt-1 text-sm min-h-[1.25rem] text-red-600'>
        {errors}
      </span>
    </div>
  )
}
