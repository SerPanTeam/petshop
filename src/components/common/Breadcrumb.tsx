import { Link } from "react-router-dom";
interface Breadcrumb {
  name: string | undefined;
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
        const isLast = index === fullBreadcrumb.length - 1;
        const isFirst = index === 0;
        return (
          <div
            key={index}
            className={`flex flex-row justify-center items-center flex-wrap ${
              isFirst || isLast ? "hidden md:flex" : "flex"
            }`}
          >
            {!isFirst && <div className="border h-[1px] lg:w-4 w-2 "></div>}
            <div className="border lg:py-2 lg:px-4 py-1 px-2 rounded-md hover:bg-gray-50">
              <Link
                to={val.url}
                className={`${
                  index !== fullBreadcrumb.length - 1
                    ? "text-small-grey"
                    : "text-black"
                } lg:text-[16px] text-[12px]`}
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
