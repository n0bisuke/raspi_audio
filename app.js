'use strict';

const player = require('play-sound')(); //読み込み

player.play('./audiofile/opening.mp3', err => {
	if (err) throw err
});