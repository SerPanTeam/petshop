import CategotiesComponent from "@/components/product/CategoriesComponent";
import Breadcrumb from "@/components/common/Breadcrumb";


function Categories() {


  return (
    <div>
      <Breadcrumb />
      <h1 className="heading-2 mb-10">Categories</h1>

      <CategotiesComponent />
    </div>
  );
}

export default Categories;
