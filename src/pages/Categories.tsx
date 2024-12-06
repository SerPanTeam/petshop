import Category from "@/components/Categoties";
import Breadcrumb from "@/components/Breadcrumb";

function Categories() {
  return (
    <div>
      <Breadcrumb
        breadcrumbAdditional={[
          { name: "Main page", url: "/" },
          { name: "Categories", url: "/categories" },

        ]}
      />
      <Category />
    </div>
  );
}

export default Categories;
