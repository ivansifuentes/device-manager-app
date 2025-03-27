import { TOP_PARTICIPANT_LIMIT, TOP_RANK_LIMIT } from "../utils/constants";
import sql from "../utils/db";

// Fetch TOP X players that have been selected the most
export async function fetchWinnerRankRecords() {
	let ranked;
	try {
		ranked = await sql`
            with winner_count as (
                select winner_id, count(*) as win_count
                from round r
                group by 1
            ),
            winner_count_rank as (
                select
                    p."name" ,
                    winner_id,
                    win_count,
                    rank() over (
                        order by win_count desc
                    ) rank_winner
                from winner_count wc
                join player p
                on wc.winner_id = p.id
            )
            select *
            from winner_count_rank
            where rank_winner <= ${TOP_RANK_LIMIT}
		`;
	} catch (e) {
		console.error({e});
	}

    return ranked;
}

// Fetch TOP X players that have participated in the most num of rounds
export async function fetchTopParticipantRecords() {
    let top;
    try {
        top = await sql`
            select p."name", count(*) as round_count
            from round_player rp
            join player p
            on rp.player_id = p.id 
            group by 1
            order by round_count desc
            limit ${TOP_PARTICIPANT_LIMIT}
        `;
    } catch (e) {
        console.error({e});
    }

    return top;
}
