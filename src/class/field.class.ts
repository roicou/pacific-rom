/**
 * @file contains Field class
 * @author Roi C.
 */
import { Board } from './board.class';
import { Bullet } from './bullet.class';
import { Bot } from './bot.class';
export class Field {
    /** type of terrain: water or earth */
    private _type: "water" | "earth";
    /** board */
    private _board: Board;
    /** latitude */
    private _lat: number;
    /** longitude */
    private _lng: number;
    private _bot: Bot | null = null;
    private _bullet: Bullet | null = null;
    private _cracken: boolean = false;
    /**
     * 
     * @param lat latitude
     * @param lng longitude
     * @param board board
     */
    constructor(lat: number, lng: number, board: Board) {
        this._lat = lat;
        this._lng = lng;
        this._board = board;
        this.setType();
    }
    /** 
     * returns type of terrain 
     */
    get type(): "water" | "earth" {
        return this._type;
    }
    get bot(): Bot {
        return this._bot;
    }
    get bullet(): Bullet {
        return this._bullet;
    }

    set bot(bot: Bot) {
        this._bot = bot;
    }

    get cracken(): boolean {
        return this._cracken;
    }
    set_cracken(): void {
        this._cracken = true;
    }
    retire_cracken(): void {
        this._cracken = false;
    }
    /** 
     * set terrain type based on above's type and left's type 
     * defaults water has 90% chance
     * if above or left is earth, then earth has 40%
     */
    setType(): void {
        let up: "water" | "earth" = this._board.getTerrainType(this._lat, this._lng, "up");
        let left: "water" | "earth" = this._board.getTerrainType(this._lat, this._lng, "left");
        let water_probability: number = 0.985;
        if (up === "earth" || left === "earth") {
            water_probability = 0.4;
        }
        if (Math.random() < water_probability) {
            this._type = "water";
        } else {
            this._type = "earth";
        }
    }
    public changeType(): void {
        this._type = (this._type == "water") ? "earth" : "water";
    }



}