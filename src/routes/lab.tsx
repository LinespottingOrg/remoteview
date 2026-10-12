import { createFileRoute } from "@tanstack/react-router";
import { LabSession } from "@/components/lab-session";
import { Access } from "@/components/pass-offer";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/lab")({ component: LabPage });

function LabPage() {
  return (
    <Shell>
      <Access>
        <LabSession />
      </Access>
    </Shell>
  );
}
