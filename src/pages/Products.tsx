import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
//import { useLocation } from "react-router-dom";
import { useSetProducts } from "@/lib/api";
import PreData from "@/components/PreData";
import Breadcrumb from "@/components/Breadcrumb";
import ProductsComponent from "@/components/ProductsComponent";

type ProductsComponentProps = {
  isIncludeHead?: boolean;
  limit?: number;
  isSalesProducts?: boolean;
};

function Products({
  isIncludeHead = true,
  limit = 0,
  isSalesProducts = false,
}: ProductsComponentProps) {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  // const { pathname } = useLocation();

  // const catSlug = pathname.split("/").pop();
  // const catId = slugs.find((val) => val.slug === catSlug)?.id;

  const { data, isLoading, error } = useSetProducts();

  if (!slugs.length) {
    return <div>Loading slugs...</div>;
  }

  if (isLoading) {
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
      <ProductsComponent products={viewData} />
    </>
  );
}

export default Products;
