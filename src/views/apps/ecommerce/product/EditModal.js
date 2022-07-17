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
  const [nameEn, setEn] = React.useState('')
  const [namePl, setPl] = React.useState('')
  const [nameVn, setVn] = React.useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('put', `/v1/category/${data.id}`, {
      name: {
        en: nameEn,
        vn: nameVn,
        pl: namePl
      }
    })
    resetData()
    getCat()
    toggleEdit()
    setEn('')
    setPl('')
    setVn('')
  }

  React.useEffect(() => {
    console.log(data)
    if (data.name?.en) {
      setEn(data.name?.en)
    }
    if (data.name?.vn) {
      setVn(data.name?.vn)
    }
    if (data.name?.pl) {
      setPl(data.name?.pl)
    }
  }, [data])

  React.useEffect(() => {
    return () => {
      setEn('')
      setPl('')
      setVn('')
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
        setEn('')
        setPl('')
        setVn('')
      }}
    >
      <ModalHeader>
        Chỉnh sửa <span style={{ fontWeight: 'bold' }}></span>
      </ModalHeader>
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
