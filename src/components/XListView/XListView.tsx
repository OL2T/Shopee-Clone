import { ReactNode } from 'react'

export type ListItem = {
  title: string
  value: () => ReactNode
  align?: 'start' | 'center' | 'right' | 'end' | 'baseline' | 'stretch'
}

type XListViewProps = {
  dataView: ListItem[]
}

export default function XListView({ dataView }: XListViewProps) {
  return (
    <div className=''>
      {dataView.map((item, index) => (
        <div
          key={index}
          className={`flex gap-x-5 text-sm items-${item.align ? item.align : 'center'} py-1 mb-5`}
        >
          <div className='text-[#757575] w-[20%]'>{item.title}</div>
          <div className='text-gray-600'>{item.value()}</div>
        </div>
      ))}
    </div>
  )
}
