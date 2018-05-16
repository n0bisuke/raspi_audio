'use strict';

const player = require('./libs/playsound');
const ytdl = require('./libs/ytdl');
const outputfile = './audiofile/output.mp4';
const outputfile2 = './audiofile/output2.mp4';
let playList = ['IPSyweVhyTE','90AiXO1pAiA','zVQ7qd2ukn8'];

const init = async () => {
    let res = '';
    const playVideoId = playList.shift();
    res = await ytdl(playVideoId,outputfile);
    console.log(res);
    console.log(`-----${playList.toString()}-----`);
    res = await player(outputfile);
    console.log(res);
};
init();
