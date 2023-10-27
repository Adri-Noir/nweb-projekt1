export default function round_robin_pairs(
  players: string[],
): [string, string][][] {
  const rounds: [string, string][][] = [];
  if (players.length % 2 !== 0) {
    players.push("");
  }

  const n = players.length;
  const half = n / 2;

  for (let round = 0; round < n - 1; round++) {
    const currentRound: [string, string][] = [];

    for (let i = 0; i < half; i++) {
      const match: [string, string] = [players[i], players[n - 1 - i]];
      currentRound.push(match);
    }

    players.splice(1, 0, players.pop()!);
    rounds.push(currentRound);
  }

  return rounds;
}
