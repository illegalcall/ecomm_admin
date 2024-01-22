import { format } from "date-fns"

import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client"


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          productVariant: {
            include: {
              product: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    // phone: item.phone,
    // address: item.address,
    productVariant: item.orderItems.map((orderItem) => orderItem.productVariant.product.name + ' ' + orderItem.productVariant.weight + ' lbs').join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.productVariant.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  )
}

export default OrdersPage
