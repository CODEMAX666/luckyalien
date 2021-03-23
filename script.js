// Alien
// Game obj
let game = {
  jumpHeight: 700,
  carrot: false,
  checkpoint: [200, 1100],
  bounceMagic: false
};

// Stats obj
let stats = {
  coins: 0
}

// SFX obj
let sfx = {};

// Preload
function preload() {
  // Load images
  // Background
  this.load.image("background", "assets/imgs/background0.png");

  // Grass block
  this.load.image("grassBlock", "assets/imgs/grassBlock.png");

  // Stone block
  this.load.image("stoneBlock", "assets/imgs/stoneBlock.png");

  // Mushroom
  this.load.image("mushroom", "assets/imgs/mushroom.png");

  // Coin stat
  this.load.image("coinStat", "assets/imgs/coinStat.png");

  // Coin stat
  this.load.image("carrot", "assets/imgs/carrot.png");

  // InactiveBox
  this.load.image("inactiveBox", "assets/imgs/inactiveBox.png");

  // ActiveBox
  this.load.image("activeBox", "assets/imgs/activeBox.png");

  // CarrotPowerup
  this.load.image("carrotPowerup", "assets/imgs/carrotPowerup.png");

  // MuhshroomPowerup
  this.load.image("mushroomPowerup", "assets/imgs/mushroomPowerup.png");

  // House
  this.load.image("house", "assets/imgs/house.png");

  // Numbers
  this.load.image("0", "assets/imgs/0.png");
  this.load.image("1", "assets/imgs/1.png");
  this.load.image("2", "assets/imgs/2.png");
  this.load.image("3", "assets/imgs/3.png");
  this.load.image("4", "assets/imgs/4.png");
  this.load.image("5", "assets/imgs/5.png");
  this.load.image("6", "assets/imgs/6.png");
  this.load.image("7", "assets/imgs/7.png");
  this.load.image("8", "assets/imgs/8.png");
  this.load.image("9", "assets/imgs/9.png");

  // Clouds
  this.load.image("cloud0", "assets/imgs/cloud0.png");
  this.load.image("cloud1", "assets/imgs/cloud1.png");
  this.load.image("cloud2", "assets/imgs/cloud2.png");

  // Spritesheets
  // Player frames
  this.load.image("player", "assets/imgs/player.png");
  this.load.image("playerWalk0", "assets/imgs/playerWalk0.png");
  this.load.image("playerWalk1", "assets/imgs/playerWalk1.png");
  this.load.image("playerWalk2", "assets/imgs/playerWalk2.png");

  // Coin frames
  this.load.image("coin0", "assets/imgs/coin0.png");
  this.load.image("coin1", "assets/imgs/coin1.png");
  this.load.image("coin2", "assets/imgs/coin2.png");
  this.load.image("coin3", "assets/imgs/coin3.png");

  // Spike frames
  this.load.image("spike0", "assets/imgs/spikeBall0.png");
  this.load.image("spike1", "assets/imgs/spikeBall1.png");

  // Spring frames
  this.load.image("spring0", "assets/imgs/spring0.png");
  this.load.image("spring1", "assets/imgs/spring1.png");

  // Spider frames
  this.load.image("spider0", "assets/imgs/spider0.png");
  this.load.image("spider1", "assets/imgs/spider1.png");

  // Flag frames
  this.load.image("flagDown", "assets/imgs/flagDown.png");
  this.load.image("flagMove0", "assets/imgs/flagMove0.png");
  this.load.image("flagMove1", "assets/imgs/flagMove1.png");

  // SFX
  // Background
  this.load.audio("background", "assets/sfx/background.mp3");

  // Jump
  this.load.audio("jump", "assets/sfx/jump.ogg");

  // Mushroom jump
  this.load.audio("mushroom", "assets/sfx/mushroom.ogg");

  // Coin
  this.load.audio("coin", "assets/sfx/coin.wav");

  // Carrot
  this.load.audio("carrot", "assets/sfx/carrot.ogg");

  // Explosion
  this.load.audio("explosion", "assets/sfx/explosion.wav");

  // Box
  this.load.audio("box", "assets/sfx/box.ogg");

  // CarrotPowerup
  this.load.audio("powerup", "assets/sfx/powerup.ogg");

  // Die
  this.load.audio("die", "assets/sfx/die.mp3");

  // Checkpoint
  this.load.audio("checkpoint", "assets/sfx/checkpoint.wav");
}

