// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react'
// ** Store & Actions
import { fetch } from '../../../../service/index'
import { toast } from 'react-toastify'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Row, Col, CardText, Card, Input } from 'reactstrap'
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

  const updateOrder = async (id, status) => {
    console.log(id)
    if (id) {
      const res = await fetch('put', `/v1/order/${id}`, { status })
      if (res) {
        getOrder()
        toast.success('Cập nhật thành công')
      }
    }
  }

  const detailFormater = (cell, row) => {
    const total =
      cell.reduce((acc, curr) => {
        acc += parseFloat(curr.product?.price) * curr.quantity
        return acc
      }, 0) + (parseFloat(row.shippingCompany?.price) || 0)
    return (
      <div>
        {cell.length > 0 && (
          <div>
            {cell.map((o) => (
              <div key={o.id}>
                {`- Code: ${
                  o.product?.code
                }.		Size: ${o.product?.size[0]?.toUpperCase()}.		Quantity: ${
                  o?.quantity
                }`}
              </div>
            ))}
            <div>
              Total{' '}
              <span style={{ fontWeight: 'bold' }}>{`: ${total || 0}`}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  const statusFormatter = (cell, row) => {
    console.log(row)
    return (
      <Input
        value={cell}
        onChange={(e) => {
          // onSizeChange(e)
          updateOrder(row.orderId, e.target.value)
        }}
        type="select"
        name="status"
        id="status"
      >
        <option value={1}>Hoàn thành</option>
        <option value={0}>Chưa hoàn thành</option>
      </Input>
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
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: statusFormatter
    }
  ]

  const tableData = useMemo(() => {
    if (orderData.length > 0) {
      return orderData.map((o, i) => {
        return {
          id: i + 1,
          orderId: o.id,
          customer: o.userName,
          phone: o.phone,
          address: o.shippingAddress,
          products: o.products,
          shippingCompany: o.shippingCompany,
          status: o.status
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
