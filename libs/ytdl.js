'use strict';

const fs = require('fs');
const youtubedl = require('youtube-dl');
let filename = ''

module.exports = (videoId, output = 'output.mp3') => {
    return new Promise((resolve, reject) => {
        const video = youtubedl(`http://www.youtube.com/watch?v=`+videoId,['--format=18'],{cwd: __dirname }); 
        video.on('info', (info) => {
            console.log('Download started');
            // console.log('filename: ' + info.filename);
            filename = info.filename;
            // console.log('size: ' + info.size);
        });
        video.pipe(fs.createWriteStream(output));

        video.on('error',(err) => {
            reject(err);
            return;
        });
        video.on('end',() => resolve(filename));
    }) 
}