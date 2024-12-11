import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Sales from "./pages/Sales";
import Categorie from "./pages/Category";
import { useSetCategories, useSetProducts } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addSlugs } from "@/redux/slugsSlice";
import { nameToSlug } from "./lib/utils";
import PreData from "@/components/common/PreData";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSetCategories();

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: errorProducts,
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
      const categorySlugs = categoriesData.map((category) => ({
        id: category.id,
        slug: nameToSlug(category.title),
        title: category.title,
        catId: 0,
        type: "category" as const,
      }));

      const productSlugs = productsData.map((product) => ({
        id: product.id,
        slug: nameToSlug(product.title),
        title: product.title,
        catId: product.categoryId,
        type: "product" as const,
      }));

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

  const isLoading =
    isLoadingCategories || isLoadingProducts || !slugsDispatched;
  const error = errorCategories || errorProducts;

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <header className="lg:px-10 border-b border-gray-300">
        <Header />
      </header>
      <main className="lg:px-10">
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
            <Route
              path="/categories/:categoryName/:productName"
              element={<ProductDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <footer className="lg:px-10">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
