import { createFileRoute } from "@tanstack/react-router";
import { lessonById } from "@/data/course";
import { LessonView } from "@/components/lesson-view";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/course/$id")({ component: LessonPage });

function LessonPage() {
  const { id } = Route.useParams();
  const lesson = lessonById(id);
  if (!lesson) {
    return (
      <Shell>
        <h1 className="font-serif text-3xl text-fg">No lecture under that name.</h1>
      </Shell>
    );
  }
  return (
    <Shell>
      <LessonView key={lesson.id} lesson={lesson} />
    </Shell>
  );
}
