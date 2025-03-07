export class BoardSlot {
    constructor(scene, x, y, scale = 1) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.card = null;

        this.placeholder = scene.add.rectangle(x, y, 100 * scale, 140 * scale, 0x228B22, 0.5)
            .setStrokeStyle(3, 0xFFFFFF)
            .setOrigin(0.5);

        this.placeholder.setInteractive({ useHandCursor: true });
    }

    isEmpty() {
        return this.card === null;
    }

    placeCard(card) {
        if (this.isEmpty()) {
            this.card = card;
            card.container.x = this.x;
            card.container.y = this.y;
            card.container.setScale(this.scale);
            card.resetInteractive();
            card.setVisibleDetails(true);
        }
    }
}

export default BoardSlot;
