import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Sales from "./pages/Sales";
import Categorie from "./pages/Categorie";
import { useSetCategories, useSetProducts } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addSlugs } from "@/redux/slugsSlice";
import { nameToSlug } from "./lib/utils";
import PreData from "@/components/PreData";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  // const { data, isLoading, error, isFetched } = useSetCategories();
  // useEffect(() => {
  //   // console.log(data, error, isLoading);
  //   if (!error && !isLoading && Array.isArray(data))
  //     data?.map((val) => {
  //       dispatch(addSlug({ id: val.id, slug: nameToSlug(val.title), title: val.title, catId: 0 }));
  //     });
  // }, [data, dispatch, isFetched, error, isLoading]);

  // Загрузка категорий
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
    // isFetched: isFetchedCategories,
  } = useSetCategories();

  // Загрузка продуктов
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: errorProducts,
    // isFetched: isFetchedProducts,
  } = useSetProducts();

  const [slugsDispatched, setSlugsDispatched] = useState(false);

  useEffect(() => {
    if (
      !errorCategories &&
      !isLoadingCategories &&
      Array.isArray(categoriesData) &&
      !errorProducts &&
      !isLoadingProducts &&
      Array.isArray(productsData)
    ) {
      // Генерация slugs для категорий
      const categorySlugs = categoriesData.map((category) => ({
        id: category.id,
        slug: nameToSlug(category.title),
        title: category.title,
        catId: 0,
        type: "category" as const,
      }));

      // Генерация slugs для продуктов
      const productSlugs = productsData.map((product) => ({
        id: product.id,
        slug: nameToSlug(product.title),
        title: product.title,
        catId: product.categoryId,
        type: "product" as const,
      }));

      // Диспатч slugs в Redux
      dispatch(addSlugs([...categorySlugs, ...productSlugs]));
      setSlugsDispatched(true);
    }
  }, [
    categoriesData,
    isLoadingCategories,
    errorCategories,
    productsData,
    isLoadingProducts,
    errorProducts,
    dispatch,
  ]);

  // Проверка загрузки slugs
  const isLoading =
    isLoadingCategories || isLoadingProducts || !slugsDispatched;
  const error = errorCategories || errorProducts;

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        {isLoading ? (
          <PreData limit={0} isLoading={isLoading} error={error} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<Categorie />} />

            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />} />
            {/* <Route path="/products/:productName" element={<ProductDetail />} /> */}
            <Route
              path="/categories/:categoryName/:productName"
              element={<ProductDetail />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