// Create
function create() {
  // SFX
  sfx.background = this.sound.add("background");
  sfx.jump = this.sound.add("jump");
  sfx.mushroom = this.sound.add("mushroom");
  sfx.coin = this.sound.add("coin");
  sfx.carrot = this.sound.add("carrot");
  sfx.explosion = this.sound.add("explosion");
  sfx.box = this.sound.add("box");
  sfx.powerup = this.sound.add("powerup");
  sfx.die = this.sound.add("die");
  sfx.checkpoint = this.sound.add("checkpoint");

  // Loop music
  sfx.background.setLoop(true);

  // Play music
  sfx.background.play();

  // Create background
  for (var i = 0; i < 8; i++) {
    if (i < 3) {
      this.add.image(i * 1024, 900, "background");
    } else {
      this.add.image(i * 1024, 900, "background");
    }
  }

  // Create clouds
  game.clouds = this.physics.add.staticGroup();
  for (var i = 0; i < 10; i++) {
    game.clouds.create(Math.random() * 6000, Math.random() * 500, `cloud${Math.round(Math.random() * 2)}`)
  }

  // House
  game.house = this.physics.add.staticSprite(150, 1000, "house").setScale(2).setSize(246, 246).setOffset(-50, -20);

  // Player
  game.player = this.physics.add.sprite(200, 1100, "player").setScale(0.8);

  this.physics.add.collider(game.player, game.house);

  // Camera
  this.cameras.main.setBounds(0, 0, 6000, config.height + 500);
  this.physics.world.setBounds(0, 0, 6000, config.height + 500);
  this.cameras.main.startFollow(game.player, true, 0.1, 0.1);

  // Number stats
  game.coinNumbers = this.physics.add.staticGroup();
  game.carrotNumbers = this.physics.add.staticGroup();

  // Bounds
  game.player.setCollideWorldBounds(true);

  // Input
  game.cursors = this.input.keyboard.createCursorKeys();

  // Blocks
  game.blocks = this.physics.add.staticGroup();

  // Create blocks
  for (var x = 0; x < world.blocks.length; x++) {
    game.blocks.create(world.blocks[x][0], world.blocks[x][1], world.blocks[x][2]).setScale(0.3).setSize(40, 39).setOffset(44, 44);
  }

  // Collider, Player, Block
  this.physics.add.collider(game.player, game.blocks);

  // Coins
  game.coins = this.physics.add.group();

  // Collider Block, Coin
  this.physics.add.collider(game.blocks, game.coins);

  // Collider Player, Coin
  this.physics.add.overlap(game.player, game.coins, function(player, coin) {
    // SFX
    sfx.coin.play();

    // Add to coins
    stats.coins++;

    // Update stat
    game.coinNumbers.getChildren().forEach(num => {
      num.destroy();
    });

    for (var i = 0; i < stats.coins.toString().split("").length; i++) {
      game.coinNumbers.create(90 + i * 28, 40, stats.coins.toString().split("")[i]).setScrollFactor(0);
    }

    // Destroy
    coin.destroy();
  });

  // Coin stat
  game.coinStat = this.physics.add.staticSprite(40, 40, "coinStat").setScale(0.7).setScrollFactor(0);
  for (var i = 0; i < stats.coins.toString().split("").length; i++) {
    game.coinNumbers.create(90 + i * 28, 40, stats.coins.toString().split("")[i]).setScrollFactor(0);
  }

  // Mushrooms
  game.mushrooms = this.physics.add.staticGroup();

  // Create mushrooms
  for (var x = 0; x < world.mushrooms.length; x++) {
    game.mushrooms.create(world.mushrooms[x][0], world.mushrooms[x][1], "mushroom").setScale(1).setSize(80, 75).setOffset(0, 5).setCollideWorldBounds(true);
  }

  // Collider Player, Mushroom
  this.physics.add.collider(game.player, game.mushrooms, function(player, mushroom) {
    if (player.body.touching.down && mushroom.body.touching.up && game.bounceMagic) {
      // SFX
      sfx.mushroom.play();

      // Bounce
      game.player.setVelocityY(-1050);
    }
  });

  // Boxes
  game.boxes = this.physics.add.staticGroup();

  // Create boxes
  for (var x = 0; x < world.boxes.length; x++) {
    let box = game.boxes.create(world.boxes[x][0], world.boxes[x][1], "activeBox");
    box.setScale(0.3).setSize(40, 39).setOffset(45, 45);
    box.active = true;
    box.entity = world.boxes[x][2];
  }

  // Collider Player, Box
  this.physics.add.collider(game.player, game.boxes, function(player, box) {
    if (player.body.touching.up && box.body.touching.down) {
      if (box.active) {
        // SFX
        sfx.box.play();

        // Box
        box.setTexture("inactiveBox");
        box.active = false;

        if (box.entity === "coin") {
          // Create coin
          game.coins.create(box.x, box.y - 30, "coin0").setCollideWorldBounds(true).setScale(0.4).setVelocityY(-500);
        } else if (box.entity === "carrotPowerup") {
          // Create carrotPowerup
          game.carrotPowerup.create(box.x, box.y - 30, "carrotPowerup").setCollideWorldBounds(true).setScale(0.5).setVelocityY(-500);
        } else {
          // Create mushroomPowerup
          game.mushroomPowerup.create(box.x, box.y - 30, "mushroomPowerup").setCollideWorldBounds(true).setScale(0.8).setVelocityY(-500);
        }
      }
    }
  });

  // Collider Coin, Box
  this.physics.add.collider(game.coins, game.boxes);

  // Carrots
  game.carrots = this.physics.add.group();

  // Collider Carrot, Block
  this.physics.add.collider(game.carrots, game.blocks, function(carrot, platform) {
    carrot.destroy();
  });

  // Collider Carrot, Mushroom
  this.physics.add.collider(game.carrots, game.mushrooms, function(carrot, mushroom) {
    carrot.destroy();
  });

  // Collider Carrot, Box
  this.physics.add.collider(game.carrots, game.boxes, function(carrot, box) {
    carrot.destroy();
  });

  // Collider Carrot, Coin
  this.physics.add.collider(game.carrots, game.coins, function(carrot, coin) {
    // SFX
    sfx.coin.play();

    // Add to coins
    stats.coins++;

    // Update stat
    game.coinNumbers.getChildren().forEach(num => {
      num.destroy();
    });

    for (var i = 0; i < stats.coins.toString().split("").length; i++) {
      game.coinNumbers.create(90, 40, stats.coins.toString().split("")[i]);
    }

    // Destroy
    coin.destroy();
    carrot.destroy();
  });

  // Spikes
  game.spikes = this.physics.add.group();

  // Create spikes
  for (var x = 0; x < world.spikes.length; x++) {
    spike = game.spikes.create(world.spikes[x][0], world.spikes[x][1], "spike0").setCollideWorldBounds(true).setScale(0.4);
    spike.dir = ["R", "L"][x];
    if (spike.dir === "R") {
      spike.vel = 200;
    } else {
      spike.vel = -200;
    }
  }

  // Collider Spike, Mushroom
  this.physics.add.collider(game.spikes, game.mushrooms, function(spike, mushroom) {
    if (spike.dir === "R") {
      spike.vel = -200;
      spike.dir = "L";
    } else {
      spike.vel = 200;
      spike.dir = "R";
    }
  });

  // Collider Spikes, Blocks
  this.physics.add.collider(game.spikes, game.blocks, function(spike, block) {
    if (spike.body.touching.left || spike.body.touching.right) {
      if (spike.dir === "R") {
        spike.vel = -200;
        spike.dir = "L";
        spike.flipX = false;
      } else {
        spike.vel = 200;
        spike.dir = "R";
        spike.flipX = true;
      }
    }
  });

  // Collider Spikes, Player
  this.physics.add.overlap(game.player, game.spikes, (player, spike) => {
    sfx.die.play();
    this.cameras.main.shake(240, 0.05, false);
    player.x = game.checkpoint[0];
    player.y = game.checkpoint[1] - 10;
  });

  // Collider Spike, Carrot
  this.physics.add.collider(game.spikes, game.carrots, function(spike, carrot) {
    // SFX
    sfx.explosion.play();

    // Destroy
    carrot.destroy();
    spike.destroy();
  });

  // Springs
  game.springs = this.physics.add.group();

  // Create springs
  for (var x = 0; x < world.springs.length; x++) {
    game.springs.create(world.springs[x][0], world.springs[x][1], "spring0").setCollideWorldBounds(true).setScale(0.4).setVelocityY(-500).setBounce(1);
  }

  // Collider Springs, Blocks
  this.physics.add.collider(game.springs, game.blocks);

  // Collider Springs, Boxes
  this.physics.add.collider(game.springs, game.boxes);

  // Collider Springs, Player
  this.physics.add.overlap(game.player, game.springs, (player, spring) => {
    sfx.die.play();
    this.cameras.main.shake(240, 0.05, false);
    player.x = game.checkpoint[0];
    player.y = game.checkpoint[1];
  });

  // Collider Springs, Carrots
  this.physics.add.collider(game.springs, game.carrots, function(spring, carrot) {
    // SFX
    sfx.explosion.play();

    // Destroy
    carrot.destroy();
    spring.destroy();
  });

  // Spider
  game.spiders = this.physics.add.group();

  // Create spider
  for (var x = 0; x < world.spiders.length; x++) {
    spider = game.spiders.create(world.spiders[x][0], world.spiders[x][1], "spider0").setCollideWorldBounds(true).setScale(0.8);
    spider.dir = ["L"][x];
    if (spider.dir === "R") {
      spider.vel = 200;
    } else {
      spider.vel = -200;
    }
  }

  // Collider Spider, Blocks
  this.physics.add.collider(game.spiders, game.blocks, function(spider, block) {
    if (spider.body.touching.left || spider.body.touching.right) {
      if (spider.dir === "R") {
        spider.vel = -200;
        spider.dir = "L";
        spider.flipX = false;
      } else {
        spider.vel = 200;
        spider.dir = "R";
        spider.flipX = true;
      }
    }
  });

  // Collider Spider, Mushrooms
  this.physics.add.collider(game.spiders, game.mushrooms, function(spider, mushroom) {
    if (spider.body.touching.left || spider.body.touching.right) {
      if (spider.dir === "R") {
        spider.vel = -200;
        spider.dir = "L";
        spider.flipX = false;
      } else {
        spider.vel = 200;
        spider.dir = "R";
        spider.flipX = true;
      }
    }
  });

  // Collider Spider, Carrot
  this.physics.add.collider(game.spiders, game.carrots, function(spider, carrot) {
    // SFX
    sfx.explosion.play();

    // Destroy
    carrot.destroy();
    spider.destroy();
  });

  // Collider Spider, Player
  this.physics.add.collider(game.player, game.spiders, (player, spider) => {
    if (player.body.touching.down && spider.body.touching.up) {
      // SFX
      sfx.explosion.play();

      // Bounce
      game.player.setVelocityY(-500);
      spider.destroy();
    } else {
      // Die
      sfx.die.play();
      this.cameras.main.shake(240, 0.05, false);
      player.x = game.checkpoint[0];
      player.y = game.checkpoint[1] - 10;
    }
  });

  // CarrotPowerup
  game.carrotPowerup = this.physics.add.group();

  // Collider Box, CarrotPowerup
  this.physics.add.collider(game.boxes, game.carrotPowerup);

  // Collider Player, CarrotPowerup
  this.physics.add.overlap(game.player, game.carrotPowerup, function(player, powerup) {
    // SFX
    sfx.powerup.play();

    // Add to coins
    game.carrot = true;

    // Destroy
    powerup.destroy();
  });

  // MushroomPowerup
  game.mushroomPowerup = this.physics.add.group();

  // Collider Box, MushroomPowerup
  this.physics.add.collider(game.boxes, game.mushroomPowerup);

  // Collider Player, MushroomPowerup
  this.physics.add.overlap(game.player, game.mushroomPowerup, function(player, powerup) {
    // SFX
    sfx.powerup.play();

    // Add to coins
    game.bounceMagic = true;

    // Destroy
    powerup.destroy();
  });

  // Flags
  game.flags = this.physics.add.staticGroup();
  world.flags.forEach(data => {
    let flag = game.flags.create(data[0], data[1], "flagDown").setScale(0.5).setSize(20, 60).setOffset(30, 35);
    flag.active = false
    flag.area = data[1];
  });

  // Collider Flag, Player
  this.physics.add.overlap(game.flags, game.player, function(player, flag) {
    // SFX
    if (flag.active === false) {
      sfx.checkpoint.play();
    }

    // Reset flags
    game.flags.getChildren().forEach(sprite => {
      sprite.anims.stop();
      sprite.setTexture("flagDown");
      sprite.active = false;
    });

    // Set XY
    game.checkpoint[0] = flag.x;
    game.checkpoint[1] = flag.y;
    flag.active = true;

    // Animation
    flag.anims.play("flag", true);
  });

  // Animation
  // Run
  this.anims.create({
    // Animation key
    key: "walk",

    // Frames
    frames: [{
      key: "playerWalk2"
    },
    {
      key: "playerWalk1"
    },
    {
      key: "playerWalk0"
    }],

    // Options
    frameRate: 10,
    repeat: -1
  });

  // Coin
  this.anims.create({
    // Animation key
    key: "coin",

    // Frames
    frames: [{
      key: "coin0"
    },
    {
      key: "coin1"
    },
    {
      key: "coin2"
    },
    {
      key: "coin3"
    }],

    // Options
    frameRate: 8,
    repeat: -1,
    yoyo: true
  });

  // Spike
  this.anims.create({
    // Animation key
    key: "spike",

    // Frames
    frames: [{
      key: "spike0"
    },
    {
      key: "spike1"
    }],

    // Options
    frameRate: 8,
    repeat: -1
  });

  // Spring
  this.anims.create({
    // Animation key
    key: "spring",

    // Frames
    frames: [{
      key: "spring0"
    },
    {
      key: "spring1"
    }],

    // Options
    frameRate: 8,
    repeat: -1
  });

  // Spider
  this.anims.create({
    // Animation key
    key: "spider",

    // Frames
    frames: [{
      key: "spider0"
    },
    {
      key: "spider1"
    }],

    // Options
    frameRate: 8,
    repeat: -1
  });

  // Flag
  this.anims.create({
    // Animation key
    key: "flag",

    // Frames
    frames: [{
      key: "flagMove0"
    },
    {
      key: "flagMove1"
    }],

    // Options
    frameRate: 5,
    repeat: -1
  });
}

