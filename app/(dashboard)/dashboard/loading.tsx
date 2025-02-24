import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-8 gap-3 p-10">
      <div className="col-span-2 ">
        <Skeleton className=" h-[300px]" />
      </div>
      <div className="col-span-2 ">
        <Skeleton className=" h-[300px]" />
      </div>
      <div className="col-span-2 ">
        <Skeleton className=" h-[300px]" />
      </div>
      <div className="col-span-2 ">
        <Skeleton className=" h-[300px]" />
      </div>
      <div className="col-span-8">
        <Skeleton className="h-[250px]" />
      </div>
    </div>
  );
}
