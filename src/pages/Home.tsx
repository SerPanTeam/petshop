import { useNavigate } from "react-router-dom";
import SectionDevider from "../components/common/SectionDivider";
import Categoty from "../components/product/CategoriesComponent";
import Products from "./Products";

function Home() {
  const navigate = useNavigate();

  const goSales = () => {
    navigate("/sales");
  };

  return (
    <>
      <section className="-mx-10 px-10 lg:py-20 py-2 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/images/main-banner.png')] bg-cover bg-center">
          <h1 className="lg:text-[96px] md:text-[56px] text-[32px] text-white font-bold leading-[110%] lg:mb-10 mb-2">
            Amazing Discounts on Pets Products!
          </h1>
          <button
            className="py-4 px-12 lg:w-[218px] lg:h-[58px] bg-blue-600 text-white rounded-md text-[20px] text-center font-semibold leading-[130%]"
            onClick={goSales}
          >
            Check out
          </button>
      </section>

      <SectionDevider
        titleName="Categories"
        buttonName="All categories"
        url="/categories"
      />
      <Categoty limit={4} />
      <SectionDevider titleName="Sale" buttonName="All sales" url="/sales" />
      <Products
        limit={4}
        isIncludeHead={false}
        isSalesProducts={true}
        isIncludeFilters={false}
      />
    </>
  );
}

export default Home;
