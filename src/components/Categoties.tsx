import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryProps = {
  limit?: number;
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/all`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export default function Category({ limit }: CategoryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });

  // if (isLoading) return <p>Loading...</p>;

  if (isLoading) {
    return (
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: limit || 4 }).map((_, index) => (
          <div key={index} className="flex flex-col justify-center">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-6 w-3/4 mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No categories available.</p>;

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.slice(0, limit ? limit : data.length).map((category) => (
        <div key={category.id} className="flex flex-col justify-center">
          <img src={API_BASE_URL + category.image} alt={category.title} />
          <h3 className="text-center">{category.title}</h3>
        </div>
      ))}
    </div>
  );
}
