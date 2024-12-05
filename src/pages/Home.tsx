import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goSales = () => {
    navigate("/sales");
  };

  return (
    <>
      <section className="px-10 lg:py-20 py-2 w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-[url('/images/main-banner.png')] bg-cover bg-center">
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

      <section className="flex flex-row items-center">
        <h2 className="heading-2">Categories</h2>
        <div className="h-[1px] w-full bg-slate-300" />
        <button className="text-small-grey border-slate-300 border-solid border rounded-md px-2 py-4 mt-20">All categories</button>
      </section>
    </>
  );
}

export default Home;
