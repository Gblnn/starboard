import { PageTransition } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Records = () => {
  return (
    <>
      <PageTransition>
        <div className="mx-auto max-w-7xl p-8">
          <h1 className="text-4xl font-semibold">Records</h1>
        </div>
      </PageTransition>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-10">
        <Button size="lg" className="rounded-full shadow-lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Category
        </Button>
      </div>
    </>
  );
};
