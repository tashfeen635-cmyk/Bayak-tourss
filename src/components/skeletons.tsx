function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted/40 ${className ?? ""}`} />;
}

function SectionHeading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <Pulse className="mx-auto h-4 w-20" />
        <Pulse className="mx-auto h-8 w-72 sm:h-10 sm:w-96" />
        <Pulse className="mx-auto h-4 w-64 sm:w-80" />
      </div>
    </div>
  );
}

export function GalleryTeaserSkeleton() {
  return (
    <section className="py-24 sm:py-32">
      <SectionHeading />
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 sm:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Pulse key={i} className="aspect-square" />
          ))}
        </div>
        <div className="hidden sm:columns-2 sm:block lg:columns-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Pulse key={i} className={`mb-4 ${i % 3 === 0 ? "h-48" : i % 3 === 1 ? "h-64" : "h-40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamTeaserSkeleton() {
  return (
    <section className="py-24 sm:py-32">
      <SectionHeading />
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border">
              <Pulse className="aspect-square rounded-none" />
              <div className="space-y-3 p-6">
                <Pulse className="h-5 w-3/4" />
                <Pulse className="h-4 w-1/2" />
                <div className="space-y-2 pt-2">
                  <Pulse className="h-3 w-full" />
                  <Pulse className="h-3 w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingDealsSkeleton() {
  return (
    <section className="bg-sand py-24 dark:bg-charcoal/50 sm:py-32">
      <SectionHeading />
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Pulse key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border">
              <div className="relative">
                <Pulse className="aspect-[4/3] rounded-none" />
                <Pulse className="absolute left-3 top-3 h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-3 p-5">
                <Pulse className="h-3 w-24" />
                <Pulse className="h-5 w-3/4" />
                <div className="space-y-2">
                  <Pulse className="h-3 w-full" />
                  <Pulse className="h-3 w-5/6" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Pulse className="h-4 w-24" />
                  <Pulse className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="py-24 sm:py-32">
      <SectionHeading />
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Pulse className="h-5 w-24" />
              <Pulse className="h-3 w-16" />
            </div>
          ))}
        </div>
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border p-8 sm:p-12">
            <Pulse className="mb-4 h-10 w-10" />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Pulse key={i} className="h-4 w-4" />
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-5/6" />
              <Pulse className="h-4 w-4/6" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Pulse className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Pulse className="h-4 w-28" />
                <Pulse className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DestinationsContentSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-10 px-4 text-center">
          <Pulse className="mx-auto h-10 w-64 sm:h-14 sm:w-80" />
          <Pulse className="mx-auto mt-4 h-4 w-72 sm:w-96" />
        </div>
      </section>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Pulse key={i} className="h-9 w-20 rounded-full" />
            ))}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border">
                <Pulse className="aspect-[4/3] rounded-none" />
                <div className="space-y-3 p-5">
                  <Pulse className="h-3 w-24" />
                  <Pulse className="h-5 w-3/4" />
                  <div className="space-y-2">
                    <Pulse className="h-3 w-full" />
                    <Pulse className="h-3 w-5/6" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Pulse className="h-4 w-24" />
                    <Pulse className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function TeamContentSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-10 px-4 text-center">
          <Pulse className="mx-auto h-10 w-64 sm:h-14 sm:w-80" />
          <Pulse className="mx-auto mt-4 h-4 w-72 sm:w-96" />
        </div>
      </section>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border">
                <Pulse className="aspect-[4/5] rounded-none" />
                <div className="space-y-3 p-6">
                  <Pulse className="h-5 w-3/4" />
                  <Pulse className="h-4 w-1/2" />
                  <div className="space-y-2 pt-1">
                    <Pulse className="h-3 w-full" />
                    <Pulse className="h-3 w-5/6" />
                    <Pulse className="h-3 w-4/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function GalleryContentSkeleton() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-10 px-4 text-center">
          <Pulse className="mx-auto h-10 w-64 sm:h-14 sm:w-80" />
          <Pulse className="mx-auto mt-4 h-4 w-72 sm:w-96" />
        </div>
      </section>
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Pulse key={i} className="h-9 w-20 rounded-full" />
            ))}
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-3 gap-3 sm:hidden">
              {Array.from({ length: 9 }).map((_, i) => (
                <Pulse key={i} className="aspect-square" />
              ))}
            </div>
            <div className="hidden sm:columns-2 sm:block lg:columns-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Pulse key={i} className={`mb-4 ${i % 3 === 0 ? "h-48" : i % 3 === 1 ? "h-64" : "h-40"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
