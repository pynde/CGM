import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/designer/components/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/designer/components"!</div>
}
