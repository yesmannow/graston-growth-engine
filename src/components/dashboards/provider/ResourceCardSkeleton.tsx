import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ResourceCardSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Skeleton className="h-40 w-full rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Skeleton className="h-4 w-1/4 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mt-1" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default ResourceCardSkeleton;