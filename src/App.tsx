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
import { useSetCategories } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addSlug } from "@/redux/slugsSlice";
import { nameToSlug } from "./lib/utils";
import PreData from "@/components/PreData";

import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error, isFetched } = useSetCategories();
  useEffect(() => {
   // console.log(data, error, isLoading);
    if (!error && !isLoading && Array.isArray(data))
      data?.map((val) => {
        dispatch(addSlug({ id: val.id, slug: nameToSlug(val.title) }));
      });
  }, [data, dispatch, isFetched, error, isLoading]);

  return (
    <div className="container min-h-screen flex flex-col justify-between">
      <Header />
      <main>
        {isLoading ? (
          <PreData limit={0} data={data} isLoading={isLoading} error={error} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<Categorie />} />

            <Route path="/sales" element={<Sales />} />
            <Route path="/products" element={<Products />}>
              <Route path=":id" element={<ProductDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
