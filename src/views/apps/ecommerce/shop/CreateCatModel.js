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

export default function CreateModal(props) {
  const { isShown, parent, toggleCreate } = props
  const [text, setText] = React.useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    if (text) {
      // const
    }
  }

  React.useEffect(() => {
    return () => {
      setText('')
    }
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        toggleCreate()
        setText('')
      }}
      // toggle={handleTaskSidebar}
      // className='sidebar-lg'
      // contentClassName='p-0'
      // onOpened={handleSidebarOpened}
      // onClosed={handleSidebarClosed}
    >
      <ModalHeader>Tạo loại sản phẩm mới</ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit} style={{ display: 'flex' }}>
          <Input
            value={text}
            placeholder="Tên"
            onChange={(e) => setText(e.target.value)}
          />
          <Button.Ripple
            type="submit"
            outline
            // onClick={() => setCompleted(!completed)}
            color={'success'}
          >
            Xong
          </Button.Ripple>
        </Form>
      </ModalBody>
    </Modal>
  )
}
