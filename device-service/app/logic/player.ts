import sql from "../utils/db";
import { randomUUID } from 'crypto';

export type Player = {
  id?: string;
  name: string;
}

export async function fetchPlayerByName(name: string) {
  let players;
  try {
    players = await sql`
      select *
      from player
      where name = ${ name }
    `;
  } catch (e) {
    console.error({e});
  }
  if (!players || players.count !== 1)
    return;

  return players[0] as Player;
}

export async function insertPlayer(player: Player) {
  const id = randomUUID();
  let players;
  try {
    players = await sql`
      insert into player
        (id, name)
      values
        (${ id }, ${ player.name })
      returning id, name
    `;
  } catch (e) {
    console.error({e});
  }
  if (!players || players.count !== 1)
    return;

  return players[0] as Player;
}
