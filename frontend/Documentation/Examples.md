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
`Ocean tile triggers effect (type EffectType) when it is played`





