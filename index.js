window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

import questions from '/src/js/service/questions.js'
import {saveAward, checkPermission, checkLogin} from '/src/js/service/coin.js'
// import Gray from '/src/js/filters/gray.js'

class Gray extends Phaser.Filter {
  constructor(game) {
    super(game);
    this.uniforms.gray = { type: '1f', value: 1.0 };
    this.fragmentSrc = [
      "precision mediump float;",

      "varying vec2       vTextureCoord;",
      "varying vec4       vColor;",
      "uniform sampler2D  uSampler;",
      "uniform float      gray;",

      "void main(void) {",
      "gl_FragColor = texture2D(uSampler, vTextureCoord);",
      "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), gray);",
      "}"
    ];
  }

  set gray(value) {
    this.uniforms.gray.value = value;
  }

  get gray() {
    return this.uniforms.gray.value;
  }
}

const game = new Phaser.Game(640, 820, Phaser.AUTO, 'phaser-example')
const randomGenerator = new Phaser.RandomDataGenerator()
const isPlayed = {
  lightSword: false,
  hammer: false,
  branch: true,
  lotion: false
}

function init () {
  let
    text,
    isDeadline = true

  this.preload = function () {
    this.stage.backgroundColor = '#182d3b';
    // this.load.image('sky', 'assets/sky.png');
    // this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.image('phaser', 'assets/phaser2.png');
    this.load.image('button', 'assets/game_btn.png');
    //ruten
    this.load.image('title', 'assets/title.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('cloud2', 'assets/cloud2.png');
    this.load.image('island', 'assets/island.png');
    this.load.image('coffee', 'assets/coffee.png');
    this.load.image('harry', 'assets/harry.png');
    this.load.image('princess', 'assets/princess.png');
    this.load.image('thunder', 'assets/thunder.png');
    this.load.image('white_soldier', 'assets/white_soldier.png');
    this.load.image('harry_bg', 'assets/harry_bg.png');
    this.load.image('princess_bg', 'assets/princess_bg.png');
    this.load.image('thunder_bg', 'assets/thunder_bg.png');
    this.load.image('white_soldier_bg', 'assets/white_soldier_bg.png');
    this.load.image('branch', 'assets/branch.png');
    this.load.image('lotion', 'assets/lotion.png');
    this.load.image('hammer', 'assets/hammer.png');
    this.load.image('light_sword', 'assets/light_sword.png');
    this.load.image('bn6', 'assets/bn6.png');
    this.load.image('bn7', 'assets/bn7.png');
    this.load.image('ticket1', 'assets/ticket1.png');
    this.load.image('ticket2', 'assets/ticket2.png');
    this.load.image('ticket3', 'assets/ticket3.png');
    this.load.image('ticket4', 'assets/ticket4.png');
    this.load.image('ticket5', 'assets/ticket5.png');
    this.load.image('close_btn', 'assets/close_btn.png');

    this.load.image('paper', 'assets/paper.png');

    // this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
    this.load.onLoadStart.add(loadStart, this);
    this.load.onFileComplete.add(fileComplete, this);
    this.load.onLoadComplete.add(loadComplete, this);
  }

  function loadStart() {
    text.setText("Loading ...");
    setTimeout(() => {isDeadline = true}, 2000);
  }

  //	This callback is sent the following parameters:
  function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  }

  function loadComplete() {
    if (isDeadline) {
      text.setText("Load Complete");
      game.state.start('home');
    } else {
      setTimeout(loadComplete, 500);
    }
  }
}

