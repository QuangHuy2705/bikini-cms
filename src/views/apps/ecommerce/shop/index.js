// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react'
// ** Store & Actions
import { fetch } from '../../../../service/index'
import ReactPaginate from 'react-paginate'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { Row, Col, CardText, Card } from 'reactstrap'
import { PlusCircle as Plus, MinusCircle, Edit2, XCircle } from 'react-feather'
import CreateModal from './CreateCatModel'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import Spinner from '@src/@core/components/spinner/Fallback-spinner'
import styles from './production.module.scss'

const ProductManagement = () => {
  const [prodData, setData] = useState([])
  const [createShown, setCreate] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(18)
  const [currParent, setParent] = useState('')
  const toggleCreate = () => setCreate(!createShown)
  const toggleDelete = () => setDelete(!deleteShown)
  const toggleEdit = () => setEdit(!editShown)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const getCat = async () => {
    const res = await fetch('get', '/v1/product')
    if (res && res.length > 0) {
      setData(res)
    }
    setLoading(false)
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

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1)
  }
  const count = useMemo(() => {
    return Number((prodData.length / rowsPerPage).toFixed(0))
  }, [prodData])

  const paginatedProd = useMemo(() => {
    console.log(currentPage)
    return prodData.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    )
  }, [currentPage, prodData])

  return (
    <div>
      {/* <CreateModal
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
      /> */}
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}
      >
        <h1 style={{ paddingRight: '10px', margin: 0 }}>Quản lý sản phẩm</h1>
        <Plus
          onClick={() => onOpenCreate(null)}
          style={{ cursor: 'pointer' }}
          color="#28C76F"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {paginatedProd.length > 0 && (
            <Row
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '50px',
                padding: '0 20px'
              }}
            >
              {paginatedProd.map((p) => {
                return (
                  <div
                    className={styles['product-container']}
                    style={{
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                    key={p.id}
                  >
                    <div className={styles['icons-container']}>
                      <Edit2 style={{ cursor: 'pointer' }} color="#fff" />
                      <XCircle style={{ cursor: 'pointer' }} color="#fff" />
                    </div>
                    <img style={{ width: '100%' }} src={p.image[0]} />
                    <p style={{ marginTop: '10px' }}>{p.name?.en}</p>
                  </div>
                )
              })}
            </Row>
          )}

          <div>
            {prodData.length > 0 && (
              <ReactPaginate
                pageCount={count || 1}
                nextLabel=""
                breakLabel="..."
                previousLabel=""
                activeClassName="active"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={
                  'pagination react-paginate justify-content-end p-1'
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default ProductManagement
