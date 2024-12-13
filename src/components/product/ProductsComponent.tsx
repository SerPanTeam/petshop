import { Product } from "@/lib/api";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { API_BASE_URL } from "@/config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { getPercent } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

function Products({ products }: { products: Product[] }) {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);

  if (!slugs.length) {
    return <div>Loading slugs...</div>;
  }

  function getCatSlugByProdID(prodId: number) {
    //console.log(slugs);
    const catID = slugs.filter((val) => val.id == prodId && val.catId > 0)[0]
      .catId;
    return slugs.filter((val) => val.id == catID && val.catId == 0)[0].slug;
  }

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((val) => {
        return (
          <Link
            key={val.id}
            to={`/categories/${getCatSlugByProdID(val.id)}/${nameToSlug(
              val.title
            )}`}
          >
            <div className="flex flex-col justify-center border rounded-md items-center gap-5">
              <div className="relative group w-full lg:h-72 md:h-56 h-56 overflow-hidden">
                <img
                  className="w-full object-cover h-full"
                  src={API_BASE_URL + val.image}
                  alt={val.title}
                />
                {val.discont_price && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[20px] font-bold px-2 py-1 rounded-lg leading-[130%] tracking-[0.6px]">
                    -{getPercent(val.price, val.discont_price)}%
                  </span>
                )}

                <AddToCartButton
                  data={val}
                  count={1}
                  width="w-[90%]"
                  customStyles="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                />
              </div>
              <div className="w-full px-4 pb-4">
                <h3 className="text-center text-[20px] font-medium leading-[130%] text-[#282828] mt-4 truncate">
                  {val.title}
                </h3>
                <div className="flex flex-row justify-start items-end gap-4">
                  <p className="heading-3">
                    ${val.discont_price ? val.discont_price : val.price}
                  </p>
                  <p className="text-small-grey line-through">
                    {val.discont_price ? `$${val.price}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