function home() {
  let
    weapon = null,
    clouds = null,
    cloudsFront = null

  this.create = function() {
    this.stage.backgroundColor = '#8adbff';


    //	Just to kick things off

    // game.input.onDown.addOnce(function() {
    //   text.setText('eqexe2sz3qawedzaew')
    // }, this);
    // let filterGray = game.add.filter('Gray')
    // let cloud = game.add.sprite(30, 500, 'cloud')
    // let cloud2 = game.add.sprite(30, 500, 'cloud2')

    clouds = game.add.physicsGroup()

    for (let i = 0; i < 5; i+=1) {
      let cloudType = ['cloud', 'cloud2']
      let cloud = clouds.create(game.world.randomX, _cloudPosY(), cloudType[game.rnd.between(0, 1)])
      cloud.anchor.set(0.5)
      cloud.scale.set(0.2)
      // game.add.tween(cloud).to( { x: -100 }, game.rnd.between(10000, 12000), Phaser.Easing.Linear.None, true)
      cloud.body.velocity.x = game.rnd.between(-10, -30)
    }


    // clouds.anchor.set(0.5)
    // clouds.scale.set(0.2, 0.2)

    let title = game.add.sprite(game.world.centerX, -100, 'title')
    title.anchor.set(0.5)
    title.scale.x = title.scale.y = 0.3
    game.add.tween(title).to( { y: 100 }, 3000, Phaser.Easing.Bounce.Out, true, 1500)

    let island = game.add.sprite(game.world.centerX, game.world.centerY - 50, 'island')
    island.anchor.set(0.5)
    island.scale.x = island.scale.y = 0.28
    game.add.tween(island).to( { y: island.y - 15 }, 2000, Phaser.Easing.Linear.None, true, 0 ,-1 , true)

    let coffee = game.add.sprite(game.world.centerX - 20, 750, 'coffee')
    coffee.anchor.set(0.5)
    coffee.scale.x = coffee.scale.y = 0.4

    let lightSword = game.add.button(game.world.centerX + 150, 170 + game.world.centerY, 'light_sword', ()=>{}, this, 2, 1, 0)
    lightSword.isPlayed = isPlayed.lightSword
    lightSword.dude = 'white_soldier'
    let hammer = game.add.button(game.world.centerX - 150, 170 + game.world.centerY, 'hammer', ()=>{}, this, 2, 1, 0);
    hammer.isPlayed = isPlayed.hammer
    hammer.dude = 'thunder'
    let branch = game.add.button(game.world.centerX + 150, 170 + game.world.centerY + 160, 'branch', ()=>{}, this, 2, 1, 0);
    branch.isPlayed = isPlayed.branch
    branch.dude = 'harry'
    let lotion = game.add.button(game.world.centerX - 150, 170 + game.world.centerY + 160, 'lotion', ()=>{}, this, 2, 1, 0);
    lotion.isPlayed = isPlayed.lotion
    lotion.dude = 'princess'


    let weaponList = [lightSword, hammer, branch, lotion]

    weaponList.forEach(weapon => {
      weapon.anchor.set(0.5)
      weapon.scale.x = weapon.scale.y = 0.25
      weapon.onInputOver.add(function(target){
        target.scale.x = target.scale.y = 0.3
      }, this)
      weapon.onInputOut.add(function(target){
        target.scale.x = target.scale.y = 0.25
      }, this)

      if(weapon.isPlayed) {
        this.filterGray = new Gray(this.game)
        weapon.filters = [this.filterGray]
        weapon.onInputUp.add(function() {
          alert('今天已經玩過了喔！')
        })
      } else {
        weapon.onInputUp.add(function() {
          game.state.start('play', true, false, weapon.dude)
        })
      }
    })

    cloudsFront = game.add.physicsGroup()

    for (let i = 0; i < 3; i+=1) {
      let cloudType = ['cloud', 'cloud2']
      let cloud = cloudsFront.create(game.world.randomX, _cloudFrontPosY(), cloudType[game.rnd.between(0, 1)])
      cloud.anchor.set(0.5)
      cloud.scale.set(0.18)
      // game.add.tween(cloud).to( { x: -100 }, game.rnd.between(10000, 12000), Phaser.Easing.Linear.None, true)
      cloud.body.velocity.x = game.rnd.between(-10, -65)
    }

    let hintPopup = {
      name: 'ticket5',
      action: null,
      label: {
        x: game.world.centerX,
        y: game.world.centerY - 95,
        text: '歡迎來到『露天覓寶樂園』\n只要通過挑戰，\n就可以獲得彩票。\n請選擇一個裝備開始闖關',
        style: { font: 'bold 20pt Arial' },
        config: { lineSpacing: 14 }
      }
    }
    game.time.events.add(5000, ()=> { showPopup(hintPopup) })
  }

  this.update = function() {
    clouds.forEach((cloud) => {
      if(cloud.x < -100) {
        cloud.x = game.world.width + 100
        cloud.y = _cloudPosY()
      }
    }, this)
    cloudsFront.forEach((cloud) => {
      if(cloud.x < -100) {
        cloud.x = game.world.width + 100
        cloud.y = _cloudFrontPosY()
      }
    }, this)
  }

  function _cloudPosY() {
    let y = game.world.randomY
    return y > 450 ? _cloudPosY() : y
  }
  function _cloudFrontPosY() {
    let y = game.world.randomY
    return (y > 450 || y < 200) ? _cloudFrontPosY() : y
  }
}

