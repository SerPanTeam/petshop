import { useState } from "react";

type SendButtonProps = {
  width: string;
  customStyles?: string;
  callbackFunc?: () => void;
  normalText: string;
  afterSendText: string;
};

const SendButton = ({
  width = "w-full",
  customStyles = "",
  callbackFunc,
  normalText,
  afterSendText,
}: SendButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    callbackFunc?.();

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <button
      type="submit"
      className={`h-14 ${width} font-bold py-2 px-6 rounded-md transition-all duration-300 ${
        isAdded
          ? "bg-gray-200 text-blue-600"
          : " text-black bg-white hover:bg-black hover:text-white"
      } ${customStyles}`}
      // onClick={(e) => handleClick(e)}
       onClick={(e) => handleClick(e)}
    >
      {isAdded ? afterSendText : normalText}
    </button>
  );
};

export default SendButton;
