import { addProduct } from "@/redux/cartSlice";
import { Product } from "@/lib/api";
import { useDispatch } from "react-redux";
import { useState } from "react";

type AddToCartButtonProps = {
  data: Product;
  count: number;
  width: string;
  customStyles?: string;
  callbackFunc?: () => void;
};

const AddToCartButton = ({
  data,
  count,
  width = "w-full",
  customStyles = "",
  callbackFunc,
}: AddToCartButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  function addToCart(data: Product) {
    dispatch(addProduct({ product: data, count: count }));
    //setCount(1);
    callbackFunc?.();
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAdded(true);
    addToCart(data);
    setTimeout(() => setIsAdded(false), 500);
  };

  return (
    <button
      className={`h-14 ${width} font-bold py-2 px-6 rounded-md transition-all duration-300 ${
        isAdded
          ? "bg-white text-black border border-black"
          : "bg-blue-600 text-white hover:bg-[#282828]"
      } ${customStyles}`}
      onClick={(e) => handleClick(e)}
    >
      {isAdded ? "Added" : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;

{
  /* <button
className="h-14 w-full bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-[#282828]"
onClick={() => addToCart(data)}
>
Add to Cart
</button> */
}
