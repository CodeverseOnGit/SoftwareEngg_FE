import LessonClient from "./LessonClient";

export default function LessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  return <LessonClient lessonId={params.lessonId} />;
}
