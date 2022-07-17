import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User
} from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: 'shop1',
    title: 'Quản lý loại sản phẩm',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/shop1'
  },
  {
    id: 'product-management',
    title: 'Quản lý sản phẩm',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/product'
  },
  {
    id: 'production-create',
    title: 'Tạo sản phẩm mới',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/create/product'
  },
  {
    id: 'size-manage',
    title: 'Quản lý size',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/size'
  },
  {
    id: 'shipping-manage',
    title: 'Quản lý shipping',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/shipping'
  },
  {
    id: 'order-manage',
    title: 'Quản lý order',
    icon: <Circle size={12} />,
    navLink: '/apps/ecommerce/order'
  }
]
