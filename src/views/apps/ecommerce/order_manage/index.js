// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react'
// ** Store & Actions
import { fetch } from '../../../../service/index'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Row, Col, CardText, Card } from 'reactstrap'
import { PlusCircle as Plus, MinusCircle, Edit2 } from 'react-feather'
import CreateModal from './CreateCatModel'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import BootstrapTable from 'react-bootstrap-table-next'

const CategoryManagement = () => {
  const [orderData, setData] = useState({})
  const getOrder = async () => {
    const res = await fetch('get', '/v1/order')
    if (res.length > 0) {
      setData(res)
    }
  }

  // const getShipping

  const detailFormater = (cell, row) => {
    console.log(cell, row)
    return (
      <div>
        {cell.length > 0 &&
          cell.map((o) => (
            <div key={o.id}>
              <p>Code: {o.product?.code}</p>
              <p>Size: {o.product?.size[0]?.toUpperCase()}</p>
              <p>Quantity: {o?.quantity}</p>
            </div>
          ))}
      </div>
    )
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      headerStyle: (colum, colIndex) => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'customer',
      text: 'Customer'
    },
    {
      dataField: 'phone',
      text: 'Phone'
    },
    {
      dataField: 'address',
      text: 'Address'
    },
    {
      dataField: 'products',
      text: 'Detail',
      formatter: detailFormater
    }
  ]

  const tableData = useMemo(() => {
    if (orderData.length > 0) {
      return orderData.map((o, i) => {
        return {
          id: i + 1,
          customer: o.userName,
          phone: o.phone,
          address: o.shippingAddress,
          products: o.products
        }
      })
    }

    return []
  }, [orderData])

  useEffect(() => {
    getOrder()
  }, [])

  return (
    <div>
      <div style={{ alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ paddingRight: '10px', margin: 0, marginBottom: '30px' }}>
          Quản lý order
        </h1>
        <div>
          <BootstrapTable keyField="id" data={tableData} columns={columns} />
        </div>
      </div>
    </div>
  )
}
export default CategoryManagement
