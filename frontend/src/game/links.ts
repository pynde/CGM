import { TYPE_ENUM } from "@shared/enums/enums";
import { BaseType, OwnerType } from "@shared/types/types";


type Link = {
    originType: BaseType['type'],
    originId: string,
    targets: {ids: string[], type: TYPE_ENUM}
}


// OKEI ELIKKÄ VOIS TEHÄ ABOUT NÄIN
// x.id+y.id+z.id (composite key): [x, y, z] value
// "gamecomp_123_owner_222_playarea_51" -> [gamecomp, owner, playarea]
// tai
// x.id -> [y, z] value