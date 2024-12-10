import { Product } from "@/lib/api";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { API_BASE_URL } from "@/config";

function Products({ products }: { products: Product[] }) {
  function getProcent(fullPrice: number, curPrice: number) {
    return Math.round(100 - (curPrice * 100) / fullPrice);
  }

  function onButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // Останавливаем всплытие события
    e.preventDefault(); // Предотвращаем переход по ссылке
    console.log("Добавлено в корзину!");
  }

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((val) => {
        return (
          <Link key={val.id} to={"/products/" + nameToSlug(val.title)}>
            <div className="flex flex-col justify-center border rounded-md items-center gap-5">
              <div className="relative group w-full lg:h-72 md:h-56 h-56 overflow-hidden">
              {/* <div className="relative group"> */}
                <img
                  className="w-full object-cover h-full"
                  src={API_BASE_URL + val.image}
                  alt={val.title}
                />
                {val.discont_price && (
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-[20px] font-bold px-2 py-1 rounded-lg leading-[130%] tracking-[0.6px]">
                    -{getProcent(val.price, val.discont_price)}%
                  </span>
                )}

                <button
                  className="w-[90%] absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-[#282828]"
                  onClick={onButtonClick}
                >
                  Add to Cart
                </button>
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
