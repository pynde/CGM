// blueprint.tsx
import { createFileRoute } from "@tanstack/react-router";
import { blueprintToJsonFile } from "@/testdata";

export const Route = createFileRoute('/tests/jsonize')({
    loader: async () => blueprintToJsonFile(),
    component: () => <Jsonize />,
})



const Jsonize = () => {
    const json = Route.useLoaderData();

    return <div>{json}</div>;
}