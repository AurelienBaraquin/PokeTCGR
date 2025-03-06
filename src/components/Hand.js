import { Card, CardWidth, CardHeight } from './Card.js';
import { CardPile } from './CardPile.js';

export class Hand extends CardPile {
    constructor(scene, x, y, scale = 1) {
        super(scene, x, y, scale);
        this.selectedCard = null;
    }

    updateDisplay() {
        const spacingX = CardWidth() * this.scale * 0.35;
        const startX = this.x - ((this.cards.length - 1) * spacingX) / 2;

        this.cards.forEach((card, index) => {
            card.container.x = startX + index * spacingX;
            card.container.y = (card === this.selectedCard) ? this.y - 20 : this.y;
            card.container.setDepth(index);
        });
        this.updateInteractivity();
    }

    updateInteractivity() {
        this.cards.forEach(card => {
            card.updateInteractive(() => {
                if (this.selectedCard === card) {
                    this.selectedCard = null;
                } else {
                    this.selectedCard = card;
                }
                this.updateDisplay();
            });
        });
    }

    update() {
        this.updateDisplay();
        this.updateInteractivity();
    }   
}
