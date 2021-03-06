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
  const [loading, setLoading] = useState(true)
  const [currProd, setCurrProd] = useState({})
  const { productId } = useParams()
  const [cat, setCat] = useState([])
  const [size, setSize] = useState([])

  const getCat = async () => {
    if (productId) {
      const res = await fetch('get', `/v1/product/${productId}`)
      if (res) {
        setCurrProd({ ...res, category: res.category.id })
      } else {
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    getCat()
  }, [productId])

  const getSize = async () => {
    const data = await fetch('get', '/v1/size')
    if (data.length > 0) {
      setSize(data)
    }
  }

  const sizeOptions = useMemo(() => {
    if (size.length > 0) {
      return size.map((c) => <option value={c.name}>{c.name}</option>)
    }
    return []
  }, [size])

  const onSizeChange = (e) => {
    setCurrProd({ ...currProd, size: [e.target.value] })
  }
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
        {/* {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )} */}
        <Plus size={40} />
      </div>
    )
  }

  const getCategory = async () => {
    const data = await fetch('get', '/v1/category')
    if (data.length > 0) {
      setCat(data.filter((d) => d.parent))
    }
  }

  const catOptions = useMemo(() => {
    if (cat.length > 0) {
      return cat.map((c) => <option value={c.id}>{c.name.en}</option>)
    }
    return []
  }, [cat])

  useEffect(() => {
    getSize()
    getCategory()
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
      const res = await fetch('put', `/v1/product/${currProd.id}`, currProd)
      console.log(res)
      toast.success('C???p nh???t th??nh c??ng')
    }
    updateProd()
  }

  return (
    <div>
      <DeleteModal
        isShown={deleteShown}
        getData={getCat}
        toggleDelete={toggleDelete}
        data={currProd}
      />
      {/* <CreateModal
        getCat={getCat}
        toggleCreate={toggleCreate}
        isShown={createShown}
        currParent={currParent}
        onSetCurrParent={onSetCurrParent}
      />

      <EditModal
        isShown={editShown}
        getCat={getCat}
        toggleEdit={toggleEdit}
        data={currProd}
        resetData={resetCurr}
      /> */}
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>
          Qu???n l?? s???n ph???m{' '}
          <span style={{ fontWeight: 'bold' }}>{currProd.code || ''}</span>
        </h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(currProd).length == 0 ? (
            <p>Kh??ng t??m th???y s???n ph???m</p>
          ) : (
            <Form onSubmit={onSubmit}>
              <Row>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="name-vn">T??n ti???ng Vi???t</Label>
                    <Input
                      value={currProd.name?.vn}
                      onChange={(e) => {
                        onInputChange(e, true)
                      }}
                      type="text"
                      name="name-vn"
                      id="name-vn"
                      placeholder="T??n ti???ng vi???t"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="name-pl">T??n ti???ng Ba Lan</Label>
                    <Input
                      value={currProd.name?.pl}
                      onChange={(e) => {
                        onInputChange(e, true)
                      }}
                      type="text"
                      name="name-pl"
                      id="name-pl"
                      placeholder="T??n ti???ng Ba Lan"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="name-en">T??n ti???ng Anh</Label>
                    <Input
                      value={currProd.name?.en}
                      onChange={(e) => {
                        onInputChange(e, true)
                      }}
                      type="text"
                      name="name-en"
                      id="name-en"
                      placeholder="T??n ti???ng Anh"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="description-vn">Mi??u t??? ti???ng Vi???t</Label>
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
                      placeholder="Mi??u t??? ti???ng Vi???t"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="description-pl">Mi??u t??? ti???ng Ba Lan</Label>
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
                      placeholder="Mi??u t??? ti???ng Ba Lan"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="description-en">Mi??u t??? ti???ng Anh</Label>
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
                      placeholder="Mi??u t??? ti???ng Anh"
                    />
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="price">Gi??</Label>
                    <Input
                      value={currProd.price}
                      onChange={(e) => {
                        onInputChange(e)
                      }}
                      name="price"
                      type="text"
                      id="price"
                      placeholder="Gi??"
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
                    <Label for="available">C??n h??ng</Label>
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
                      <option value={true}>C??n</option>
                      <option value={false}>H???t</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col md="4" sm="12">
                  <FormGroup>
                    <Label for="category">Lo???i m???t h??ng</Label>
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
                      value={currProd.size ? currProd.size[0] : size[0]?.name}
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
                    <Label>???nh</Label>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {currProd.image.length > 0 && (
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
                      {currProd.image?.length < 4 && <MyDropzone />}
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
                  <Button.Ripple className="mb-1 mb-sm-0 mr-0" color="danger">
                    X??a
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          )}
        </>
      )}
    </div>
  )
}
export default ProductManagement
