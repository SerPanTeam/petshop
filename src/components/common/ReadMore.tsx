import { useState } from "react";

const ReadMore = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      <p>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
        <br />
        <button
          onClick={toggleReadMore}
          className=" mt-4 text-[16px] font-medium leading-[1.3] underline custom-underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
};

export default ReadMore;
