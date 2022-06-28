// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Store & Actions
import { fetch } from '../../../../service/index'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Row, Col, CardText, Card } from 'reactstrap'
import { PlusCircle as Plus, MinusCircle } from 'react-feather'
import CreateModal from './CreateCatModel'

const CategoryManagement = () => {
  const [catData, setData] = useState({})
  const [createShown, setCreate] = useState(false)

  const toggleCreate = () => setCreate(!createShown)
  useEffect(() => {
    async function getCat() {
      const res = await fetch('get', '/v1/category')
      console.log(res)
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
    getCat()
  }, [])
  return (
    <div>
      <CreateModal toggleCreate={toggleCreate} isShown={createShown} />
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>
          Quản lý loại sản phẩm
        </h1>
        <Plus
          onClick={() => setCreate(true)}
          style={{ cursor: 'pointer' }}
          color="#28C76F"
        />
      </div>

      {Object.keys(catData).length > 0 &&
        Object.keys(catData).map((c) => (
          <div key={catData[c].nameEn}>
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
              <p style={{ margin: 0 }}>{catData[c].nameEn}</p>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '-55px'
                }}
              >
                <Plus style={{ cursor: 'pointer' }} color="#28C76F" size={20} />
                <MinusCircle
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  color="#EA5455"
                  size={20}
                />
              </div>
            </div>
            {catData[c].children?.length > 0 &&
              catData[c].children.map((ch) => (
                <div
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
                  <p style={{ margin: 0 }}>{ch.nameEn}</p>
                  <MinusCircle
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
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
export default CategoryManagement
