import { useNavigate } from "react-router-dom";

export default function SectionDevider({
  titleName,
  buttonName,
  url,
}: {
  titleName: string;
  buttonName: string;
  url: string;
}) {
  const navigate = useNavigate();
  const goToPage = (page: string) => {
    navigate(page);
  };

  return (
    <div className="flex flex-row items-center justify-center px-2 py-4 mt-20">
      <h2 className="heading-2">{titleName}</h2>
      <div className="md:ml-8 ml-2 h-[1px] w-full bg-slate-300"></div>
      <button
        className="text-nowrap px-4 py-2 text-[16px] text-small-grey border-slate-300 border-solid border rounded-md"
        onClick={() => goToPage(url)}
      >
        {buttonName}
      </button>
    </div>
  );
}
