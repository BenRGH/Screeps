import RolesEnum from "constants/RolesEnum";

export type IStructure = Structure & { store: GenericStoreBase } ;

export interface ICreep extends Creep { memory: CreepMemory }

export type IUnitCount = Record<RolesEnum, number>;
