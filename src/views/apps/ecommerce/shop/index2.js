// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Store & Actions
import { fetch } from '../../../../service/index'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Row, Col, CardText, Card } from 'reactstrap'
import { PlusCircle as Plus, MinusCircle, Edit2 } from 'react-feather'
import CreateModal from './CreateCatModel'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

const CategoryManagement = () => {
  const [catData, setData] = useState({})
  const [createShown, setCreate] = useState(false)
  const [deleteShown, setDelete] = useState(false)
  const [editShown, setEdit] = useState(false)
  const [currCat, setCurrCat] = useState({})

  const [currParent, setParent] = useState('')
  const toggleCreate = () => setCreate(!createShown)
  const toggleDelete = () => setDelete(!deleteShown)
  const toggleEdit = () => setEdit(!editShown)
  const getCat = async () => {
    const res = await fetch('get', '/v1/category')
    if (res.length > 0) {
      const processed = res.reduce((acc, curr) => {
        if (!curr.parent) {
          if (!acc[curr.id]) {
            acc[curr.id] = curr
          }
        } else {
          if (!acc[curr.parent.id]) {
            console.log(curr.parent)
            acc[curr.parent.id] = {
              ...curr.parent,
              children: [curr]
            }
          } else {
            if (!acc[curr.parent.id].children) {
              acc[curr.parent.id].children = [curr]
            } else {
              acc[curr.parent.id].children.push(curr)
            }
          }
        }
        return acc
      }, {})
      setData(processed)
    }
  }
  useEffect(() => {
    getCat()
  }, [])

  const onSetCurrParent = (id) => {
    setParent(id)
  }

  const onOpenCreate = (parent) => {
    onSetCurrParent(parent)
    setCreate(true)
  }

  const resetCurr = () => {
    setCurrCat({})
  }

  const onDeleteOpen = (data) => {
    setCurrCat(data)
    setDelete(true)
  }

  const onEditOpen = (data) => {
    setCurrCat(data)
    setEdit(true)
  }

  return (
    <div>
      <CreateModal
        getCat={getCat}
        toggleCreate={toggleCreate}
        isShown={createShown}
        currParent={currParent}
        onSetCurrParent={onSetCurrParent}
      />
      <DeleteModal
        isShown={deleteShown}
        getCat={getCat}
        toggleDelete={toggleDelete}
        data={currCat}
        resetData={resetCurr}
      />
      <EditModal
        isShown={editShown}
        getCat={getCat}
        toggleEdit={toggleEdit}
        data={currCat}
        resetData={resetCurr}
      />
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>
          Quản lý loại sản phẩm
        </h1>
        <Plus
          onClick={() => onOpenCreate(null)}
          style={{ cursor: 'pointer' }}
          color="#28C76F"
        />
      </div>

      {Object.keys(catData).length > 0 &&
        Object.keys(catData).map((c) => (
          <div key={catData[c].id}>
            <div
              style={{
                maxWidth: '140px',
                padding: '8px 10px',
                textAlign: 'center',
                background: '#fff',
                borderRadius: '0.428rem',
                boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
                marginBottom: 10,
                position: 'relative'
              }}
            >
              <p style={{ margin: 0 }}>{catData[c].name['vn']}</p>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '-80px'
                }}
              >
                <Plus
                  onClick={() => onOpenCreate(catData[c].id)}
                  style={{ cursor: 'pointer' }}
                  color="#28C76F"
                  size={20}
                />
                <MinusCircle
                  onClick={() => onDeleteOpen(catData[c])}
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  color="#EA5455"
                  size={20}
                />
                <Edit2
                  onClick={() => onEditOpen(catData[c])}
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  color="#fcdf03"
                  size={20}
                />
              </div>
            </div>
            {catData[c].children?.length > 0 &&
              catData[c].children.map((ch) => (
                <div
                  key={ch.id}
                  style={{
                    maxWidth: '100px',
                    padding: '8px 10px',
                    textAlign: 'center',
                    background: '#fff',
                    borderRadius: '0.428rem',
                    boxShadow: '0 4px 24px 0 rgb(34 41 47 / 10%)',
                    marginLeft: 40,
                    marginBottom: 10,
                    position: 'relative'
                  }}
                >
                  <p style={{ margin: 0 }}>{ch.name['en']}</p>
                  <MinusCircle
                    onClick={() => onDeleteOpen(ch)}
                    style={{
                      cursor: 'pointer',
                      marginLeft: '5px',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: '-30px'
                    }}
                    color="#EA5455"
                    size={20}
                  />
                  <Edit2
                    onClick={() => onEditOpen(ch)}
                    style={{
                      cursor: 'pointer',
                      marginLeft: '5px',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      right: '-60px'
                    }}
                    color="#fcdf03"
                    size={20}
                  />
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
export default CategoryManagement
