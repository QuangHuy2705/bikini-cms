import React, { useState, useEffect, useCallback } from 'react'
import Spinner from '@src/@core/components/spinner/Fallback-spinner'
import { fetch, upload } from '../../../../service/index'
import { useDropzone } from 'react-dropzone'
import { PlusCircle as Plus, MinusCircle, Edit2, XCircle } from 'react-feather'
import styles from './style.module.scss'
export default function BackgroundManage(props) {
  const [loading, setLoading] = useState(true)
  const [background, setBackground] = useState([])

  const createBackground = async (url) => {
    const data = await fetch('post', '/v1/background', { image: url })
    getBackground()
  }

  const onDelete = async (id) => {
    setLoading(true)
    const data = await fetch('delete', `/v1/background/${id}`)
    getBackground()
  }

  function MyDropzone() {
    const onDrop = useCallback(async (acceptedFiles) => {
      setLoading(true)
      const res = await upload('/v1/upload', acceptedFiles[0])
      createBackground(res[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/png': ['.png', '.jpeg', '.jpg']
      }
    })

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Plus style={{ cursor: 'pointer' }} size={40} />
      </div>
    )
  }

  const getBackground = async () => {
    const data = await fetch('get', '/v1/background')
    setBackground(data)
    setLoading(false)
  }

  useEffect(() => {
    getBackground()
  }, [])

  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>Quản lý quảng cáo</h1>
        {background.length < 3 && <MyDropzone />}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {background.map((b) => (
            <div
              className={styles['image-container']}
              style={{ marginBottom: '50px' }}
              key={b.image}
            >
              <div
                className={styles[`image`]}
                style={{
                  backgroundImage: `url(${b.image})`,
                  height: '500px',
                  width: '100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'none',
                  backgroundSize: 'cover'
                }}
              ></div>
              <div className={styles['icons-container']}>
                <MinusCircle onClick={() => onDelete(b.id)} size={50} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
