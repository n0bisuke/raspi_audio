'use strict';

const player = require('./libs/playsound');
const ytdl = require('./libs/ytdl');

let playList = ['zVQ7qd2ukn8','90AiXO1pAiA','IPSyweVhyTE'];
let count = 1;
let outputfile = './audiofile/output.mp4';

const main = async () => {
    console.log(`${count}曲目~`);
    let res = '';
    const playVideoId = playList.shift();
    res = await ytdl(playVideoId,outputfile);
    console.log(res);
    console.log(`-----playlist=${playList.toString()}-----`);
    res = await player(outputfile);
    console.log(res);
    main();
};
main();