function play() {
  let
    question,
    paper,
    spriteDude,
    anser = null,
    storyStep = 0,
    buttonList = [],
    optionTextList = [],
    dude = null,
    story

  this.init = function(userChooseDude) {
    const dudeMap = {
      'thunder': {
        weapon: 'hammer',
        backgroundColor: '#1b1848'
      },
      'white_soldier': {
        weapon: 'lightSword',
        backgroundColor: '#1f0820'
      },
      'princess': {
        weapon: 'lotion',
        backgroundColor: '#6a8437'
      },
      'harry': {
        weapon: 'branch',
        backgroundColor: '#021423'
      }
    }
    dude = userChooseDude
    document.getElementsByTagName('body')[0].style.backgroundColor = dudeMap[dude].backgroundColor
    story = questions[dudeMap[dude].weapon].sort(() => 0.5 - Math.random()).slice(0, 4)
  }
  this.create = function() {
    console.log(dude);
    let bg = this.add.image(0, 0, dude + '_bg')
    bg.scale.x = 0.6
    bg.scale.y = 0.43
    paper = this.add.image(game.world.centerX, game.world.centerY - 100, 'paper')
    paper.anchor.set(0.5)
    paper.scale.x = 0.4
    paper.scale.y = 0.35
    spriteDude = game.add.sprite(160, 620, dude)
    spriteDude.anchor.set(0.5)
    spriteDude.scale.x = 0.4
    spriteDude.scale.y = 0.4
    // spriteDude.fixedToCamera = true

    _createQuestion()

    // cursors = game.input.keyboard.createCursorKeys()
  }
  this.update = function() {
    if(anser !== null) {
      let currectAnser = story[storyStep].anser

      if(anser !== currectAnser) {
        // buttonList[anser].inputEnabled = false
        let action = buttonList[anser].onInputUp
        buttonList[anser].onInputUp = null
        let buttonTween = game.add.tween(buttonList[anser]).to( { x: buttonList[anser].x - 10 }, 100, Phaser.Easing.Linear.None, true, 0 ,6 , true)
        buttonTween.onComplete.add(function(target) {
          target.onInputUp = action
        }, this)
        let textTween = game.add.tween(optionTextList[anser]).to( { x: buttonList[anser].x - 10 }, 100, Phaser.Easing.Linear.None, true, 0 ,6 , true)

      } else {
        let buttonTween = game.add.tween(buttonList[anser].scale).to( { x: 3, y: 3 }, 800, Phaser.Easing.Linear.None, true);
        game.add.tween(buttonList[anser]).to( { alpha: 0.1 }, 800, Phaser.Easing.Linear.None, true)
        game.add.tween(optionTextList[anser].scale).to( { x: 3, y: 3 }, 800, Phaser.Easing.Linear.None, true)
        game.add.tween(optionTextList[anser]).to( { alpha: 0.1 }, 800, Phaser.Easing.Linear.None, true)

        buttonTween.onComplete.add(function(target) {

          buttonList.forEach(button => button.destroy())
          optionTextList.forEach(option => option.destroy())
          buttonList = []
          optionTextList = []

          storyStep += 1

          if(storyStep < story.length) {

            _createQuestion()

          } else {
            storyStep = 0

            question.destroy()
            let tweenPaper = game.add.tween(paper).to( { y: -500 }, 1800, Phaser.Easing.Linear.None, true)
            tweenPaper.onComplete.add(function(target){ target.destroy() })
            let tweenDude = game.add.tween(spriteDude).to( { x: game.world.centerX }, 2000, Phaser.Easing.Linear.None, true)
            tweenDude.onComplete.add(function(target){
              game.state.start('over', false, false)
            })
            game.add.tween(spriteDude).to( { angle: spriteDude.angle + 5 }, 200, Phaser.Easing.Linear.None, true, 0 ,10 , true)
          }
        }, this)

      }

      anser = null
    }
  }

  function _createQuestion() {
    console.log(story[storyStep]);

    let options = story[storyStep].options

    for (let i = 0; i < options.length; i += 1) {

      let button = game.add.button(game.world.centerX, 250 + i * 100, 'button', ()=>{}, this, 2, 1, 0)
      let optionText
      button.anchor.set(0.5)
      button.scale.x = 0.85
      button.scale.y = 0.75
      button.alpha = 0
      button.onInputOver.add(function(){
        button.scale.x = 0.9
        button.scale.y = 0.8
        optionText.scale.x = optionText.scale.y = 1.05
      }, this);
      // button.onInputDown.add(function(){
      //   button.scale.x = 0.85
      //   button.scale.y = 0.75
      //   optionText.scale.x = optionText.scale.y = 1
      // }, this);
      button.onInputOut.add(function(){
        button.scale.x = 0.85
        button.scale.y = 0.75
        optionText.scale.x = optionText.scale.y = 1
      }, this);

      // button.onInputUp.add(up, this);

      // button.inputEnabled = false

      let buttonTween = game.add.tween(button).to( { alpha: 1 }, 1600, Phaser.Easing.Linear.None, true, 1500, 0, false)
      buttonTween.onComplete.add(function(target) {
        // target.inputEnabled = true
        target.onInputUp.add(()=>{anser = i}, this)
      }, this)
      buttonList.push(button)

      if(options[i].length > 9) {
        optionText = game.add.text(game.world.centerX, 250 + i * 100, filterText(options[i], 9), {font: 'bold 14pt Arial', fill: '#7d5c22' })
      } else {
        optionText = game.add.text(game.world.centerX, 250 + i * 100, options[i], {font: 'bold 18pt Arial', fill: '#7d5c22' })
      }

      optionText.anchor.set(0.5)
      optionText.alpha = 0
      game.add.tween(optionText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 1500, 0, false)

      optionTextList.push(optionText)

    }

    if(question) question.destroy()
    question = game.add.text(game.world.centerX, 125, filterText(story[storyStep].question, 10), {font: 'bold 23pt Arial', fill: '#333', lineSpacing: 80 });
    question.anchor.set(0.5, 0.5)
    // game.add.tween(question).to( { x: game.world.centerX }, 1300, Phaser.Easing.Bounce.Out, true);
  }
}

