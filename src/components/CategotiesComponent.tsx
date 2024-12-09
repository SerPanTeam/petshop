import { API_BASE_URL } from "@/config";
import { Link } from "react-router-dom";
import { nameToSlug } from "@/lib/utils";
import { useSetCategories } from "@/lib/api";
import PreData from "./PreData";

type CategoryProps = {
  limit?: number;
};

export default function Category({ limit }: CategoryProps) {
  const { data, isLoading, error } = useSetCategories();
  <PreData limit={limit} data={data} isLoading={isLoading} error={error} />;

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data?.slice(0, limit ? limit : data.length).map((category) => (
        <Link
          key={category.id}
          to={"/categories/" + nameToSlug(category.title)}
        >
          <div className="flex flex-col justify-center">
            <img src={API_BASE_URL + category.image} alt={category.title} />
            <h3 className="text-center text-[20px] font-medium leading-[130%] text-[#282828] mt-4">
              {category.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
