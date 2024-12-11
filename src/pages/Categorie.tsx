import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useFetchProductsByCategorieId } from "@/lib/api";
import PreData from "@/components/PreData";
import Breadcrumb from "@/components/Breadcrumb";
import Products from "@/components/ProductsComponent";

function Categorie() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();

  const catSlug = pathname.split("/").pop();
  const catId = slugs.find((val) => val.slug === catSlug)?.id;

  const { data, isLoading, error } = useFetchProductsByCategorieId(catId);

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
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  return (
    <>
      <Breadcrumb
        additionalBreadcrumb={[{ name: data.category.title, url: pathname }]}
      />
      <h1 className="heading-2 mb-10">{data.category.title}</h1>
      <Products products={data.data} />
    </>
  );
}

export default Categorie;
