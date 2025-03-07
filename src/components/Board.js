import BoardSlot from './BoardSlot.js';

export class Board {
    constructor(scene, x, y, scale = 1) {
        this.scene = scene;
        this.scale = scale;
        this.slots = [];

        const spacingX = 120 * scale;
        const totalWidth = 4 * spacingX;
        const startX = x - totalWidth / 2;

        // 1 emplacement actif au-dessus
        this.activeSlot = new BoardSlot(scene, x, y, scale);
        this.slots.push(this.activeSlot);

        // 5 slots banc visibles en dessous
        for (let i = 0; i < 5; i++) {
            const slotX = startX + (i * spacingX);
            const benchSlot = new BoardSlot(scene, slotX, y + 160, scale * 0.8);
            this.slots.push(benchSlot);
        }
    }
}
