export function CardWidth() { return 100; }
export function CardHeight() { return 140; }

export class Card {
    constructor(scene, data, scale = 1, x = 0, y = 0) {
        const { name, hp, type, attacks, imageKey } = data;
        this.container = scene.add.container(x, y);
        this.scale = scale;
        this.data = data;

        const width = CardWidth();
        const height = CardHeight();

        this.background = scene.add.rectangle(0, 0, width, height, 0x1565C0)
            .setStrokeStyle(5, 0xFFEB3B).setOrigin(0.5);

        this.pokemonImage = scene.add.image(0, -36, imageKey)
            .setDisplaySize(width * 0.8, height * 0.35).setOrigin(0.5);
        this.imageBorder = scene.add.rectangle(0, -36, width * 0.8, height * 0.35)
            .setStrokeStyle(2, 0xFFFFFF).setOrigin(0.5);
        this.nameText = scene.add.text(0, 4, name, { fontSize: '8.8px', fontFamily: 'Arial', color: '#FFFFFF' }).setOrigin(0.5);
        this.infoText = scene.add.text(0, 16, `HP: ${hp} | Type: ${type}`, { fontSize: '6.4px', fontFamily: 'Arial', color: '#FFFFFF' }).setOrigin(0.5);
        this.attacksText = attacks.map((attack, index) => scene.add.text(0, 28 + index * 8, `${attack.name}: ${attack.damage}`, { fontSize: '6px', fontFamily: 'Arial', color: '#FFEE58' }).setOrigin(0.5));

        this.container.add([this.background, this.imageBorder, this.pokemonImage, this.nameText, this.infoText, ...this.attacksText]);
        this.container.setScale(scale);
    }

    setVisibleDetails(visible) {
        this.pokemonImage.setVisible(visible);
        this.imageBorder.setVisible(visible);
        this.nameText.setVisible(visible);
        this.infoText.setVisible(visible);
        this.attacksText.forEach(text => text.setVisible(visible));
    }

    setInteractive(callbacks) {
        this.container.setSize(CardWidth(), CardHeight()).setInteractive({ useHandCursor: true });
        this.container.on('pointerdown', callbacks.onClick);
        this.container.on('pointerover', callbacks.onHover);
        this.container.on('pointerout', callbacks.onOut);
    }

    resetInteractive() {
        this.container.disableInteractive().removeAllListeners();
    }

    setHoverEffect(enabled) {
        this.container.setScale(enabled ? this.scale * 1.4 : this.scale);
    }

    setSelectedEffect(enabled) {
        this.container.y += enabled ? -20 : 20;
    }
}
