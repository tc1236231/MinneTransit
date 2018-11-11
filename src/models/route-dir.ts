export class RouteDir {
    route : string // route number or name (for rapid transit lines & Northstar); no terminal letter
    direction : string // Cardinal direction in all caps, e.g. "WESTBOUND"

    constructor(route, dir)
    {
        this.route = route;
        this.direction = dir;
    }

    public toString(): string {
        return this.route + ' ' + this.direction;
    }

    public equals(other : RouteDir): boolean {
        if(this.route == other.route && this.direction == other.direction)
            return true;
        else
            return false;
    }
}