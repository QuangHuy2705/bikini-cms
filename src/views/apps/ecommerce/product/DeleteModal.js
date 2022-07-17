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

export default function DeleteModal(props) {
  const { isShown, resetData, toggleDelete, getData, data = {} } = props
  console.log(data)
  const onSubmit = async (e) => {
    const res = await fetch('delete', `/v1/product/${data.id}`)
    resetData()
    toggleDelete()
    getData()
  }
  React.useEffect(() => {
    return () => {
      resetData()
    }
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        toggleDelete()
        resetData()
      }}
    >
      <ModalHeader>
        Bạn có chắc muốn xóa{' '}
        <span style={{ fontWeight: 'bold' }}>{data.code}</span>?
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '10px'
          }}
        >
          <Button
            onClick={() => {
              resetData()
              toggleDelete()
            }}
          >
            Hủy
          </Button>
          <Button onClick={onSubmit} color="danger">
            Xóa
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
