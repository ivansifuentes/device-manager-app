import sql from "../utils/db";
import { randomUUID } from 'crypto';
import { Player } from "./player";

export type Round = {
  id?: string;
  created_at: string;
  winner_id: string;
}

// In a transaction store the round and its players
export async function insertRound(winner: Player, players: Array<Player>) {
  const id = randomUUID();
  try {
    const [round] = await sql.begin(async sql => {
        const [round] = await sql`
            insert into round
                (id, winner_id)
            values
                (${ id }, ${ winner.id! })
            returning id, winner_id
        `;

        for (const p of players) {
            const id = randomUUID();
            await sql`
                insert into round_player
                    (id, round_id, player_id)
                values
                    (${ id }, ${round.id}, ${ p.id! })
            `;
        }
      
        return [round]
    });

    return round;
  } catch (e) {
    console.error({e});
  }
}