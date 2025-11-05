import { createFileRoute } from '@tanstack/react-router'
import { fetchGameComponent } from '@/utils/gamecomponents';



// Route for /designer/components
export const Route = createFileRoute('/designer/components/$componentId')({
    pendingComponent: () => <div>Loading...</div>,
    loader: async({params}) => await fetchGameComponent({data: params.componentId}),
    component: RouteComponent
})

function RouteComponent() {
    const component = Route.useLoaderData();
    return (
        <div>{component.name}</div>
    );
}

