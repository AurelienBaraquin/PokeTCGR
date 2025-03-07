export class CardPile {
    constructor(scene, x, y, scale = 1) {
        this.scene = scene;
        this.cards = [];
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    addCard(card) {
        this.cards.push(card);
        this.update();
    }

    drawCard() {
        const card = this.cards.pop();
        if (card) card.resetInteractive();
        this.update();
        return card;
    }

    shuffle() {
        Phaser.Utils.Array.Shuffle(this.cards);
        this.update();
    }

    update() {
        this.updateDisplay();
        this.updateInteractivity();
    }

    updateDisplay() {
        this.cards.forEach((card, index) => {
            card.setVisibleDetails(index === this.cards.length - 1);
            card.container.x = this.x + index * 0.3;
            card.container.y = this.y - index * 0.5;
            card.container.setDepth(index);
        });
    }

    updateInteractivity() {
        this.cards.forEach(card => {
            card.resetInteractive();

            card.setInteractive({
                onClick: () => this.handleCardClick(card),
                onHover: () => this.handleCardHover(card),
                onOut: () => this.handleCardOut(card)
            });
        });
    }

    handleCardClick(card) {
    }

    handleCardHover(card) {
    }

    handleCardOut(card) {
    }
}
