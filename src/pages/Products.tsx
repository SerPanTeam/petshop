// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import { useSetProducts } from "@/lib/api";
import PreData from "@/components/PreData";
import Breadcrumb from "@/components/Breadcrumb";
import ProductsComponent from "@/components/ProductsComponent";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addSlug } from "@/redux/slugsSlice";
// import { nameToSlug } from "@/lib/utils";

type ProductsComponentProps = {
  isIncludeHead?: boolean;
  limit?: number;
  isSalesProducts?: boolean;
  isIncludeFilters?: boolean;
};

function Products({
  isIncludeHead = true,
  limit = 0,
  isSalesProducts = false,
  isIncludeFilters = true,
}: ProductsComponentProps) {
  // const slugs = useSelector((state: RootState) => state.slugs.slugs);
  // const { pathname } = useLocation();

  // const catSlug = pathname.split("/").pop();
  // const catId = slugs.find((val) => val.slug === catSlug)?.id;

  const { data, isLoading, error, isFetched } = useSetProducts();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log(data, error, isLoading);
  //   if (!error && !isLoading && Array.isArray(data))
  //     data?.map((val) => {
  //       dispatch(addSlug({ id: val.id, slug: nameToSlug(val.title), title: val.title, catId: val.categoryId}));
  //     });
  // }, [data, dispatch, isFetched, error, isLoading]);

  // if (!slugs.length) {
  //   return <div>Loading slugs...</div>;
  // }

  if (isLoading||!isFetched) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No products in this category</div>;
  }

  let viewData = data;
  if (isSalesProducts)
    viewData = viewData.filter((val) => val.discont_price > 0);
  if (limit > 0) viewData = viewData.slice(0, limit);

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
      {isIncludeFilters && <p>FILTERS</p>}
      <ProductsComponent products={viewData} />
    </>
  );
}

export default Products;
