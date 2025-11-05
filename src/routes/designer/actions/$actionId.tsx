import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/designer/actions/$actionId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/designer/actions/$actionId"!</div>
}
