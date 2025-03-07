import { Card } from '../components/Card.js';
import { Deck } from '../components/Deck.js';
import { Hand } from '../components/Hand.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('dracofeu', 'assets/images/pokemons/dracofeu.png');
        this.load.image('tortank', 'assets/images/pokemons/tortank.png');
    }

    create() {
        const pokemonTypes = [
            {
            name: 'Dracofeu', hp: 150, type: 'Feu',
            attacks: [{ name: 'Flammes', damage: 60 }, { name: 'Déflagration', damage: 80 }],
            imageKey: 'dracofeu'
            },
            {
            name: 'Tortank', hp: 150, type: 'Eau',
            attacks: [{ name: 'Hydrocanon', damage: 60 }],
            imageKey: 'tortank'
            }
        ];

        const cardsData = [];
        for (let i = 0; i < 60; i++) {
            const randomPokemon = pokemonTypes[Math.floor(Math.random() * pokemonTypes.length)];
            cardsData.push({ ...randomPokemon });
        }
    
        this.deck = new Deck(this, 640, 300);
        cardsData.forEach(data => this.deck.addCard(new Card(this, data)));
        this.deck.shuffle();
    
        this.hand = new Hand(this, 640, 500);
        this.deck.updateInteractivity = () => {
            const topCard = this.deck.cards.at(-1);
            topCard?.setInteractive({ onClick: () => {
                const card = this.deck.drawCard();
                if (card) {
                    this.hand.addCard(card);
                    this.hand.update();
                }
            }, onHover: () => {}, onOut: () => {} });
        };
        this.deck.update();
        this.hand.update();
    }    
}
