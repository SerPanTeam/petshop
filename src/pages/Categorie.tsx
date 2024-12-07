import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useFetchProductsByCategorieId } from "@/lib/db";
import PreData from "@/components/PreData";


function Categorie() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();
  const catId = slugs.find((val) => val.slug == pathname.split("/").pop())?.id;
  //console.log(slugs, pathname);
  const { data, isLoading, error } = useFetchProductsByCategorieId(catId);
  <PreData limit={0} data={data} isLoading={isLoading} error={error} />;
  return (
    <>
      <div>Categorie</div>
      {catId}
    </>
  );
}

export default Categorie;
