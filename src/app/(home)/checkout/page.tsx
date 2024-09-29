"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import DishCardDetail from "@/components/Checkout/DishCardDetail";
import Label from "@/components/Label/Label";
import NcImage from "@/components/NcImage/NcImage";
import Textarea from "@/components/Textarea/Textarea";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Input, Select } from "antd";

const data = [
  { name: "Product amount", content: "240.000đ" },
  { name: "Delivery amount", content: " -22.000đ" },
  { name: "Discount 10k for order more 145k", content: "-25.000đ" },
  { name: "Total money", content: "400.000đ" },
];
const people = [
  {
    id: 1,
    amount: 1,
    price: 150000,
    title: "Tokyo Fashion Week Is Making Itself Great Again",
    image:
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 2,
    amount: 1,
    price: 150000,
    title: "Traveling Tends to Magnify All Human Emotions",
    image:
      "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 3,
    amount: 1,
    price: 150000,
    title: "Interior Design: Hexagon is the New Circle in 2018",
    image:
      "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 4,
    amount: 1,
    price: 150000,
    title: "Heritage Museums & Gardens to Open with New Landscape",
    image:
      "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 5,
    amount: 1,
    price: 150000,
    title:
      "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
    image:
      "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: false,
    payment: "Not Applicable",
  },
  {
    id: 6,
    amount: 1,
    price: 150000,
    title:
      "Denton Corker Marshall the mysterious black box is biennale pavilion",
    image:
      "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
];
const CheckoutPage: React.FC = () => {
  const getAddressInformationForm = () => {
    return (
      <div className="bg-white rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
        <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
          <div className="">Address</div>
          <label className="block md:col-span-2">
            <Label>Address *</Label>
            <Input type="text" className="mt-1" />
          </label>
          <label className="block md:col-span-2">
            <Label>Note</Label>
            <Input type="text" className="mt-1" />
          </label>
        </form>
      </div>
    );
  };
  const getPaymentTypeCard = () => {
    return (
      <div className="bg-white rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
        <form className="grid gap-6" action="#" method="post">
          <div className="font-semibold w-full">Payment method & Discount</div>
          <label className="block md:col-span-2">
            <Label>Payment method *</Label>
            <Select className="mt-1 w-full">
              <option value="cash">Cash</option>
              <option value="zaloPay">Zalo pay</option>
            </Select>
          </label>
          <label className="block md:col-span-2">
            <Label>Discount Code</Label>
            <Input type="text" className="mt-1" />
          </label>
        </form>
      </div>
    );
  };
  const getPaymentCard = () => {
    return (
      <div className="bg-white rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mt-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
            Payment information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
            {`Order now for more discount`}
          </p>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-900">
          <dl>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-neutral-50 dark:bg-neutral-800"
                      : "bg-white dark:bg-neutral-900"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300 sm:col-span-2">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 ">
                    {item.content}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>{" "}
      </div>
    );
  };
  const orderDetailCard = () => (
    <div className="bg-white dark:bg-neutral-900 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mt-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-3 lg:px-8">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
              {people.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                      <NcImage
                        containerClassName="flex-shrink-0 h-12 w-12 rounded-lg relative z-0 overflow-hidden lg:h-14 lg:w-14"
                        src={item.image}
                        fill
                        sizes="80px"
                        alt="post"
                      />
                      <div className="ms-4 flex-grow">
                        <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                          {item.amount}X
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-sm overflow-clip">
                    <h2 className="inline-flex line-clamp-2 text-base font-semibold  dark:text-neutral-300 mb-3">
                      {item.title}
                    </h2>
                    <DishCardDetail
                      renderTrigger={({ onClick }) => (
                        <h4
                          onClick={() => onClick()}
                          className="text-sm text-blue-600 font-semibold cursor-pointer"
                        >
                          Edit food
                        </h4>
                      )}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex flex-col items-end gap-3">
                      <TrashIcon className="w-5 h-5 " />
                      <span> {item.price}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex px-10">
      <div className="w-3/5 p-4">
        {getAddressInformationForm()}
        {orderDetailCard()}
      </div>
      <div className="w-2/5 p-4">
        {getPaymentTypeCard()}
        {getPaymentCard()}
      </div>
    </div>
  );
};

export default CheckoutPage;
