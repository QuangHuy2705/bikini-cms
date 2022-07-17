import React from 'react'
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap'
import { fetch } from '../../../../service/index'
import { useHistory } from 'react-router-dom'

export default function DeleteModal(props) {
  const { isShown, resetData, toggleDelete, getData, data = {} } = props
  const history = useHistory()
  const onSubmit = async (e) => {
    const res = await fetch('delete', `/v1/product/${data.id}`)
    toggleDelete()
    history.push(`/apps/ecommerce/product`)
  }
  React.useEffect(() => {
    return () => {}
  }, [])

  return (
    <Modal
      centered
      isOpen={isShown}
      toggle={() => {
        toggleDelete()
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
