import { Product } from "@/lib/api";

type ProductsComponentProps = {
  products?: Product[];
};

function ProductsComponent({ products }: ProductsComponentProps) {
  return (
    <div>
      {products?.map((val) => {
        return val.title;
      })}
    </div>
  );
}

export default ProductsComponent;
