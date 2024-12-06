import { useQuery } from "@tanstack/react-query";

// Тип данных
type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

// Функция для загрузки данных
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    "https://pet-shop-backend.fly.dev/categories/all"
  );
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export default function Category() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No categories available.</p>;

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((category) => (
        <div key={category.id} className="flex flex-col justify-center">
          <img
            src={`https://pet-shop-backend.fly.dev${category.image}`}
            alt={category.title}
          />
          <h3 className="text-center">{category.title}</h3>
        </div>
      ))}
    </div>
  );
}
