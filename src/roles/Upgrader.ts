import {ICreep} from '../Interfaces'
import { whiteStroke, orangeStroke } from '../styles/PathStrokes';

export default {
    run: (creep: ICreep) => {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.working && creep.room.controller !== undefined) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, whiteStroke);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], orangeStroke);
            }
        }
    }
}
