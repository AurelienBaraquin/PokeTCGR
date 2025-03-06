import { Card, CardWidth, CardHeight } from './Card.js';
import { CardPile } from './CardPile.js';

export class Hand extends CardPile {
    updateDisplay() {
        const spacingX = CardWidth() * this.scale * 0.3;
        const startX = this.x - ((this.cards.length - 1) * spacingX) / 2;

        this.cards.forEach((card, index) => {
            card.container.x = startX + index * spacingX;
            card.container.y = this.y;
            card.container.setDepth(index);
        });
    }

    updateInteractivity() {
        this.cards.forEach(card => {
            card.updateInteractive(() => {
                this.removeCard(card);
            });
        });
    }

    update() {
        this.updateDisplay();
        this.updateInteractivity();
    }   
}
