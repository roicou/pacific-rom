/**
 * @file contains Board class
 * @author Roi C.
 */
import { Bot } from './bot.class';
import { Field } from './field.class';
export class Board {
    /** size */
    private _size: number;
    /** board */
    private _board: Field[][];
    private _tick: NodeJS.Timeout;
    private _cracken = 0;

    /**
     * 
     * @param size size of the board [size x size]
     */
    constructor(size: number) {
        this._size = size;
        this.createBoard();
        this.tick();
    }

    get size(): number {
        return this._size;
    }

    public field(lat: number, lng: number): Field {
        return this._board[lat][lng];
    }

    /**
     * Create the board with the given size
     */
    private createBoard(): void {
        this._board = [];
        for (let lat: number = 0; lat < this._size; lat++) {
            this._board.push([]);
            for (let lng: number = 0; lng < this._size; lng++) {
                this._board[lat][lng] = new Field(lat, lng, this);
            }
        }
        for (let lat: number = 0; lat < this._size; lat++) {
            for (let lng: number = 0; lng < this._size; lng++) {
                if (this._board[lat][lng].type === "water") {
                    let water = 0;
                    if (lat > 0) {
                        if (this._board[lat - 1][lng].type === 'water') {
                            water++;
                        }
                    }
                    if (lat < this._size - 1) {
                        if (this._board[lat + 1][lng].type === 'water') {
                            water++;
                        }
                    }
                    if (lng > 0) {
                        if (this._board[lat][lng - 1].type === 'water') {
                            water++;
                        }
                    }
                    if (lng < this._size - 1) {
                        if (this._board[lat][lng + 1].type === 'water') {
                            water++;
                        }
                    }
                    if (water <= 1) {
                        this._board[lat][lng].changeType();
                    }
                }
            }
        }

    }
    /**
     * gets the terrain type of the given direction (up or left)
     * @param lat 
     * @param lng 
     * @param direction "up" | "left"
     * @returns 
     */
    public getTerrainType(lat: number, lng: number, direction: string): "water" | "earth" {
        switch (direction) {
            case "up":
                if (lat > 0) {
                    return this._board[lat - 1][lng].type;
                }
                break;
            case "left":
                if (lng > 0) {
                    return this._board[lat][lng - 1].type;
                }

        }
        return null;
    }
    
    /**
     * adds a bot to the board
     * @param bot 
     */
    public addBot(bot: Bot) {
        while (true) {
            let lat: number = Math.floor(Math.random() * this._size);
            let lng: number = Math.floor(Math.random() * this._size);
            if (!this.field(lat, lng).bot && this.field(lat, lng).type === 'water') {
                this.field(lat, lng).bot = bot;
                break;
            }
        }

    }
    /**
     * Game over
     */
    public kill(): void {
        if (this._tick) {
            clearInterval(this._tick);
        }
    }
    /**
     * The main method of the game. Is the interval and contains the logic of the game
     */
    private tick(): void {
        // loop all the fields
        this._tick = setInterval(() => {
            if (this._cracken) {
                this._cracken--;
            } else if (Math.random() < 0.001) {
                console.log("Cracken!");
                while (!this._cracken) {
                    // random lat and lng
                    let lat: number = Math.floor(Math.random() * this._size);
                    let lng: number = Math.floor(Math.random() * this._size);
                    if (this.field(lat, lng).type === 'water') {
                        // if there is a bot
                        if (this.field(lat, lng).bot) {
                            this.field(lat, lng).bot = null;
                        }
                        this.field(lat, lng).set_cracken();
                        this._cracken = 300;
                    }
                }
            }
            let bots_checked: Bot[] = [];
            for (let lat: number = 0; lat < this._size; lat++) {
                for (let lng: number = 0; lng < this._size; lng++) {
                    // if there cracken
                    if (this.field(lat, lng).cracken && !this._cracken) {
                        this.field(lat, lng).retire_cracken();
                    }
                    // if here is a bot
                    const bot: Bot = this.field(lat, lng).bot;
                    if (bot && !bots_checked.includes(bot)) {
                        let bot_move = bot.check_move();
                        if (bot_move) {
                            switch (bot_move) {
                                case "N":
                                    this.field(lat - 1, lng).bot = this.field(lat, lng).bot;
                                    this.field(lat, lng).bot = null;
                                    break;
                                case "S":
                                    this.field(lat + 1, lng).bot = this.field(lat, lng).bot;
                                    this.field(lat, lng).bot = null;
                                    break;
                                case "E":
                                    this.field(lat, lng + 1).bot = this.field(lat, lng).bot;
                                    this.field(lat, lng).bot = null;
                                    break;
                                case "W":
                                    this.field(lat, lng - 1).bot = this.field(lat, lng).bot;
                                    this.field(lat, lng).bot = null;
                                    break;
                            }
                        } else {
                            // try to move bot position
                            let move: boolean = false;
                            while (!move) {
                                let random: number = Math.random();
                                if (random < 0.25) {
                                    if (lat > 0 && !this.field(lat - 1, lng).bot && this.field(lat - 1, lng).type === "water") {
                                        console.log("");
                                        console.log("N ->", lat + ", " + lng, " -> ", lat - 1 + "," + (lng));
                                        bot.move("N");
                                        move = true;
                                    }
                                } else if (random < 0.5) {
                                    if (lng > 0 && !this.field(lat, lng - 1).bot && this.field(lat, lng - 1).type === "water") {
                                        console.log("");
                                        console.log("W ->", lat + ", " + lng, " -> ", lat + "," + (lng - 1));
                                        bot.move("W");
                                        move = true;
                                    }
                                } else if (random < 0.75) {
                                    if (lat < this._size - 1 && !this.field(lat + 1, lng).bot && this.field(lat + 1, lng).type === "water") {
                                        console.log("");
                                        console.log("S ->", lat + ", " + lng, " -> ", (lat + 1) + "," + (lng));
                                        bot.move("S");
                                        move = true;
                                    }
                                } else if (random < 1) {
                                    if (lng < this._size - 1 && !this.field(lat, lng + 1).bot && this.field(lat, lng + 1).type === "water") {
                                        console.log("");
                                        console.log("E ->", lat + ", " + lng, " -> ", lat + "," + (lng + 1));
                                        bot.move("E");
                                        move = true;
                                    }
                                }
                            }
                        }
                        bots_checked.push(this.field(lat, lng).bot);

                    }
                }
            }
        }, 10);
    }
}