/**
 * @file class bot
 */
export class Bot {
    private _name: string;
    private _lat: number;
    private _lng: number;
    private _speed: number;
    private _moving: boolean = false;
    private _move_direction: 'N' | 'S' | 'E' | 'W';
    private _ticks: number = 0;
    /**
     * 
     * @param name bot's name
     */
    constructor(name: string) {
        this._name = name;
        this._speed = 100;

    }

    /**
     * starts moving in the given direction
     * @param direction N S E W
     */
    public move(direction: 'N' | 'S' | 'E' | 'W'): void {
        if (!this._moving) {
            this._move_direction = direction;
            this._moving = true;
            this._ticks = this._speed;
        }
    }

    /**
     * check if bot is mooving
     * @returns 
     */
    public check_move(): boolean | 'N' | 'S' | 'E' | 'W' {
        if (this._moving) {
            if (this._ticks > 0) {
                this._ticks--;
                return true;
            }
            this._moving = false;
            return this._move_direction;
        }
        return false;
    }

    get lat(): number {
        return this._lat;
    }
    get lng(): number {
        return this._lng;
    }

}