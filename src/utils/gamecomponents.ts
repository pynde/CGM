import { env } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import type { SelectableGameComponent } from "@/kysely/schema";

export const fetchGameComponent = 
    createServerFn({method: "GET"})
    .inputValidator((id: string) => id)
    .handler(async ({ data }) => {
        const { results } = await env.bgm_db
            .prepare("SELECT * FROM game_components WHERE id = ?")
            .bind(data)
            .run<SelectableGameComponent>();
        return results[0];
    });