import SectionDevider from "@/components/common/SectionDivider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";
import IcoX from "@/assets/icons/x.svg?react";
import Minus from "@/assets/icons/minus.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { useDispatch } from "react-redux";
import { addProduct, delProduct, resetCart } from "@/redux/cartSlice";
import { closeKupon } from "@/redux/userSlice";
import { Product } from "@/lib/api";
import OrderSendForm from "@/components/common/OrderSendForm";
import { useState } from "react";
import Modal from "@/components/common/Modal";

function Cart() {
  const curCart = useSelector((state: RootState) => state.cart.cartPositions);

  const { kupon } = useSelector((state: RootState) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(resetCart());
    dispatch(closeKupon());
  };

  function sendOrder() {
    //dispatch(resetCart());
    openModal();
  }

  const navigate = useNavigate();

  const goShop = () => {
    navigate("/products");
  };

  const dispatch = useDispatch();

  function onMinusCount(data: Product) {
    dispatch(addProduct({ product: data, count: -1 }));
  }
  function onPlusCount(data: Product) {
    dispatch(addProduct({ product: data, count: 1 }));
  }

  function onDelPosition(id: number) {
    dispatch(delProduct(id));
  }

  return (
    <div>
      <SectionDevider
        titleName="Shopping cart"
        buttonName="Back to the store"
        url="/products"
      />

      {!curCart.length && (
        <div className="pt-10 flex flex-col gap-8">
          <p className="text-black text-[20px] font-medium leading-[1.3]">
            Looks like you have no items in your basket currently.
          </p>
          <button
            className="w-[314px] text-white text-center text-[20px] font-semibold leading-[1.3] bg-blue-600 px-12 py-4"
            onClick={goShop}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {!!curCart.length && (
        <div className="flex flex-col xl:flex-row xl:justify-between w-full gap-4">
          {/* <div className="w-full xl:w-[780px] flex flex-col gap-4"> */}
          <div className="w-full flex flex-col gap-4">
            {curCart.map((val) => {
              return (
                <div className="border border-gray-200 flex md:flex-row flex-col-reverse rounded-md items-center">
                  <img
                    className="w-52"
                    src={API_BASE_URL + val.product.image}
                    alt=""
                  />
                  <div className="p-8 w-full">
                    <div className="flex flex-row justify-between">
                      <p className="text-[20px] font-medium leading-[1.3]">
                        {val.product.title}
                      </p>
                      <button onClick={() => onDelPosition(val.product.id)}>
                        <IcoX />
                      </button>
                    </div>

                    <div className="flex xxl:flex-row flex-col items-end xl:gap-8 gap-4">
                      <div className="flex flex-row mt-8">
                        <button
                          className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -mr-1 z-10"
                          onClick={() => onMinusCount(val.product)}
                        >
                          <Minus />
                        </button>
                        <input
                          className="appearance-none w-24 text-center border-t border-b border-l-0 border-r-0 border-gray-300 z-0 text-[20px] font-semibold leading-[1.3]"
                          value={val.count}
                          disabled
                        />
                        <button
                          className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -ml-1 z-10"
                          onClick={() => onPlusCount(val.product)}
                        >
                          <Plus />
                        </button>
                      </div>
                      <div className="flex xl:flex-row flex-col items-end gap-2">
                        <div className="heading-3">
                          $
                          {val.product.discont_price
                            ? val.product.discont_price
                            : val.product.price}
                        </div>
                        <div className="text-gray-500 2xl:text-[20px] text-[15px] font-medium leading-[1.3] line-through">
                          {val.product.discont_price
                            ? "$" + val.product.price
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="w-full xl:w-[548px] bg-gray-100 p-8 rounded-md"> */}
          <div className=" bg-gray-100 p-8 rounded-md  xl:w-[60%]">
            <p className="heading-3 mb-6">Order details</p>
            <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
              {curCart.reduce((akk, cur) => akk + cur.count, 0)} items
            </p>
            {kupon && (
              <p className="text-red-700">-5% off on the first order</p>
            )}
            <div className="flex flex-row justify-between items-end mb-4">
              <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
                Total
              </p>
              <p className="text-black text-[64px] font-bold leading-[1.1]">
                $
                {(
                  curCart.reduce((akk, cur) => {
                    // let cur_price = cur.product.discont_price;
                    // if (!cur_price) cur_price = cur.product.price;
                    const cur_price =
                      cur.product.discont_price ?? cur.product.price; // Убедимся, что это число

                    akk = akk + cur.count * cur_price;
                    return akk;
                  }, 0) * (kupon ? 0.95 : 1)
                ).toFixed(2)}
              </p>
            </div>
            <OrderSendForm callback={sendOrder} />

            <div>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Congratulations!"
              >
                <div className="text-white">
                  <p>Your order has been successfully placed on the website.</p>
                  <p>
                    A manager will contact you shortly to confirm your order.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
