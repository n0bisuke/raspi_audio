'use strict';

const player = require('play-sound')(); //読み込み

module.exports = (playfile) => {
    return new Promise((resolve, reject) => {
        player.play(playfile, err => {
            if(err){
                reject(err);
            }else{
                resolve('----Play Done!----');
            }
        });
    }) 
}

