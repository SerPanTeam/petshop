import { useSetProducts } from "@/lib/api";
import PreData from "@/components/common/PreData";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductsComponent from "@/components/product/ProductsComponent";
import { useState, useEffect } from "react";
import { Product } from "@/lib/api";
import { useSearchParams } from "react-router-dom";



type ProductsComponentProps = {
  isIncludeHead?: boolean;
  limit?: number;
  isSalesProducts?: boolean;
  isIncludeFilters?: boolean;
  dataStart?: Product[];
};

function Products({
  isIncludeHead = true,
  limit = 0,
  isSalesProducts = false,
  isIncludeFilters = true,
  dataStart,
}: ProductsComponentProps) {
  const { data: newData, isLoading, error, isFetched } = useSetProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  let data: Product[] = [];
  if (dataStart?.length) data = dataStart;
  else data = newData || [];




  const initialPriceFrom = searchParams.get("priceFrom");
  const initialPriceTo = searchParams.get("priceTo");
  const initialOnlyDiscounted = searchParams.get("onlyDiscounted") === "true";
  const initialSortOption = searchParams.get("sort") || "default";

  const [priceFrom, setPriceFrom] = useState<number | "">(
    initialPriceFrom ? parseFloat(initialPriceFrom) : ""
  );
  const [priceTo, setPriceTo] = useState<number | "">(
    initialPriceTo ? parseFloat(initialPriceTo) : ""
  );
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(initialOnlyDiscounted);
  const [sortOption, setSortOption] = useState<string>(initialSortOption);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (priceFrom !== "") params.priceFrom = String(priceFrom);
    if (priceTo !== "") params.priceTo = String(priceTo);
    if (onlyDiscounted) params.onlyDiscounted = String(onlyDiscounted);
    if (sortOption !== "default") params.sort = sortOption;

    setSearchParams(params);
  }, [priceFrom, priceTo, onlyDiscounted, sortOption, setSearchParams]);

  if (isLoading || !isFetched) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  let filteredProducts = data;

  // if (isSalesProducts) {
  //   setOnlyDiscounted(true);
  //   filteredProducts = filteredProducts.filter((val) => val.discont_price > 0);
  // }

  if (onlyDiscounted || isSalesProducts) {
    filteredProducts = filteredProducts.filter(
      (product) => product.discont_price > 0
    );
  }
  if (limit > 0) filteredProducts = filteredProducts.slice(0, limit);

  if (priceFrom !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discont_price || product.price;
      return price >= (priceFrom as number);
    });
  }

  if (priceTo !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discont_price || product.price;
      return price <= (priceTo as number);
    });
  }

  //filteredProducts = [...filteredProducts];

  switch (sortOption) {
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    case "price-asc":
      filteredProducts.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price)
      );
      break;
    case "price-desc":
      filteredProducts.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price)
      );
      break;
    case "discount-asc":
      filteredProducts.sort((a, b) => {
        const aDiscount = a.discont_price ? a.price - a.discont_price : 0;
        const bDiscount = b.discont_price ? b.price - b.discont_price : 0;
        return aDiscount - bDiscount;
      });
      break;
    case "discount-desc":
      filteredProducts.sort((a, b) => {
        const aDiscount = a.discont_price ? a.price - a.discont_price : 0;
        const bDiscount = b.discont_price ? b.price - b.discont_price : 0;
        return bDiscount - aDiscount;
      });
      break;
  }

  return (
    <>
      {isIncludeHead && (
        <>
          <Breadcrumb
            additionalBreadcrumb={[{ name: "All products", url: "/products" }]}
          />
          <h1 className="heading-2 mb-10">All products</h1>
        </>
      )}
      {isIncludeFilters && (
        <div className="flex md:flex-row flex-col mb-10 lg:gap-10 gap-2">
          <div className="flex flex-row lg:gap-4 gap-1 items-center">
            <p className="lg:text-[20px] font-semibold leading-[1.3]">Price</p>
            <input
              className="lg:w-28 w-16 border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="from"
              value={priceFrom}
              onChange={(e) =>
                setPriceFrom(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
            <input
              className="lg:w-28 w-14 border border-gray-300 rounded-md px-4 py-2"
              type="text"
              placeholder="to"
              value={priceTo}
              onChange={(e) =>
                setPriceTo(e.target.value ? parseFloat(e.target.value) : "")
              }
            />
          </div>
          {!isSalesProducts && (
            <div className="flex flex-row gap-4 items-center">
              <p className="lg:text-[20px] font-semibold leading-[1.3]">
                Discounted items
              </p>
              <input
                type="checkbox"
                name=""
                id=""
                className="w-8 h-8"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
              />
            </div>
          )}

          <div className="flex flex-row gap-4 items-center">
            <p className="lg:text-[20px] font-semibold leading-[1.3]">Sorted</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="lg:w-52 w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              {/* <option value="discount-asc">Discount: Low to High</option>
              <option value="discount-desc">Discount: High to Low</option> */}
            </select>
          </div>
        </div>
      )}
      <ProductsComponent products={filteredProducts} />
    </>
  );
}

export default Products;
