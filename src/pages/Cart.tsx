import SectionDevider from "@/components/SectionDevider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";
import IcoX from "../assets/icons/x.svg?react";
import Minus from "@/assets/icons/minus.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { useDispatch } from "react-redux";
import { addProduct, delProduct } from "@/redux/cartSlice";
import { Product } from "@/lib/api";

function Cart() {
  const curCart = useSelector((state: RootState) => state.cart.cartPositions);

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
        <div className="flex flex-col lg:flex-row lg:justify-between w-full gap-4">
          <div className="w-full lg:w-[780px] flex flex-col gap-4">
            {curCart.map((val) => {
              return (
                <div className="border border-gray-200 flex flex-row rounded-md">
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

                    <div className="flex flex-row items-end gap-8">
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

                      <div className="heading-3">
                        $
                        {val.product.discont_price
                          ? val.product.discont_price
                          : val.product.price}
                      </div>
                      <div className="text-gray-500 2xl:text-[40px] text-[30px] font-medium leading-[1.3] line-through">
                        {val.product.discont_price
                          ? "$" + val.product.price
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full lg:w-[548px] bg-gray-100 p-8 rounded-md">
            <p className="heading-3 mb-6">Order details</p>
            <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
              {curCart.reduce((akk, cur) => akk + cur.count, 0)} items
            </p>
            <div className="flex flex-row justify-between items-end">
              <p className="text-gray-400 text-[40px] font-medium leading-[1.3]">
                Total
              </p>
              <p className="text-black text-[64px] font-bold leading-[1.1]">
                ${curCart.reduce((akk,cur)=>{
                  let cur_price = cur.product.discont_price;
                  if (!cur_price)
                    cur_price=cur.product.price;
                  akk = akk+cur.count*cur_price;
                  return akk;
                },0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