// Update
function update() {
  // Move
  // Right
  if (game.cursors.right.isDown) {
    // Move right
    game.player.setVelocityX(350);

    // Play player move animation
    game.player.anims.play("walk", true);

    // Flip image
    game.player.flipX = false;

    // Dir var
    game.player.dir = "R";

  // Left
  } else if (game.cursors.left.isDown) {
    // Move left
    game.player.setVelocityX(-350);

    // Play move animation
    game.player.anims.play("walk", true);

    // Flip image
    game.player.flipX = true;

    // Dir var
    game.player.dir = "L";

  // None
  } else {
    // Don't move
    game.player.setVelocityX(0);

    // Stop anims
    game.player.setTexture("player");
  }

  // Jump
  if (game.cursors.up.isDown && game.player.body.blocked.down) {
    // SFX
    sfx.jump.play();

    // Jump
    game.player.setVelocityY(-game.jumpHeight);

    // Reset height
    game.jumpHeight = 700;
  }

  // Shoot
  if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)) && game.carrot) {
    // SFX
    sfx.carrot.play();

    // Flip
    if (game.player.dir === "R") {
      game.carrots.create(game.player.x, game.player.y, "carrot").setVelocityY(-400).setVelocityX(500).setScale(0.5);
    } else {
      game.carrots.create(game.player.x, game.player.y, "carrot").setVelocityY(-400).setVelocityX(-500).setScale(0.5);
    }
  }

  // Coin animation
  game.coins.getChildren().forEach(sprite => {
    sprite.anims.play("coin", true);
  });

  // Spring animation
  game.springs.getChildren().forEach(sprite => {
    sprite.anims.play("spring", true);
  });

  // Rotate carrots
  game.carrots.getChildren().forEach(sprite => {
    sprite.angle += 20;
  });

  // Spike
  game.spikes.getChildren().forEach(sprite => {
    // Animation
    sprite.anims.play("spike", true);

    // Check pos
    // Left edge
    if (sprite.x < 30) {
      if (sprite.dir === "R") {
        sprite.vel = 200;
        sprite.dir = "L";
      } else {
        sprite.vel = -200;
        sprite.dir = "R";
      }
    }

    // Right edge
    if (sprite.x > config.width + 4970) {
      if (sprite.dir === "L") {
        sprite.vel = 200;
        sprite.dir = "R";
      } else {
        sprite.vel = -200;
        sprite.dir = "L";
      }
    }

    // Rotate
    sprite.angle += 5;

    // Move
    sprite.setVelocityX(sprite.vel);
  });

  // Spider
  game.spiders.getChildren().forEach(sprite => {
    // Animation
    sprite.anims.play("spider", true);

    // Check pos
    // Left edge
    if (sprite.x < 30) {
      if (sprite.dir === "R") {
        sprite.vel = 200;
        sprite.dir = "L";
      } else {
        sprite.vel = -200;
        sprite.dir = "R";
      }
    }

    // Right edge
    if (sprite.x > config.width + 4970) {
      if (sprite.dir === "L") {
        sprite.vel = 200;
        sprite.dir = "R";
      } else {
        sprite.vel = -200;
        sprite.dir = "L";
      }
    }

    // Move
    sprite.setVelocityX(sprite.vel);
  });
}

// Phaser config
const config = {
  // Type
  type: Phaser.AUTO,

  // Proportions
  width: 1000,
	height: 643,

  // Color
  backgroundColor: 0xcfeffc,

  // Physics
  physics: {
    // Default
    default: "arcade",

    // Arcade
    arcade: {
      // Gravity
      gravity: {
        y: 1500
      },

      // Options
      enableBody: true,
      // debug: true
    }
  },

  // Scenes
  scene: {
    preload,
    create,
    update
  }
};

// Phaser game
const phaserGame = new Phaser.Game(config);
