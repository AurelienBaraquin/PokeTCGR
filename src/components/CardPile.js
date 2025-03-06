export class CardPile {
    constructor(scene, x, y, scale = 1) {
        this.scene = scene;
        this.cards = [];
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.onClickCallback = null; // stocke la fonction de callback
    }

    addCard(card) {
        this.cards.push(card);
        this.updateDisplay();
    }

    drawCard() {
        if (this.cards.length === 0) return null;
        const card = this.cards.pop();
        this.updateDisplay();
        card.disableInteractive();
        return card;
    }

    removeCard(card) {
        const cardIndex = this.cards.indexOf(card);
        if (cardIndex !== -1) {
            card.disableInteractive();
            card.container.destroy();
            this.cards.splice(cardIndex, 1);
            this.updateDisplay();
        }
    }

    shuffle() {
        Phaser.Utils.Array.Shuffle(this.cards);
        this.updateDisplay();
    }

    updateDisplay() {
        const topCard = this.cards[this.cards.length - 1];
        this.cards.forEach((card, index) => {
            card.setVisibleDetails(card === topCard);
            card.container.x = this.x + index * 0.3;
            card.container.y = this.y - index * 0.5;
            card.container.setDepth(index);
            card.container.disableInteractive();
        });
    }

    pickSpecificCard(cardName) {
        const cardIndex = this.cards.findIndex(c => c.name === cardName);
        if (cardIndex !== -1) {
            const [card] = this.cards.splice(cardIndex, 1);
            this.updateDisplay();
            return card;
        }
        return null;
    }

    getCardCount() {
        return this.cards.length;
    }

    setInteractive(onClickCallback) {
        this.onClickCallback = onClickCallback;
        this.update();
    }

    updateInteractivity() {
        this.cards.forEach(card => card.updateInteractive(null));
    
        if (this.cards.length === 0 || !this.onClickCallback) return;
    
        const topCard = this.cards[this.cards.length - 1];
        topCard.updateInteractive(this.onClickCallback);
    }

    update() {
        this.updateDisplay();
        this.updateInteractivity();
    }
}
