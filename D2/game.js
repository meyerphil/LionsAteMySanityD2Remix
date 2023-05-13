class CForest extends AdventureScene {
    constructor() {
        super("c4", "Crystal Forest");
    }

    onEnter() {
    let crystal = this.add.text(this.w * 0.3, this.w * 0.3, "Crystal")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => this.showMessage("Shiny, yet deadly sharp"))
        .on('pointerdown', () => {
            this.showMessage("Owch!");
            this.shake(crystal)
        });

        let door = this.add.text(this.w * 0.5, this.w * 0.1, "🚪 Tower Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if(!(this.hasItem("Tower Key"))) {
                    this.showMessage("Locked. You'll need to find a key")
                }
                else {
                    this.showMessage("Unlocked.")
                }
            })
            .on('pointerdown', () => {
                if(this.hasItem("Tower Key")) {
                    this.gotoScene('Tower');
                }
                else {
                    this.showMessage("It's locked.")
                    this.shake(door)
                }
            })

        let west = this.add.text(this.w * 0.1, this.w * 0.15, "Go West")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You see a lake off in the distance");
            })
            .on('pointerdown', () => {
                this.gotoScene('Lake');
            })
    }
}

class Lake extends AdventureScene {
    constructor() {
        super("Lake");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "Go East")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You're done here");
            })
            .on('pointerdown', () => {
                this.gotoScene('c4');
            });

        if(!(this.hasItem('Tower Key'))) {
            let tkey = this.add.text(this.w * 0.6, this.w * 0.2, 'Rusty Key')
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage('An old, rusty key in the middle of the lake');
                })
                .on('pointerdown', () => {
                    this.showMessage('Got the tower key')
                    this.gainItem('Tower Key');
                    this.dissapear(tkey)
                });
            }
        }
}

class Tower extends AdventureScene {
    constructor() {
        super("Tower");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "Go Back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You're done here");
            })
            .on('pointerdown', () => {
                this.gotoScene('c4');
            });

            let handle = this.add.text(this.w * 0.2, this.w * 0.5, "Brass Handle")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("A rusted door handle. It looks like it goes somewhere"))
            .on('pointerdown', () => {
                this.showMessage("Got the door handle");
                this.gainItem('handle');
                this.dissapear(handle)
            });

            let door = this.add.text(this.w * 0.5, this.w * 0.1, "🚪 Staircase Door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if(!(this.hasItem("handle"))) {
                    this.showMessage("It's missing a handle. Maybe it's around here somewhere")
                }
                else {
                    this.showMessage("The handle fits perfectly")
                }
            })
            .on('pointerdown', () => {
                if(this.hasItem("handle")) {
                    this.gotoScene('Wizard');
                }
                else {
                    this.showMessage("There's no handle.")
                    this.shake(door)
                }
            })
        }
}

class Wizard extends AdventureScene {
    constructor() {
        super("Wizard");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "Go Back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You're done here");
            })
            .on('pointerdown', () => {
                this.gotoScene('Tower');
            });

            let ball = this.add.text(this.w * 0.3, this.w * 0.4, "Crystal Ball")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Your father's crystal ball, and the reason you came here."))
            .on('pointerdown', () => {
                this.showMessage("Got the crystal ball");
                this.gainItem('ball');
                this.dissapear(ball)
                this.gotoScene('Outro');
            });
        }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "You awaken in a forest of frozen trees.\nA tower looms in front of you, containing your ultimate goal:\nyour father's crystal ball").setFontSize(50);
        this.add.text(50,250, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('c4'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "You hurry out of the tower with the ball to present it to your father.").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, CForest, Lake, Tower, Wizard, Outro],
    title: "Adventure Game",
});

