"use client";
import { OrdersApi } from "@/apis/orders";
import { LIST_ORDER_KEY } from "@/contains/react_query_keys";
import { Order, OrderStatus } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { Table, TableProps, Tag } from "antd";

const OrderListPage = ({ params }: { params: { restaurantId: number } }) => {
  const restaurantId = params.restaurantId;
  const { data: orders, isSuccess } = useQuery({
    queryKey: [LIST_ORDER_KEY],
    queryFn: () => OrdersApi.getOrdersByRestaurant(restaurantId),
  });
  const columns: TableProps<Order>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, order) => <a>{order.user?.fullname}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Delivery status",
      key: "orderStatus",
      dataIndex: "orderStatus",
      render: (_, { orderStatus }) => {
        let color = "green";
        if (orderStatus === OrderStatus.CANCELED) {
          color = "volcano";
        }
        if (orderStatus === OrderStatus.PENDING) {
          color = "geekblue";
        }

        return (
          <Tag color={color} key={orderStatus}>
            {orderStatus}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <></>,
    },
  ];
  return (
    <div className="h-screen">
      {isSuccess && (
        <div>
          <Table<Order> columns={columns} dataSource={orders} />
        </div>
      )}
    </div>
  );
};
export default OrderListPage;
