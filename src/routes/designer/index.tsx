import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/designer/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Overview of blueprint</div>
}
