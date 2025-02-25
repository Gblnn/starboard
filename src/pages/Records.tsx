import { PageTransition } from "@/components/transitions/PageTransition";

export const Records = () => {
  return (
    <>
      <PageTransition>
        <div className="mx-auto max-w-7xl p-8">
          <h1 className="text-4xl font-semibold">Records</h1>
        </div>
      </PageTransition>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-6 md:bottom-6 md:right-8 z-10"></div>
    </>
  );
};
