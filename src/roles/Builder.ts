import { ICreep } from "Interfaces";
import { getClosestTarget } from "utils/Common";
import { orangeStroke, blueStroke } from '../styles/PathStrokes';

export default {
    run: function(creep: ICreep) {

	    if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true;
	        creep.say('🚧 build');
	    }

        // TODO findGoDo
        // TODO build based on priority
	    if(creep.memory.working) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length) {
                if(creep.build(getClosestTarget(creep, targets)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(getClosestTarget(creep, targets), blueStroke);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], orangeStroke);
            }
	    }
	}
}
