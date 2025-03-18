# Action Designer examples

## Terraforming Mars

### GAME OVERVIEW

In Terraforming Mars, you control a corporation,
and you buy and play cards describing different projects.
The projects often directly or indirectly contribute to the
terraforming process, but can also consist of business
enterprises of different kinds. In order to win, you have to
accumulate a good terraform rating (TR) and many victory
points (VPs). Your TR is increased each time you raise a
global parameter (temperature, oxygen or ocean). Your TR
determines your basic income, as well as your basic score. As
the terraforming process proceeds, more projects become
feasible. Additional VPs are awarded for anything enhancing
mankind’s grip on the solar system. This can be anything,
from founding cities to building infrastructure, or protecting
the environment.

Time is measured in generations, and each
generation starts with a Turn Order phase, followed by a
Research phase, in which players access new cards. `In the
Action phase, players take turns doing 1 or 2 actions, going
around the table until everyone has passed.` Then, in the
Production phase, all players produce resources according to
their production parameters on the player boards, and gain
income from their TR.

`Turns (type TurnType) are set to { turnAmount: { min: 1, max: 2 } } when GameState { mode = GAME_STATE_MODE }`

The central game board has tracks for temperature,
oxygen level, terraform rating, and generations. There is
a surface map where you add ocean tiles, greenery tiles,
and city tiles as the game progresses. There is also a list of
standard projects available to all players, as well as milestones
and awards that players can compete for.
The game ends when there is enough oxygen to
breathe (14 %), oceans enough to allow Earth-like weather
(9), and the temperature is well above freezing (+8 ˚C). It will
then be possible, if not comfortable, to live on the surface of
Mars!

`Game end condition (type GameState) value { conditions: [ tracks: [{ oxygen: "min 14", oceans: "min 9", temperature: "min 8" }] ] } is set as a default value when GameState { mode = GAME_STATE_MODE }`

The winner is the player with most VPs
at the end of the game. VPs come from your
TR, your tiles on the game board, won awards,
claimed milestones, and VPs on cards you have
played.


### GLOBAL PARAMETERS

Temperature, oxygen, and ocean are called global
parameters. Whenever you raise one of them, your
terraform rating also increases by that much, giving you a
higher income and score.
When a global parameter has reached its goal, it
can’t be raised any further, and so does not increase your
TR. You may still play cards and actions that increase the
parameter - just ignore that part of the effect.
When all three global parameters have reached
their goal, the game ends after that generation (after the
production phase).

`ActionType: increaseTrack; E.g. Oxygen is increased by 1 IF < max`
`SubActionType: increaseTrack; E.g. Terraform rating is increased the amount of parent Action`
`SubActionType: Finish`

### GAME BOARD

1. Terraform rating (TR) track: All players start at 20. This is your basic income (see pages 6 and 8) and VPs. You increase it every time you terraform.

`Terraform rating (type TrackType) value (20) is set as a default value for when GameState { mode } is set to any GAME_STATE_MODE enum.`

2. Generation track: The generation marker measures time (rounds) and starts at 1, moving up on the TR track.

`Generation track (type TrackType) value (1) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

3. Solo games: Solo games start with a TR of 14, and end after generation 14.

`Terraform rating (type TrackType) value (14) is set as a default value when GameState { mode = GAME_STATE_MODE.SOLO }.`

4. Oxygen: This global parameter starts at 0%. This percentage compares to Earth’s 21% oxygen.

`Oxygen (type TrackType) value is set as a default value when GameState { mode = GAME_STATE_MODE }.`

5. Ocean tiles: This global parameter starts with 9 tiles in a stack here, to be placed on the board during the game.

`Ocean tiles (type StackType) value (9) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

6. Temperature: This global parameter (mean temperature at the equator) starts at -30 ˚C.

