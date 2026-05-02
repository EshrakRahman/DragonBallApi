import Container from "@/components/layout/Container.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function CtgSkeleton() {
  return (
    <Container>
      <div role="status" aria-live="polite" aria-label="Loading category section">
        <section className="bg-[#F0F0F0] px-4 lg:px-6 py-10 rounded-xl flex justify-center items-center flex-col gap-4">
          <Skeleton className="w-full h-9" />
          <Skeleton className="w-full h-60 rounded-xl" />
        </section>
      </div>
    </Container>
  )
}
