window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

const game = new Phaser.Game(640, 820, Phaser.AUTO, 'phaser-example');
const story = {
  "1": {
    question: '露天首頁的分類目錄，總共有幾類？',
    options: {
      A: '22',
      B: '23',
      C: '24'
    },
    anser: 'C'
  },
  "2": {
    question: '我的訂單紀錄可以保留多久呢？',
    options: {
      A: '一年',
      B: '兩年',
      C: '三年'
    },
    anser: 'B'
  },
  "3": {
    question: '我想讓買家看清楚商品，最多可以上傳幾張照片呢？',
    options: {
      A: '3',
      B: '6',
      C: '9'
    },
    anser: 'C'
  },
  "4": {
    question: '我賣的商品可以限制販售對象嗎？',
    options: {
      O: '可以，設定買家下標限制即可',
      X: '不可以，誰想要買 就得賣誰',
    },
    anser: 'O'
  },
  "5": {
    question: '我賣的商品可以不要一次被同一個人買光光嗎？',
    options: {
      A: '可以，設定每人限購數量即可',
      B: '不可以，買家想買多少就買多少',
    },
    anser: 'A'
  },
}



function init () {
  let
    text,
    isDeadline = true

  this.preload = function () {
    this.stage.backgroundColor = '#182d3b';
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('button', 'assets/button2.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

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
  let button;
  this.create = function() {
    this.stage.backgroundColor = '#182d3b';
    this.add.image(0, 0, 'sky');

    //	Just to kick things off
    // button = game.add.button(game.world.centerX + 110, game.world.centerY, 'dude', start, this, 2, 1, 0);
    // button.anchor.set(0.5);
    this.add.image(game.world.centerX + 110, game.world.centerY, 'dude').anchor.set(0.5);

    let text = game.add.text(game.world.centerX, game.world.centerY, 'start game', { fill: '#ffffff' });
    text.anchor.set(0.5);
    text.inputEnabled = true;
    text.events.onInputDown.add(function(){ game.state.start('play') }, this);

    // game.input.onDown.addOnce(function() {
    //   text.setText('eqexe2sz3qawedzaew')
    // }, this);
  }
}

function play() {
  let
    question,
    buttonA,
    buttonB,
    buttonC,
    buttonD,
    optionA,
    optionB,
    optionC,
    optionD,
    scoreText,
    score = 0,
    anser = '',
    storyLength = Object.keys(story).length,
    storyStep = 1

  this.init = function(a) {
    console.log(a);
  }
  this.create = function() {

    scoreText = game.add.text(game.world.centerX, 50, 'score: 0', {fill: '#ffffff'})
    scoreText.anchor.set(0.5)

    question = game.add.text(game.world.centerX, 100, '請問Jeff長得像誰 ?', {font: 'bold 24pt Arial', fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)', lineSpacing: 80 });
    question.anchor.set(0.5)

    buttonA = game.add.button(game.world.centerX, game.world.centerY - 100, 'button', ()=>{}, this, 2, 1, 0);
    buttonA.anchor.set(0.5)
    buttonA.setScaleMinMax(1, 0.6, 1, 0.6)
    optionA = game.add.text(game.world.centerX, game.world.centerY - 100, 'A: 劉以豪', { fill: '#ffffff', tabs: 50 });
    optionA.anchor.set(0.5)

    buttonB = game.add.button(game.world.centerX, game.world.centerY + 30, 'button', ()=>{}, this, 2, 1, 0);
    buttonB.anchor.set(0.5)
    buttonB.setScaleMinMax(1, 0.6, 1, 0.6)
    optionB = game.add.text(game.world.centerX, game.world.centerY + 30, 'B: 金城武', { fill: '#ffffff', tabs: 50 });
    optionB.anchor.set(0.5)

    buttonC = game.add.button(game.world.centerX, game.world.centerY + 160, 'button', ()=>{ anser = 'C'}, this, 2, 1, 0);
    buttonC.anchor.set(0.5)
    buttonC.setScaleMinMax(1, 0.6, 1, 0.6)
    optionC = game.add.text(game.world.centerX, game.world.centerY + 160, 'C: 宋仲基', { fill: '#ffffff',font: 'bold 20pt Arial', align: 'left', wordWrap: true, wordWrapWidth: 30, maxWidth: 50 });
    optionC.anchor.set(0.5)

    buttonD = game.add.button(game.world.centerX, game.world.centerY + 290, 'button', ()=>{}, this, 2, 1, 0);
    buttonD.anchor.set(0.5)
    buttonD.setScaleMinMax(1, 0.6, 1, 0.6)
    optionD = game.add.text(game.world.centerX, game.world.centerY + 290, 'D: 以上皆是', { fill: '#ffffff', tabs: 50, wordWrap: true, wordWrapWidth: 30, maxWidth: 50 });
    optionD.anchor.set(0.5)
    // buttonA.bringToTop()
  }
  this.update = function() {

    if(anser) {
      console.log(anser);
      scoreText.setText(`score: ${score+=1}`)
      anser = ''

      if(storyStep < storyLength) {

        if(storyStep === 2) {
          optionD.kill()
        } else if (storyStep === 3 ) {
          game.world.callAll('revive');
        }

        question.setText(story[storyStep].question)
        let options = Object.keys(story[storyStep].options)


        optionA.setText(story[storyStep].options[options[0]])
        optionB.setText(story[storyStep].options[options[1]])
        optionC.setText(story[storyStep].options[options[2]])
        // optionD.setText(story[storyStep].options[options[3]])
        storyStep += 1
      }else {
        game.state.start('over')
      }
    }
  }
}

function over() {
  this.create = function() {
    game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER', { fill: '#ffffff',font: 'bold 40pt Arial',});
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