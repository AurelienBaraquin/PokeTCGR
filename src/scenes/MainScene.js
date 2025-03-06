import { Card } from '../components/Card.js';
import { Deck } from '../components/Deck.js';
import { Hand } from '../components/Hand.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('dracofeu', 'assets/images/pokemons/dracofeu.png');
    }

    create() {
        const Dracofeu = {
            name: 'Dracofeu',
            hp: 150,
            type: 'Feu',
            attacks: [
                { name: 'Flammes', damage: 60 },
                { name: 'Souffle Feu', damage: 120 }
            ],
            imageKey: 'dracofeu'
        };

        const DracofeuX = {
            name: 'Dracofeu X',
            hp: 170,
            type: 'Dragon',
            attacks: [
                { name: 'Explosion Dragon', damage: 130 },
                { name: 'Griffe', damage: 70 }
            ],
            imageKey: 'dracofeu'
        };

        const cards = [Dracofeu, DracofeuX];
        const cardsData = [...Array(60).keys()].map(() => cards[Math.floor(Math.random() * cards.length)]);

        this.deck = new Deck(this, 640, 300, 1);
        for (let i = 0; i < cardsData.length; i++) {
            this.deck.addCard(new Card(this, cardsData[i], 1, 0, 0));
        }
        this.deck.shuffle();

        this.hand = new Hand(this, 640, 500, 1);
        this.deck.setInteractive(() => {
            const drawnCard = this.deck.drawCard();
            if (drawnCard) {
                drawnCard.disableInteractive();
                this.hand.addCard(drawnCard);
                this.hand.updateDisplay();
            }
        });        
    }
}
