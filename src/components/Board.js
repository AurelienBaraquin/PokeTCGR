import BoardSlot from './BoardSlot.js';
import { CardPile } from './CardPile.js';

export class Board extends CardPile {
    constructor(scene, x, y, scale = 1) {
        super(scene, x, y, scale);
        this.slots = [];

        for (let i = 0; i < 6; i++) {
            const benchSlot = new BoardSlot(scene, x, y, scale);
            this.slots.push(benchSlot);
        }
    }

    updateDisplay() {
        const spacingX = 120 * this.scale;
        const totalWidth = 4 * spacingX;
        const startX = this.x - totalWidth / 2;

        this.slots[0].x = this.x;
        this.slots[0].y = this.y;
        this.slots[0].update();

        for (let i = 1; i < 6; i++) {
            this.slots[i].x = startX + ((i - 1) * spacingX);
            this.slots[i].y = this.y + 160 * this.scale;
            this.slots[i].scale = this.scale * 0.8;
            console.log(this.slots[i].x, this.slots[i].y, this.slots[i].scale);
            this.slots[i].update();
        }
    }
}
