// import { Traveler } from '../Traveler';
import { orangeStroke, whiteStroke } from 'styles/PathStrokes';
import { findGoDo } from 'utils/Common';
import { ICreep, IStructure } from '../Interfaces';

export default {
    run: (creep: ICreep) => {
        if(creep.store.getFreeCapacity() > 0) {
            // has space
            findGoDo(
                creep,
                () => creep.room.find(FIND_SOURCES),
                orangeStroke,
                (target) => creep.harvest(target)
            );

        } else {
            // creep is full
            findGoDo(
                creep,
                () => creep.room.find(FIND_STRUCTURES, {
                    filter: (structure: IStructure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY);
                    }
                }), // TODO ruin
                whiteStroke,
                (target) => creep.transfer(target, RESOURCE_ENERGY)
            );
        }
    }
}
