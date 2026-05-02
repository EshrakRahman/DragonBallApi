import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function CtgCardSkeleton() {
  return (
    <section className="ctg-card-skel bg-yellow-600 rounded-xl relative w-full min-w-[260px] lg:h-73 h-48 overflow-hidden">
      <div className="card flex py-8">
        <div className="left w-1/3 px-6">
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="img w-2/3">
          <Skeleton className="w-full h-40" />
        </div>
      </div>
    </section>
  );
}