`Temperature (type TrackType) value (-30) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

7. Bonus steps: If you raise the parameter to this point, you also get the attached bonus.

`Bonus steps (type TrackType) value is set as a default value when GameState { mode = GAME_STATE_MODE }.`

8. Standard Projects: May be used by any player regardless of what cards you have. See page 10.

`Standard Projects (type SpaceType) value is set to the predefined standard project options when GameState { mode = GAME_STATE_MODE }.`

9. Milestones / Awards: Can be a good source of extra VPs. See pages 10 and 11.

`Milestones / Awards (type Achievement) value is set to the predefined milestone and award options when GameState { mode = GAME_STATE_MODE }.`

10. Placement bonuses: When placing a tile on an area with a placement bonus, you get the printed resources or cards. See page 5.

`Placement bonuses (type Resource) value is set to the predefined placement bonus options when GameState { mode = GAME_STATE_MODE }.`

11. Ocean-reserved areas: Blue areas are reserved for ocean tiles; ocean tiles may only be placed here, and no other tile may be placed here.

`Ocean-reserved areas (type SpaceType) value is set to the predefined areas (type SpaceType) where only ocean tiles can be placed when GameState { mode = GAME_STATE_MODE }.`

12. Special reserved areas: 3 areas are reserved for specific cities. No other tiles may be placed there.

`Special reserved areas (type SpaceType) values are set to { acceptedComponents: Array<GameComponentType> } when GameState { mode = GAME_STATE_MODE }.`

### TILES

The game board has a map where tiles may be
placed. When placing a tile, you must first check to see if
there are any placement restrictions. `There are areas reserved
for ocean and specific cities, where no other tiles may be
placed.` Furthermore, each tile may have specific restrictions
printed on the respective card or in the summaries below.
When you place the tile, you receive the placement
bonus printed on that area (if any). You also get a bonus for
placing tiles next to ocean tiles (see below).

`Special reserved areas (type SpaceType) property { acceptedComponents: Array<GameComponentType> } is set when GameState { mode = GAME_STATE_MODE }.`

`Ocean tile: Ocean tiles may only be placed on
areas reserved for ocean (see map).``Placing an
ocean tile increases your TR 1 step.` Ocean tiles are
not owned by any player. `Each ocean tile on the
board provides a 2 M€ placement bonus for any
player later placing a tile, even another ocean, next to it.`
Example: If you place a city tile adjacent to 2 different
ocean tiles you get 4 M€ as placement bonus

`Spaces for Ocean (type SpaceType) are set to { reservedFor: GameComponentType['type'], occupiedBy: { component: GameComponentType } } `
`Ocean tile (type GameComponentType) triggers effect (type EffectType) when PlayComponent or PlayDefaultAction`

Greenery tile: `If possible, greenery tiles must
be placed next to another tile that you own. If
you have no available area next to your tiles, or if
you have no tile at all, you may place the greenery tile on any available area.` Place a player marker on it to
mark your ownership. `When placing a greenery tile, you
increase the oxygen level, if possible, and also your TR. If
you can't raise the oxygen level you don't get the increase
in TR either.``Greenery tiles are worth 1 VP at the end of the
game, and also provide 1 VP to any adjacent city (see below).`

`Greenery tile (type GameComponent) is initally set to { availableSpaces: SpaceType[] }`
`Greenery tile (type GameComponent) is initally set to { effect: EffectType }`
`Oxygen level (type Track) is increased when Greenery tile is played and oxygen level =< MAX oxygen level`
`Greenery tile (type GameComponent) points are set when tile is placed on a suitable spaces (type SpaceType)`

### MARKERS

Resource cubes: Resources are collected on the player board
or on specific cards. There are many types of resources (see
page 14), but they are all marked by these cubes:
BRONZE = 1
SILVER = 5
GOLD = 10

`Resource cubes (type ResourceType) are set initially { value: MultipleValue }`

Player markers: Each player uses his own color
to mark TR, ownership of tiles, production
(see page 6), and to indicate used blue card
actions (see page 11).

`Player markers (type GameComponentType) are set initially set to { amount: number }`

Temperature, oxygen, and generation
markers: Start at the beginning of the
respective track (see page 4).
First player marker: Shifts clockwise each
generation.

`Temperature, oxygen and generation markers are not set; respective tracks (type TrackType) are set { indicator: Image | GameComponent }`

### PLAYER BOARDS

The player board keeps track of your current resources
and production. Resource cubes are placed in their respective
boxes, and player markers are used on the production tracks.
In the game, resource icons refer to resource cubes, while
resource icons inside brown boxes refer to production of
that resource (see the project card below).
1. Production tracks: If you gain production of a resource,
mark the new production level with your player marker.
Production is not limited to 10. Example: If you play a card
that increases your heat production 3 steps from 19 to 22 you
mark this by having 2 player markers on ’10’ and 1 marker on ’2’
on the production track above the heat box. Impressive!
During the production phase you add resource cubes equal to
your production.
2. MegaCredits (M€) : Are used to pay for cards and other
things. Note: Your M€ income is the sum of your M€ produc-
tion and your TR. M€ production is the only production that
can be negative, but it may never be lowered below -5.
3. Steel: Is only used to pay for cards with a building tag and
is worth 2 M€/cube. You may pay with both M€ and steel, but
you get no refund for ’overpaying’ with steel.
4. Titanium: Is only used to pay for cards with a space tag and
is worth 3 M€/cube, similar to steel.
5. Plants: May be converted into greenery tiles by using the
depicted action (see pages 5 and 11).
6. Energy: Is used by many cards. All leftover energy is con-
verted into heat at the beginning of the production phase.
7. Heat: May be spent to raise temperature 1 step by using the
depicted action (see page 11).

`Resources are set initially.`

### CARDS

Each player starts the game with a corporation card. During the game,
players buy and play many project cards to get benefits of different kinds. The cards
are divided into active cards (blue frame, see example), automated cards (green) and
event cards (red), read more on page 10.

`At game start players (type PlayerType) are set with a corporation card (type GameComponentType) { gameComponents: GameComponentType[] }`

1. Tag: Places the card in certain categories, which can affect or be affected by other
cards, or by the player board (e.g. you can pay with steel when playing a building tag).

`Tag (type SymbolType) is set for the corporation card (type GameComponentType) {  }`

2. Starting conditions: This tells you how much money (M€) you start with, as well
as other starting resources and production. Some corporations also have a fixed first
action described here (see example card).

`Corporate card (type GameComponentType) provides initial resources for the player (type PlayerType) { resources: ResourceType[] }`
`Corporate card (type GameComponentType) sets initial action when selected (type ActionType) as an action (type ActionType) for player (type PlayerType) { actions: ActionType[] }`

3. Effect / action: Boxes marked by a blue ribbon show an ongoing effect or action
that may be used during the game. Actions may be used only once per generation,
while effects are always active.

`Corporate card (type GameComponentType) adds to available actions for player (type PlayerType) when selected { actions: ActionType[] }`

4. Flavor text: Gives you some background information and feeling for the card.

`Flavor text is initially set to the cards (type GameComponentType) { decorator: Text | Image | SVG }`

5. Cost: This is what you pay to play the card from your hand. (To get cards into your
hand, you must first buy them during the research phase, see page 8).

`Costs are initially set to the cards (type GameComponentType) { cost: Resource[] }`

6. Requirement: Any requirement must be met in order to play the card. Some cards
require a global parameter to have reached a certain level, while others can only be
played while the parameter is still low (see example card). Some cards require that
you have certain tags or production. (Note: In order to play the card you must also be
able to perform the effects of the card, see page 9.) Note also that the requirement only
needs to be fulfilled when playing the card, not when you use it later.

`Requirements are initially set to the cards (type GameComponentType) { (requirement: SymbolType | ResourceTyp | GameComponentType | ActionType)[] }`

7. Immediate effects: Most cards affect your (or your opponent’s) resources or
production. You may also get tiles to place, or other effects.
8. VPs: Some cards give you victory points at the end of the game.
If you are uncertain of how a card works, read the text in parenthesis.
















