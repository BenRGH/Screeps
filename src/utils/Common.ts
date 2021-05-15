import { IUnitCount } from 'Interfaces';
import { IStyle } from 'styles/PathStrokes';
import RolesEnum from '../constants/RolesEnum';

// Commonly used util functions here
// I.e. stuff that makes things easier

export function spawn(spawner: string, role: RolesEnum, parts: Array<BodyPartConstant>) {
    const newName = role + Game.time;

    const res = Game.spawns[spawner].spawnCreep(
        parts,
        newName,
        { memory: { role } as CreepMemory }
    );

    if (res === OK)
        console.log(`Spawning at ${spawner}: ${newName}`);
}

export function logSpawning() {
    for (const s in Game.spawns) {
        const spawn: StructureSpawn = Game.spawns[s];

        if(spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            Game.spawns[spawn.name].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}

// TODO move to new file
export function maintainUnitCount(currentUnitCount: IUnitCount, desiredUnitCount: Readonly<IUnitCount>) {
    let logHarvesterCount: string = `Harvesters: ${currentUnitCount.harvester}`;
    let logUpgraderCount: string = `\nUpgraders: ${currentUnitCount.upgrader}`;
    let logBuilderCount: string = `\nBuilders: ${currentUnitCount.builder}`;

    // ! ORDER THESE BASED ON IMPORTANCE
	// TODO refine spawner name choosing
	if(currentUnitCount.harvester < desiredUnitCount.harvester) {
		spawn('SwampKingdom', RolesEnum.Harvester, [WORK,CARRY,MOVE]);
        logHarvesterCount += '+';
	} else if(currentUnitCount.upgrader < desiredUnitCount.upgrader) {
		spawn('SwampKingdom', RolesEnum.Upgrader, [WORK,CARRY,MOVE]);
        logUpgraderCount += '+';
	} else if(currentUnitCount.builder < desiredUnitCount.builder) {
		spawn('SwampKingdom', RolesEnum.Builder, [WORK,CARRY,MOVE]);
        logBuilderCount += '+';
	}

    console.log(logHarvesterCount + logUpgraderCount + logBuilderCount);
	logSpawning();
}

export function randomNumber(min: number, max: number): number {
    const r = Math.random() * (max-min) + min;
    return Math.floor(r);
}

/**
 * Finds places with given function, goes to one of those places and then invokes do function.
 * @param creep The given creep
 * @param findFn Function to find places or structures
 * @param goStyle Style object to use in move function
 * @param doFn Function to call on found place or structure
 */
export function findGoDo(creep: Creep, findFn: ()=>Array<any>, goStyle: IStyle, doFn: (target: any)=> ScreepsReturnCode) {
    const targets = findFn();

    const target = targets[0]; // TODO optimise

    const res = doFn(target);

    if(res === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, goStyle);
    }
}
