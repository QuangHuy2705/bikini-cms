import React from 'react'
import {
  Modal,
  ModalBody,
  FormGroup,
  Input,
  Label,
  Media,
  Form,
  ModalHeader,
  Button
} from 'reactstrap'
import { fetch } from '../../../../service/index'

export default function EditModal(props) {
  const { isShown, getCat, resetData, toggleEdit, data } = props
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    if (name && price) {
      const res = await fetch('put', `/v1/shipping/${data.id}`, {
        name,
        price
      })
      resetData()
      getCat()
      toggleEdit()
      setName('')
      setPrice('')
    }
  }

  React.useEffect(() => {
    if (data.name) {
      setName(data.name)
      setPrice(data.price)
    }
  }, [data])

  React.useEffect(() => {
    return () => {
      setName('')
      setPrice('')
      resetData()
    }
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        resetData()
        toggleEdit()
        setName('')
        setPrice('')
      }}
    >
      <ModalHeader>
        Chỉnh sửa <span style={{ fontWeight: 'bold' }}></span>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <Input
            className="w-100 mb-1"
            value={name}
            placeholder="Tên"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="w-100 mb-1"
            value={price}
            placeholder="Giá"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button.Ripple
            className="w-100 mb-1"
            type="submit"
            outline
            color={'success'}
          >
            Xong
          </Button.Ripple>
        </Form>
      </ModalBody>
    </Modal>
  )
}
