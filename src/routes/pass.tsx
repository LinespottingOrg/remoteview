import { createFileRoute } from "@tanstack/react-router";
import { PassOffer } from "@/components/pass-offer";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/pass")({ component: PassPage });

function PassPage() {
  return (
    <Shell>
      <PassOffer />
    </Shell>
  );
}
