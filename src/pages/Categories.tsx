import Category from "@/components/CategotiesComponent";
import Breadcrumb from "@/components/Breadcrumb";

function Categories() {
  return (
    <div>
      <Breadcrumb/>
      <h1 className="heading-2 mb-10">Categories</h1>
      <Category />
    </div>
  );
}

export default Categories;
