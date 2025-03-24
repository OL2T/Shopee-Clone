interface ToastData {
  message: string
}

export default function CustomToast({ message }: ToastData) {
  return (
    <div className='fixed inset-0  flex items-center justify-center z-50 '>
      <div className='bg-black bg-opacity-70 min-w-[340px] max-w-[400px] text-white py-10 px-5 rounded-sm'>
        <div className='flex justify-center items-center mb-5'>
          <div className='flex justify-center items-center w-[60px] h-[60px] bg-[#00bfa5] rounded-full'>
            <img
              alt='icon tick bold'
              className='w-[30px] h-[30px]'
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/ec6dc144acb66ebd1687.svg'
            />
          </div>
        </div>
        <div className='text-center' role='alert'>
          {message}
        </div>
      </div>
    </div>
  )
}
