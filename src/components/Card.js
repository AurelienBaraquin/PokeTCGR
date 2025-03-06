export function CardWidth() {
    return 100;
}

export function CardHeight() {
    return 140;
}

export class Card {
    /**
     * @typedef {Object} CardData
     * @property {string} name - The name of the Pokemon.
     * @property {number} hp - The HP of the Pokemon.
     * @property {string} type - The type of the Pokemon.
     * @property {Array<{name: string, damage: number}>} attacks - The attacks of the Pokemon.
     * @property {string} imageKey - The key for the Pokemon's image.
     */

    /**
     * @param {Phaser.Scene} scene - The scene to which the card belongs.
     * @param {CardData} data - The data of the card.
     * @param {number} [scale=1] - The scale of the card.
     * @param {number} [x=0] - The x position of the card.
     * @param {number} [y=0] - The y position of the card.
     */
    constructor(scene, data, scale = 1, x = 0, y = 0) {
        const { name, hp, type, attacks, imageKey } = data;
        this.container = scene.add.container(x, y);
        this.scale = scale;

        // Reference size
        const width = CardWidth();
        const height = CardHeight();

        // Pokemon image (proportionally resized)
        this.pokemonImage = scene.add.image(0, -36, imageKey)
            .setDisplaySize(width * 0.8, height * 0.35)
            .setOrigin(0.5);

        // Add border to the image
        this.imageBorder = scene.add.rectangle(0, -36, width * 0.8, height * 0.35)
            .setStrokeStyle(2, 0xFFFFFF)
            .setOrigin(0.5);

        // Pokemon name
        this.nameText = scene.add.text(0, 4, name, {
            fontSize: '8.8px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // HP & Type information
        this.infoText = scene.add.text(0, 16, `HP: ${hp} | Type: ${type}`, {
            fontSize: '6.4px',
            fontFamily: 'Arial',
            color: '#FFFFFF'
        }).setOrigin(0.5);

        // Background
        this.background = scene.add.rectangle(0, 0, width, height, 0x1565C0)
            .setStrokeStyle(5, 0xFFEB3B)
            .setOrigin(0.5);

        // Add to container
        this.container.add([this.background, this.imageBorder, this.pokemonImage, this.nameText, this.infoText]);

        // Pokemon attacks
        this.attacksText = attacks.map((attack, index) => {
            return scene.add.text(0, 28 + index * 8, `${attack.name}: ${attack.damage}`, {
            fontSize: '6px',
            fontFamily: 'Arial',
            color: '#FFEE58'
            }).setOrigin(0.5);
        });
        this.container.add(this.attacksText);
        this.container.setScale(scale);
    }

    setVisibleDetails(visible) {
        this.pokemonImage.setVisible(visible);
        this.imageBorder.setVisible(visible);
        this.nameText.setVisible(visible);
        this.infoText.setVisible(visible);
        this.attacksText.forEach(attackText => attackText.setVisible(visible));
    }

    setInteractive(callback) {
        this.container.setSize(CardWidth() * this.scale, CardHeight() * this.scale);
        this.container.setInteractive({ useHandCursor: true });
        this.container.on('pointerdown', callback);
    }
    
    disableInteractive() {
        this.container.disableInteractive();
        this.container.removeAllListeners('pointerdown');
    }    
}
