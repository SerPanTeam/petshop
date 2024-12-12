import { useNavigate } from "react-router-dom";
import SectionDevider from "@/components/common/SectionDivider";
import Categoty from "@/components/product/CategoriesComponent";
import Products from "./Products";
import ContactForm from "@/components/common/ContactForm";

function Home() {
  const navigate = useNavigate();

  const goSales = () => {
    navigate("/sales");
  };

  return (
    <> 
      <section className="px-10 lg:py-20 py-2 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/images/main-banner.png')] bg-cover bg-center">
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

      <section className="px-8 pt-8 flex flex-col gap-6 bg-gradient-to-tr from-[#2451C6] to-[#0D50FF] mt-24">
        <div className="flex flex-row justify-center heading-2 text-white">
          5% off on the first order
        </div>

        <div className="pb-10 flex flex-row justify-end bg-[url('/images/first-order-banner.png')] bg-left-bottom bg-no-repeat">
          <ContactForm />
        </div>
      </section>

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
