import { randomUUID } from "crypto";
import sql from "../utils/db";

export type TeaUser = {
    id: string;
    name: string;
    password: string;
  }

export async function fetchUser(id: string, password: string) {
  let users;
  try {
    users = await sql`
      select *
      from tea_user
      where id = ${ id }
      and password = ${ password }
    `;
  } catch (e) {
    console.error({e});
  }
  if (!users || users.count !== 1)
    return;

  return users[0] as TeaUser;
}

// In a transaction store the players linked to the user
// (in a real world scenario we validate each player_id exists in the db beforehand)
export async function insertUserPlayers(userId: string, playerIds: Array<string>) {
  try {
    await sql.begin(async sql => {
        await sql`
            delete from user_player
            where user_id = ${ userId }
        `;

        for (const p of playerIds) {
            const id = randomUUID();
            await sql`
                insert into user_player
                    (id, user_id, player_id)
                values
                    (${ id }, ${userId}, ${ p })
            `;
        }
      
        return
    });

    return true;
  } catch (e) {
    console.error({e});
  }
}


// Fetch players linked to a user
export async function fetchUserPlayersRecords(userId: string) {
    let userPlayers;
    try {
        userPlayers = await sql`
            select p.id, p."name"
            from user_player up 
            join player p
            on p.id = up.player_id 
            where up.user_id = ${ userId } 
        `;
    } catch (e) {
        console.error({e});
    }

    return userPlayers;
}


