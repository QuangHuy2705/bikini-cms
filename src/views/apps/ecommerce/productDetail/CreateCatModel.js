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
  const { isShown, currParent, onSetCurrParent, toggleCreate, getCat } = props
  const [nameEn, setEn] = React.useState('')
  const [namePl, setPl] = React.useState('')
  const [nameVn, setVn] = React.useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (nameEn || namePl || nameVn) {
      const data = await fetch(
        'post',
        '/v1/category',
        currParent
          ? {
              name: {
                en: nameEn,
                vn: nameVn,
                pl: namePl
              },
              parent: currParent
            }
          : {
              name: {
                en: nameEn,
                vn: nameVn,
                pl: namePl
              }
            }
      )
    }
    getCat()
    toggleCreate()
    setEn('')
    setPl('')
    setVn('')
    onSetCurrParent('')
  }

  React.useEffect(() => {
    return () => {
      setEn('')
      setPl('')
      setVn('')
    }
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        toggleCreate()
        setEn('')
        setPl('')
        setVn('')
        onSetCurrParent('')
      }}
    >
      <ModalHeader>Tạo loại sản phẩm mới</ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <Input
            className="w-100 mb-1"
            value={nameVn}
            placeholder="Tên tiếng Việt"
            onChange={(e) => setVn(e.target.value)}
          />
          <Input
            className="w-100 mb-1"
            value={namePl}
            placeholder="Tên tiếng Ba Lan"
            onChange={(e) => setPl(e.target.value)}
          />
          <Input
            className="w-100 mb-1"
            value={nameEn}
            placeholder="Tên tiếng Anh"
            onChange={(e) => setEn(e.target.value)}
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
