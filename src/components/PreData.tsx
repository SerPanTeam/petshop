import { Skeleton } from "@/components/ui/skeleton";
import { Category, ProductInCategory } from "@/lib/api";

function PreData({
  isLoading,
  limit,
  error,
  data,
}: {
  isLoading: boolean;
  limit?: number;
  error: Error | null;
  data: Category[] | ProductInCategory[] | undefined;
}) {
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
  //   if (!data || data.length === 0) return <p>No data available.</p>;
  if (!data) return <p>No data available.</p>;
}

export default PreData;
