import { API_BASE_URL } from "@/config";
import { useQuery } from "@tanstack/react-query";

export type Category = {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  discont_price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
};

export type ProductInCategory = {
  category: Category;
  data: Product[];
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/all`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const useSetCategories = () => {
  return useQuery({
    queryKey: ["categories"], // Уникальный ключ для запроса
    queryFn: fetchCategories, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });
};

const fetchProductsByCategorieId = async (
  id: number | undefined
): Promise<ProductInCategory> => {
  const url = `${API_BASE_URL}/categories/${id}`;
  console.log(url);
  const response = await fetch(`${API_BASE_URL}/categories/${id}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const useFetchProductsByCategorieId = (id: number | undefined) => {
  return useQuery({
    queryKey: ["categorieByID", id], // Уникальный ключ для запроса
    queryFn: () => fetchProductsByCategorieId(id), // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
    enabled: typeof id === "number",
  });
};


const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products/all`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const useSetProducts = () => {
  return useQuery({
    queryKey: ["products"], // Уникальный ключ для запроса
    queryFn: fetchProducts, // Функция для загрузки данных
    staleTime: 1000 * 60 * 5, // Данные актуальны 5 минут
  });
};