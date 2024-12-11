import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import PreData from "@/components/common/PreData";
import { useFetchProductById } from "@/lib/api";
import Breadcrumb from "@/components/common/Breadcrumb";
import { API_BASE_URL } from "@/config";
import { getPercent } from "@/lib/utils";
import Minus from "@/assets/icons/minus.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import ReadMore from "@/components/common/ReadMore";
import { useState } from "react";
import AddToCartButton from "@/components/product/AddToCartButton";

function ProductDetail() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();
  const prodSlug = pathname.split("/").pop();

  const prod = slugs.find((val) => val.slug === prodSlug && val.catId > 0);
  const prodId = prod?.id;

  const catId = slugs.find((val) => val.id == prodId && val.catId > 0)?.catId;
  const category = slugs.find((val) => val.id == catId && val.catId == 0);

  const { data, isLoading, error } = useFetchProductById(prodId);

  // const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  function onChangeCount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (value) setCount(value);
  }

  function onPlusCount() {
    setCount((value) => value + 1);
  }
  function onMinusCount() {
    if (count > 1) setCount((value) => value - 1);
  }

  if (isLoading || !data) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  return (
    <div>
      <Breadcrumb
        additionalBreadcrumb={[
          { name: category?.title, url: "/categories/" + category?.slug },
          {
            name: prod?.title,
            url: "/categories/" + category?.slug + "/" + prod?.slug,
          },
        ]}
      />
      <div className="flex lg:flex-row flex-col gap-16">
        <div className="lg:w-1/2">
          <img
            src={API_BASE_URL + data.image}
            alt={data.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col lg:w-1/2 gap-8">
          <h1 className="heading-2">{data.title}</h1>
          <div className="flex flex-row gap-8 items-end">
            <p className="2xl:text-[64px] text-[40px] font-bold leading-[1.1]">
              ${data.discont_price}
            </p>
            <p className="text-gray-500 2xl:text-[40px] text-[30px] font-medium leading-[1.3] line-through">
              ${data.price}
            </p>
            <div className="bg-blue-600 px-2 py-1 rounded-md self-start text-white text-[20px] font-semibold leading-[1.3] tracking-[0.6px]">
              -{getPercent(data.price, data.discont_price)}%
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex md:flex-row flex-col w-full gap-8 justify-center items-center">
              <div className="flex flex-row">
                <button
                  className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -mr-1 z-10"
                  onClick={onMinusCount}
                >
                  <Minus />
                </button>
                <input
                  className="appearance-none w-24 text-center border-t border-b border-l-0 border-r-0 border-gray-300 z-0 text-[20px] font-semibold leading-[1.3]"
                  value={count}
                  onChange={(e) => onChangeCount(e)}
                />
                <button
                  className="rounded-md p-4 w-14 h-14 border border-gray-300 flex items-center justify-center -ml-1 z-10"
                  onClick={onPlusCount}
                >
                  <Plus />
                </button>
              </div>
              <AddToCartButton
                data={data}
                count={count}
                callbackFunc={() => setCount(1)}
                width="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold leading-[130%]">
              Description
            </h3>

            <ReadMore text={data.description} maxLength={400} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
