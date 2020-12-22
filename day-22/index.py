def read_input():
  input = open("./input.txt", "r")
  lines = input.read().splitlines()
  length = len(lines)
  player1 = [int(card) for card in lines[1:length/2]]
  player2 = [int(card) for card in lines[length/2+2:]]
  cards = [player1, player2]
  return cards

def solve_a(input):
  player1 = input[0]
  player2 = input[1]

  while True:
    if (len(player1) == 0 or len(player2) == 0):
      break

    card1 = player1.pop(0)
    card2 = player2.pop(0)

    if card1 > card2:
      player1 = player1 + [card1, card2]
    if card1 < card2:
      player2 = player2 + [card2, card1]

  winner = player1 if len(player1) > 0 else player2
  result = 0
  for index, card in enumerate(winner):
    result += card * (len(winner) - index)

  return result




input = read_input()
print(solve_a(input))