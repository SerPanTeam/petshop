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
    <div>
      {breadcrumbArray.concat(breadcrumbAdditional || []).map((val) => {
        return (
          <div>
            <Link to={val.url}>{val.name}</Link>
          </div>
        );
      })}
    </div>
  );
}
