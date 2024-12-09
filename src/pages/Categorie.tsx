import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useFetchProductsByCategorieId } from "@/lib/api";
import PreData from "@/components/PreData";

function Categorie() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();
  const catId = slugs.find((val) => val.slug == pathname.split("/").pop())?.id;
  console.log(slugs);
  const { data, isLoading, error } = useFetchProductsByCategorieId(catId);

  // Простая проверка на загрузку или пустой `slugs`
  if (!slugs.length || isLoading) {
    return (
      <PreData limit={0} data={data} isLoading={isLoading} error={error} />
    );
  }

  // Проверка на ошибки
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <div>Categorie</div>
      {console.log(data)}
      {catId}
    </>
  );
}

export default Categorie;
