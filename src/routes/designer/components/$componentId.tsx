import { createFileRoute } from '@tanstack/react-router'
import GameComponent from '@/components/GameComponent/GameComponent'
import { gameComponentsQuery } from '@/kysely/queries';

// Route for /designer/components
export const Route = createFileRoute('/designer/components/$componentId')({
    pendingComponent: () => <div>Loading...</div>,
    loader: () => {},
    component: RouteComponent
});

function RouteComponent() {
    const component = Route.useLoaderData();
    return (
        <div></div>
    );
}

