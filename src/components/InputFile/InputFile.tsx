import React, { useRef, useState } from 'react'
import Button from '../Button/Button'
import config from 'src/constant/config'
import { UseFormSetError } from 'react-hook-form'

interface InputFileProps {
  setError: UseFormSetError<Record<string, unknown>>
  onChange?: (file: File) => void
}

export default function InputFile({ setError, onChange }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUploadAvatar = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > config.maxSizeUpload) {
      setError('avatar', {
        message: 'Dung lượng file tối đa 1 MB',
        type: 'Size'
      })
      setTimeout(() => {
        setError('avatar', {
          message: '',
          type: 'Size'
        })
      }, 3000)
    } else {
      onChange && onChange(file)
    }
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg, .jpeg, .png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(e.target as any).value = null
        }}
      />
      <Button
        id='avatarUpload'
        type='button'
        className='flex justify-center mx-auto px-3 py-2 border border-gray-300 bg-black bg-opacity-[0.02] text-gray-700'
        onClick={handleUploadAvatar}
      >
        Chọn Ảnh
      </Button>
    </>
  )
}
