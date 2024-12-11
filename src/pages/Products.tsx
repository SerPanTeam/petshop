import { useSetProducts } from "@/lib/api";
import PreData from "@/components/PreData";
import Breadcrumb from "@/components/Breadcrumb";
import ProductsComponent from "@/components/ProductsComponent";

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
  const { data, isLoading, error, isFetched } = useSetProducts();

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
