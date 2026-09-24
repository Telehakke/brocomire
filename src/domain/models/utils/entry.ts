import type { ValueObject } from "./valueObject";

export abstract class Entity<T extends ValueObject<unknown>> {
    protected readonly _id: T;

    constructor(id: T) {
        this._id = id;
    }

    abstract equals(other: this): boolean;
}
