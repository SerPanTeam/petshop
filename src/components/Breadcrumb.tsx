import { Link } from "react-router-dom";
interface Breadcrumb {
  name: string;
  url: string;
}

const startBreadcrumb: Breadcrumb[] = [
  { name: "Main page", url: "/" },
  { name: "Categories", url: "/categories" },
];

export default function Breadcrumb({
  additionalBreadcrumb,
}: {
  additionalBreadcrumb?: Breadcrumb[];
}) {
  const fullBreadcrumb = startBreadcrumb.concat(additionalBreadcrumb || []);
  return (
    <div className="flex flex-row mt-10 mb-10">
      {fullBreadcrumb.map((val, index) => {
        return (
          <div
            key={index}
            className="flex flex-row justify-center items-center flex-wrap"
          >
            {index !== 0 && <div className="border h-[1px] lg:w-4 w-2"></div>}
            <div className="border lg:py-2 lg:px-4 py-1 px-2 rounded-md">
              <Link
                to={val.url}
                className="text-small-grey lg:text-[16px] text-[12px]"
              >
                {val.name}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