function over() {
  let overPopupList = null

  this.init = function() {
    overPopupList = [
      {
        name: 'ticket1',
        action: {
          x: game.world.centerX,
          y: game.world.centerY + 200,
          callback() {}
        },
        label: {
          x: game.world.centerX + 75,
          y: game.world.centerY - 95,
          text: '闖關成功！\n獲得彩票4張！',
          style: { font: 'bold 20pt Arial' }
        }
      },
      {
        name: 'ticket2',
        action: {
          x: game.world.centerX,
          y: game.world.centerY + 200,
          callback() {}
        },
        label: {
          x: game.world.centerX,
          y: game.world.centerY + 130,
          text: '你真是聰明絕頂',
          style: { font: 'bold 24pt Arial' }
        }
      },
      {
        name: 'ticket3',
        action: {
          x: game.world.centerX,
          y: game.world.centerY + 200,
          callback() {}
        },
        label: {
          x: game.world.centerX,
          y: game.world.centerY + 110,
          text: '阿不就好棒棒！\n彩票4張給你',
          style: { font: 'bold 20pt Arial' }
        }
      },
      {
        name: 'ticket4',
        action: {
          x: game.world.centerX,
          y: game.world.centerY,
          callback() {}
        },
        label: {
          x: game.world.centerX,
          y: game.world.centerY - 70,
          text: '4張彩票進帳囉',
          style: { font: 'bold 24pt Arial' }
        }
      },
    ]
  }

  this.create = function() {
    this.stage.backgroundColor = '#333';

    // game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER', { fill: '#ffffff',font: 'bold 40pt Arial',}).anchor.set(0.5)
    showPopup(overPopupList[game.rnd.between(0, 3)])

    game.input.onDown.addOnce(function() {
      game.state.start('home')
    }, this);
  }

}


game.state.add('init', init)
game.state.add('home', home)
game.state.add('play', play)
game.state.add('over', over)

game.state.start('init')


if(document.querySelectorAll('canvas').length > 0) {
  document.querySelectorAll('canvas')[0].remove()
}

function showPopup(current) {
  let
    popopContainer,
    closeBtn,
    actionBtn,
    text,
    overlay

  popopContainer = game.add.image(game.world.centerX, game.world.centerY, current.name)
  popopContainer.anchor.set(0.5)
  closeBtn = game.add.button(game.world.centerX + 185, 250 - 105, 'close_btn', ()=>{
    popopContainer.destroy()
    closeBtn.destroy()
    text.destroy()
    overlay.destroy()
    if(actionBtn) actionBtn.destroy()
  }, this, 2, 1, 0)
  closeBtn.anchor.set(0.5)
  closeBtn.input.priorityID = 1

  if(current.action) {
    actionBtn = game.add.button(current.action.x, current.action.y, 'bn7', ()=>{}, this, 2, 1, 0)
    actionBtn.anchor.set(0.5)
    actionBtn.input.priorityID = 1
  }

  text = game.add.text(current.label.x, current.label.y, current.label.text, Object.assign({ fill: '#ffffff' }, current.label.style))
  if(current.label.config) Object.assign(text, current.label.config)
  text.anchor.set(0.5)
  // This is event #1 added to background sprite
  overlay = game.add.sprite(0, 0)
  overlay.fixedToCamera = true
  overlay.scale.setTo(game.width, game.height)
  overlay.inputEnabled = true
  overlay.input.priorityID = 0 // lower priority
}

function filterText(text, num) {
  return text.split('').reduce(((reducer, value, index) => {
    if(index === 0 || index !== text.length -1) {
      return (index + 1) % num ? reducer + value : reducer + value + '\n'
    } else {
      return reducer + value
    }
  }))
}