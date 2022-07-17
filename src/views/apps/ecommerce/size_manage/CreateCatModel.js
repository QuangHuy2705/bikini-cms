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
import { sendMsg } from '../../chat/store/actions'

export default function CreateModal(props) {
  const { isShown, currParent, onSetCurrParent, toggleCreate, getCat } = props
  const [name, setName] = React.useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (name) {
      const data = await fetch('post', '/v1/size', {
        name
      })
    }
    getCat()
    toggleCreate()
    setName('')
  }

  React.useEffect(() => {
    return () => {
      setName('')
    }
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        toggleCreate()
        setName('')
      }}
    >
      <ModalHeader>Tạo size mới</ModalHeader>
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
