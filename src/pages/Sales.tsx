import Products from "./Products";
import Breadcrumb from "@/components/common/Breadcrumb";

function Sales() {
  return (
    <>
      <Breadcrumb
        additionalBreadcrumb={[{ name: "All sales", url: "/sales" }]}
      />
      <h1 className="heading-2 mb-10">Discounted items</h1>
      <Products
        limit={0}
        isIncludeHead={false}
        isSalesProducts={true}
        isIncludeFilters={true}
      />
    </>
  );
}

export default Sales;
