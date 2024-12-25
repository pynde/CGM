# Action Designer examples

## Terraforming Mars

### Game overview

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

`Turns (type Turn) are set to "max 2" when GameState { mode = GAME_STATE_MODE }`

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


### Global parameters

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
`actionPipe: increaseTrack; E.g. Terraform rating is increased the amount of parent Action`
`actionPipe: Finish`

### Game board

1. Terraform rating (TR) track: All players start at 20. This is your basic income (see pages 6 and 8) and VPs. You increase it every time you terraform.

`Terraform rating (type Track) value (20) is set as a default value for when GameState { mode } is set to any GAME_STATE_MODE enum.`

2. Generation track: The generation marker measures time (rounds) and starts at 1, moving up on the TR track.

`Generation track (type Track) value (1) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

3. Solo games: Solo games start with a TR of 14, and end after generation 14.

`Terraform rating (type Track) value (14) is set as a default value when GameState { mode = GAME_STATE_MODE.SOLO }.`

4. Oxygen: This global parameter starts at 0%. This percentage compares to Earth’s 21% oxygen.

`Oxygen (type Track) value is set as a default value when GameState { mode = GAME_STATE_MODE }.`

5. Ocean tiles: This global parameter starts with 9 tiles in a stack here, to be placed on the board during the game.

`Ocean tiles (type Stack) value (9) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

6. Temperature: This global parameter (mean temperature at the equator) starts at -30 ˚C.

`Temperature (type Track) value (-30) is set as a default value when GameState { mode = GAME_STATE_MODE }.`

7. Bonus steps: If you raise the parameter to this point, you also get the attached bonus.

`Bonus steps (type Track) value is set as a default value when GameState { mode = GAME_STATE_MODE }.`

8. Standard Projects: May be used by any player regardless of what cards you have. See page 10.

`Standard Projects (type Space) value is set to the predefined standard project options when GameState { mode = GAME_STATE_MODE }.`

9. Milestones / Awards: Can be a good source of extra VPs. See pages 10 and 11.

`Milestones / Awards (type Achievement) value is set to the predefined milestone and award options when GameState { mode = GAME_STATE_MODE }.`

10. Placement bonuses: When placing a tile on an area with a placement bonus, you get the printed resources or cards. See page 5.

`Placement bonuses (type Resource) value is set to the predefined placement bonus options when GameState { mode = GAME_STATE_MODE }.`

11. Ocean-reserved areas: Blue areas are reserved for ocean tiles; ocean tiles may only be placed here, and no other tile may be placed here.

`Ocean-reserved areas (type Space) value is set to the predefined areas (type Space) where only ocean tiles can be placed when GameState { mode = GAME_STATE_MODE }.`

12. Special reserved areas: 3 areas are reserved for specific cities. No other tiles may be placed there.

`Special reserved areas (type Space) value is set to the predefined city-specific reserved areas (type Space) when GameState { mode = GAME_STATE_MODE }.`
