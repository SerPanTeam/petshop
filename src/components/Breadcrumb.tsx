import { Link } from "react-router-dom";
interface Breadcrumb {
  name: string;
  url: string;
}

const breadcrumbArray: Breadcrumb[] = [
  { name: "Main page", url: "/" },
  { name: "Categories", url: "/categories" },
];

export default function Breadcrumb({
  breadcrumbAdditional,
}: {
  breadcrumbAdditional?: Breadcrumb[];
}) {
  return (
    <div className="flex flex-row mt-10 mb-10">
      {breadcrumbArray.concat(breadcrumbAdditional || []).map((val, index) => {
        return (
          <div className="flex flex-row justify-center items-center">
            {(index!==0)&&(<div className="border h-[1px] w-4"></div>)}
            <div className="border py-2 px-4 rounded-md">
              <Link to={val.url} className="text-small-grey text-[16px]">{val.name}</Link>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
