'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X } from 'lucide-react'
import AWS from 'aws-sdk'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type FormData = {
  title: string
  content: string
  tags: string
}

export default function CreateNewsPage() {
  const [image, setImage] = useState<File | null>(null)
  const [imageURL, setImageURL] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  const handleImageUpload = async (file: File) => {
    setLoading(true)

    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: 'eu-north-1',
    })

    const params = {
      Bucket: 'spotify-nf',
      Key: `news/${file.name}`,
      Body: file,
      ACL: 'public-read',
    }

    return new Promise<string>((resolve, reject) => {
      s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
        if (err) {
          console.error('Ошибка загрузки файла:', err)
          setLoading(false)
          reject(err)
        } else {
          console.log('Файл успешно загружен:', data)
          setLoading(false)
          resolve(data.Location)
        }
      })
    })
  }

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)

    try {
      const uploadedImageUrl = await handleImageUpload(file)
      setImageURL(uploadedImageUrl)
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: handleDrop,
  })

  const onSubmit = async (data: FormData) => {
    const jsonData = {
      title: data.title,
      content: data.content,
      tags: data.tags.split(',').map(tag => tag.trim()),
      image: imageURL,
    }

    console.log('Данные для отправки:', jsonData)

    try {
      const response = await axios.post('https://globalnewsapi-production-51a9.up.railway.app/api/v1/news', jsonData, {
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('Новость успешно создана:', response.data)
    } catch (error) {
      console.error('Ошибка создания новости:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 font-mono">
      <h1 className="text-2xl font-bold mb-4">Создать новость</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Заголовок"
          id="title"
          name="title"
          control={control}
          rules={{ required: 'Заголовок обязателен' }}
          placeholder="Введите заголовок новости"
          error={errors.title}
        />
        <InputField
          label="Содержание"
          id="content"
          name="content"
          control={control}
          rules={{ required: 'Содержание обязательно' }}
          placeholder="Введите содержание новости"
          error={errors.content}
          textarea
        />
        <InputField
          label="Теги (через запятую)"
          id="tags"
          name="tags"
          control={control}
          placeholder="Введите теги через запятую"
        />
        <div>
          <Label>Изображение</Label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer ${
              isDragActive ? 'border-primary' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {loading ? (
              <p>Загружаем...</p>
            ) : image ? (
              <ImagePreview image={image} onDelete={() => setImage(null)} />
            ) : (
              <p>Перетащите изображение сюда или нажмите для выбора</p>
            )}
          </div>
        </div>
        <Button type="submit" className="bg-red-600 text-white rounded-xl hover:bg-black">
          Создать новость
        </Button>
      </form>
    </div>
  )
}

type InputFieldProps = {
  label: string
  id: string
  name: keyof FormData
  control: any
  rules?: Record<string, any>
  placeholder: string
  textarea?: boolean
  error?: any
}

function InputField({ label, id, name, control, rules, placeholder, textarea, error }: InputFieldProps) {
  const InputComponent = textarea ? Textarea : Input
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <InputComponent {...field} id={id} placeholder={placeholder} />}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}

type ImagePreviewProps = {
  image: File
  onDelete: () => void
}

function ImagePreview({ image, onDelete }: ImagePreviewProps) {
  return (
    <div className="relative">
      <Image
        src={URL.createObjectURL(image)}
        alt="Загруженное изображение"
        width={200}
        height={200}
        className="mx-auto"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
        aria-label="Удалить изображение"
      >
        <X size={16} />
      </button>
    </div>
  )
}
