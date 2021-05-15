import { ErrorMapper } from 'utils/ErrorMapper';
// import { Traveler } from './Traveler';
// ! it will save memory to use either travelTo() or moveTo() with a given creep, but not both.
// creep.moveTo(myDestination);
// creep.travelTo(myDestination);
import RolesEnum from './constants/RolesEnum';
import Harvester from './roles/Harvester';
import Upgrader from 'roles/Upgrader';
import Builder from "roles/Builder";
import { maintainUnitCount } from "utils/Common";
import { IUnitCount } from "Interfaces";

// #region declarations
declare global {
	/*
		Example types, expand on these or remove them and add your own.
		Note: Values, properties defined here do no fully *exist* by this type definiton alone.
					You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

		Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
		Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
	*/
	// Memory extension samples
	interface Memory {
		uuid: number;
		log: any;
	}

	interface CreepMemory {
		role: RolesEnum;
		room: string;
		working: boolean;
	}

	// Syntax for adding proprties to `global` (ex "global.log")
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface Global {
			log: any;
		}
	}
}
// #endregion

export const loop = ErrorMapper.wrapLoop(() => {
	// #region Globals
	let currentUnitCount: IUnitCount = {
		[RolesEnum.Harvester]: 0,
		[RolesEnum.Builder]: 0,
		[RolesEnum.Upgrader]: 0,
	};

	const desiredUnitCount: Readonly<IUnitCount> = {
		[RolesEnum.Harvester]: 4,
		[RolesEnum.Builder]: 4,
		[RolesEnum.Upgrader]: 2,
	}
	// #endregion

	// #region Cleanup
	// Automatically delete memory of missing creeps
	for (const name in Memory.creeps) {
		if (!(name in Game.creeps)) {
			delete Memory.creeps[name];
		}
	}
	// #endregion

	// #region Main

	for(const name in Game.creeps) {
		const creep = Game.creeps[name];

		switch (creep.memory.role) {
			case RolesEnum.Harvester:
				// add to current count
				currentUnitCount[RolesEnum.Harvester] += 1;

				// Run unit code
				Harvester.run(creep);
				break;

			case RolesEnum.Upgrader:
				// add to current count
				currentUnitCount[RolesEnum.Upgrader] += 1;

				// Run unit code
				Upgrader.run(creep);
				break;

			case RolesEnum.Builder:
				// add to current count
				currentUnitCount[RolesEnum.Builder] += 1;

				// Run unit code
				Builder.run(creep);
				break;

			default:
				break;
		}
	}

	// TODO tower stuff
	// if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

	// Maintain unit count
	maintainUnitCount(currentUnitCount, desiredUnitCount);

	// #endregion


});
