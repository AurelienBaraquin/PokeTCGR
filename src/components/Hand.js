import { CardPile } from './CardPile.js';
import { CardWidth } from './Card.js';

export class Hand extends CardPile {
    constructor(scene, x, y, scale = 1) {
        super(scene, x, y, scale);
        this.selectedCard = null;
        this.hoveredCard = null;
    }

    updateDisplay() {
        const spacingX = CardWidth() * this.scale * 0.3;
        const totalWidth = (this.cards.length - 1) * spacingX;
        const startX = this.x - totalWidth / 2;

        this.cards.forEach((card, index) => {
            card.container.x = startX + index * spacingX;
            card.container.y = this.y;
            card.container.setScale(this.scale);
            card.container.setDepth(index);
            card.setVisibleDetails(true);
        });

        if (this.selectedCard) {
            this.selectedCard.setSelectedEffect(true);
        }
    }

    handleCardClick(card) {
        if (this.selectedCard && this.selectedCard !== card) {
            this.selectedCard.setSelectedEffect(false);
        }
        if (this.selectedCard === card) {
            card.setSelectedEffect(false);
            this.selectedCard = null;
        } else {
            this.selectedCard = card;
            card.setSelectedEffect(true);
        }
    }

    handleCardHover(card) {
        if (card !== this.hoveredCard) {
            card.setHoverEffect(true);
            card.container.setDepth(this.cards.length);
            this.hoveredCard = card;
        }
    }

    handleCardOut(card) {
        card.setHoverEffect(false);
        card.container.setDepth(this.cards.indexOf(card));
        this.hoveredCard = null;
    }

    update() {
        this.updateDisplay();
        this.updateInteractivity();
    }
}
