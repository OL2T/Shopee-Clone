interface XDialogProps {
  isOpen: boolean
  title?: string
  message: string
  onCancelText?: string
  onConfirmText?: string
  onCancel: () => void
  onConfirm: () => void
}

export default function XDialog({
  isOpen,
  title,
  message,
  onCancelText = 'Hủy',
  onConfirmText = 'Đồng ý',
  onCancel,
  onConfirm
}: XDialogProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white rounded shadow-sm min-w-80 max-w-[550px]'>
        {title && (
          <h3 className=' font-medium px-5 py-3 border-b border-gray-300 text-orange'>
            {title}
          </h3>
        )}
        <div className='px-5 py-4'>
          <div className='text-sm mb-6 text-gray-700'>{message}</div>
        </div>
        <div className='flex justify-end space-x-5 border-t border-gray-300 py-3 px-5'>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-200 text-gray-800  hover:bg-gray-300'
          >
            {onCancelText}
          </button>
          <button
            onClick={onConfirm}
            className='px-6 py-2 border border-orange max-w-[250px] text-orange  rounded-sm bg-orange bg-opacity-10 hover:bg-opacity-5'
          >
            {onConfirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
