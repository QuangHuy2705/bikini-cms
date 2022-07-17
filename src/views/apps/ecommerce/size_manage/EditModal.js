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
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('put', `/v1/size/${data.id}`, {
      name
    })
    resetData()
    getCat()
    toggleEdit()
    setName('')
  }

  React.useEffect(() => {
    if (data.name) {
      setName(data.name)
    }
  }, [data])

  React.useEffect(() => {
    return () => {
      setName('')
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
