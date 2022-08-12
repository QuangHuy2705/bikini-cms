// ** React Imports
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react'
// ** Store & Actions
import { fetch, upload } from '../../../../service/index'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { PlusCircle as Plus, MinusCircle, Edit2, XCircle } from 'react-feather'
import DeleteModal from './DeleteModal'
import Spinner from '@src/@core/components/spinner/Fallback-spinner'
import styles from './production.module.scss'
import { Row, Col, Button, Form, Input, Label, FormGroup } from 'reactstrap'

const ProductManagement = () => {
  const [deleteShown, setDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currProd, setCurrProd] = useState({
    name: { en: '', pl: '', vn: '' },
    description: { en: '', pl: '', vn: '' }
  })
  const [cat, setCat] = useState([])
  const [size, setSize] = useState([])

  function MyDropzone() {
    const onDrop = useCallback(async (acceptedFiles) => {
      const res = await upload('/v1/upload', acceptedFiles[0])
      if (currProd.image) {
        setCurrProd({ ...currProd, image: [...currProd.image, res[0]] })
      } else {
        setCurrProd({ ...currProd, image: [res[0]] })
      }
      // Do something with the files
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
        <Plus size={40} />
      </div>
    )
  }

  const getSize = async () => {
    const data = await fetch('get', '/v1/size')
    const catData = await fetch('get', '/v1/category')
    if (data.length > 0) {
      setSize(data)
    }
    if (catData.length > 0) {
      setCat(catData.filter((d) => d.parent))
    }
    setCurrProd({
      ...currProd,
      size: [data[0]?.name],
      category: catData.filter((d) => d.parent)[0]?.id
    })
  }
  const catOptions = useMemo(() => {
    if (cat.length > 0) {
      return cat.map((c) => <option value={c.id}>{c.name.en}</option>)
    }
    return []
  }, [cat])

  const sizeOptions = useMemo(() => {
    if (size.length > 0) {
      return size.map((c) => <option value={c.name}>{c.name}</option>)
    }
    return []
  }, [size])

  useEffect(() => {
    getSize()
  }, [])

  const onInputChange = (e, isSplit) => {
    if (isSplit) {
      const name = e.target.name
      const splitted = name.split('-')
      setCurrProd({
        ...currProd,
        [splitted[0]]: {
          ...currProd[splitted[0]],
          [splitted[1]]: e.target.value
        }
      })
    } else {
      setCurrProd({
        ...currProd,
        [e.target.name]: e.target.value
      })
    }
  }

  const toggleDelete = () => {
    setDelete(!deleteShown)
  }

  const onImageChange = (idx) => {
    setCurrProd({
      ...currProd,
      image: currProd.image.filter((c, cidx) => cidx != idx)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const updateProd = async () => {
      const res = await fetch('post', `/v1/product`, currProd)
      toast.success('Cập nhật thành công')
    }
    updateProd()
  }

  const onSizeChange = (e) => {
    setCurrProd({ ...currProd, size: [e.target.value] })
  }
  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>Tạo sản phẩm mới</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="name-vn">Tên tiếng Việt</Label>
                  <Input
                    value={currProd.name?.vn}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="text"
                    name="name-vn"
                    id="name-vn"
                    placeholder="Tên tiếng việt"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="name-pl">Tên tiếng Ba Lan</Label>
                  <Input
                    value={currProd.name?.pl}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="text"
                    name="name-pl"
                    id="name-pl"
                    placeholder="Tên tiếng Ba Lan"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="name-en">Tên tiếng Anh</Label>
                  <Input
                    value={currProd.name?.en}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="text"
                    name="name-en"
                    id="name-en"
                    placeholder="Tên tiếng Anh"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="description-vn">Miêu tả tiếng Việt</Label>
                  <Input
                    value={currProd.description?.vn}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="textarea"
                    name="description-vn"
                    id="description-vn"
                    rows="3"
                    // onChange={(e) => setDesc(e.target.value)}
                    placeholder="Miêu tả tiếng Việt"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="description-pl">Miêu tả tiếng Ba Lan</Label>
                  <Input
                    value={currProd.description?.pl}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="textarea"
                    name="description-pl"
                    id="description-pl"
                    rows="3"
                    // value={'desc'}
                    placeholder="Miêu tả tiếng Ba Lan"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="description-en">Miêu tả tiếng Anh</Label>
                  <Input
                    value={currProd.description?.en}
                    onChange={(e) => {
                      onInputChange(e, true)
                    }}
                    type="textarea"
                    name="description-en"
                    id="description-en"
                    rows="3"
                    // value={'desc'}
                    // onChange={(e) => setDesc(e.target.value)}
                    placeholder="Miêu tả tiếng Anh"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="price">Giá</Label>
                  <Input
                    value={currProd.price}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    name="price"
                    type="text"
                    id="price"
                    placeholder="Giá"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="quantity">Số lượng</Label>
                  <Input
                    value={currProd.quantity}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    name="quantity"
                    type="text"
                    id="quantity"
                    placeholder="Số lượng"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="code">Code</Label>
                  <Input
                    value={currProd.code}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Code"
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="available">Còn hàng</Label>
                  <Input
                    // value={currProd[]}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    type="select"
                    name="available"
                    id="available"
                    value={currProd.available}
                  >
                    <option value={true}>Còn</option>
                    <option value={false}>Hết</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="category">Loại mặt hàng</Label>
                  <Input
                    value={currProd.category}
                    onChange={(e) => {
                      onInputChange(e)
                    }}
                    type="select"
                    name="category"
                    id="category"
                  >
                    {catOptions.map((c) => c)}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4" sm="12">
                <FormGroup>
                  <Label for="size">Size</Label>
                  <Input
                    value={currProd.size && currProd.size[0]}
                    onChange={(e) => {
                      onSizeChange(e)
                    }}
                    type="select"
                    name="size"
                    id="size"
                  >
                    {sizeOptions.map((c) => c)}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="8" sm="12">
                <FormGroup>
                  <Label>Ảnh</Label>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {currProd.image?.length > 0 && (
                      <div style={{ display: 'flex' }}>
                        {currProd.image.map((i, idx) => (
                          <div className={styles['image-container']}>
                            <img
                              style={{ width: '100px', height: '100px' }}
                              key={i}
                              src={i}
                            />
                            <div className={styles['icons-container']}>
                              <MinusCircle
                                onClick={() => onImageChange(idx)}
                                style={{ cursor: 'pointer' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {(!currProd.image || currProd.image?.length < 4) && (
                      <MyDropzone />
                    )}
                  </div>
                </FormGroup>
              </Col>

              <Col className=" d-flex flex-sm-row flex-column mt-2" sm="12">
                <Button.Ripple
                  className="mb-1 mb-sm-0 mr-1"
                  type="submit"
                  color="primary"
                >
                  Save Changes
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </div>
  )
}
export default ProductManagement
