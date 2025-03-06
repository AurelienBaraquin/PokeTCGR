import { Card, CardWidth, CardHeight } from './Card.js';

export class Hand {
    constructor(scene, x, y, scale = 1) {
        this.scene = scene;
        this.cards = [];
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    addCard(card) {
        this.cards.push(card);
        this.updateDisplay();
    }

    removeCard(card) {
        const cardIndex = this.cards.indexOf(card);
        if (cardIndex !== -1) {
            this.cards.splice(cardIndex, 1);
            this.updateDisplay();
            return card;
        }
        return null;
    }

    updateDisplay() {
        const spacingX = CardWidth() * this.scale * 0.3;
        const startX = this.x - ((this.cards.length - 1) * spacingX) / 2;

        this.cards.forEach((card, index) => {
            card.container.x = startX + index * spacingX;
            card.container.y = this.y;
            card.container.setDepth(index);
        });
    }
}
