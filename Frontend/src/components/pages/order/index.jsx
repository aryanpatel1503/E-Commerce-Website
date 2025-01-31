import React, { useEffect, useState } from "react";
import Layout from "../../app/Layout";
import axios from "axios";
import { API_URL } from "../../lib/constant";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Invoice from "./InvoiceDocument";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const getStatusColor = (status) => {
    if (status === "delivered") {
      return "green";
    } else if (status === "shipped") {
      return "cyan";
    }
    return "yellow";
  };

  const getOrders = async () => {
    const response = await axios.get(`${API_URL}/getOrders/${user_id}`);
    setOrders(response.data.result);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl mt-3">My Orders</h2>
      <div className="mt-5 mb-8">
        {orders.map((item, index) => {
          return (
            <Card
              className="w-full h-auto flex flex-row mb-4 shadow-allSide transition-shadow duration-300 hover:shadow-onHover"
              shadow={false}
              key={index}
            >
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/12 shrink-0 rounded-r-none flex items-center"
              >
                <img
                  src={item.product_img}
                  className="h-32 w-full object-contain cursor-pointer"
                  onClick={() => navigate(`/product/${item.product_id}`)}
                />
              </CardHeader>
              <CardBody className="flex flex-col w-full">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    color="blue-gray"
                    className="mb-2 text-2xl font-medium"
                  >
                    {item.product_name}
                  </Typography>
                  <Typography color="gray" className="text-md font-normal">
                    {item.order_id}
                  </Typography>
                </div>
                <Typography color="gray" className="text-md font-normal">
                  {item.product_desc}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="my-4 text-lg font-medium"
                >
                  ₹{item.product_price}
                </Typography>
                <Chip
                  variant="ghost"
                  color={getStatusColor(item.order_status)}
                  size="sm"
                  value={item.order_status}
                  className="self-start"
                />
                {item.order_status === "delivered" && (
                  <div className="mt-4">
                    <Invoice item={item} />
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default Order;
