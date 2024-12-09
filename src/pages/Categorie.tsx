import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useFetchProductsByCategorieId } from "@/lib/api";
import PreData from "@/components/PreData";

function Categorie() {
  const slugs = useSelector((state: RootState) => state.slugs.slugs);
  const { pathname } = useLocation();

  // Вычисляем slug и catId вне зависимости от состояния, без условного возврата до хуков
  const catSlug = pathname.split("/").pop();
  const catId = slugs.find((val) => val.slug === catSlug)?.id;

  // Хук должен вызываться в любом случае
  const { data, isLoading, error } = useFetchProductsByCategorieId(catId);

  // После вызова хуков делаем условные рендеры
  if (!slugs.length) {
    return <div>Loading slugs...</div>;
  }

  if (isLoading) {
    return <PreData limit={0} data={data} isLoading={isLoading} error={error} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>Categorie</div>
      {console.log(JSON.stringify(data, null, 2))}
      {catId}
    </>
  );
}

export default Categorie;




// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { useLocation } from "react-router-dom";
// import { useFetchProductsByCategorieId } from "@/lib/api";
// import PreData from "@/components/PreData";

// function Categorie() {
//   const slugs = useSelector((state: RootState) => state.slugs.slugs);
//   const { pathname } = useLocation();


//   if (!slugs.length) {
//     // Пока слаги не загружены, можно вернуть лоадер или пустой экран
//     return <div>Loading slugs...</div>;
//   }

  
//   const catId = slugs.find((val) => val.slug == pathname.split("/").pop())?.id;
//   console.log(catId);

//   const { data, isLoading, error } = useFetchProductsByCategorieId(catId);
//   if (!slugs.length || isLoading) {
//     return (
//       <PreData limit={0} data={data} isLoading={isLoading} error={error} />
//     );
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <>
//       <div>Categorie</div>
//       {console.log(JSON.stringify(data, null, 2))}
//       {catId}
//     </>
//   );
// }

// export default Categorie;
