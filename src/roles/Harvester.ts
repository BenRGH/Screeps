// import { Traveler } from '../Traveler';
import { orangeStroke, whiteStroke } from 'styles/PathStrokes';
import { findGoDo } from 'utils/Common';
import { IStructure } from '../Interfaces';

export default {
    run: (creep: Creep) => {
        if(creep.store.getFreeCapacity() > 0) {
            // has space
            findGoDo(
                creep,
                () => creep.room.find(FIND_SOURCES),
                orangeStroke,
                (target) => creep.harvest(target)
            );

        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure: IStructure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY);
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], whiteStroke);
                }
            }
        }
    }
}
