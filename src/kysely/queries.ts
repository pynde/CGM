import { db } from "./db";

export const gameComponentsQuery = (gameId: string) => {
    return db.selectFrom('game_component')
        .selectAll()
        .where('id', '=', gameId)
        .compile();
}