const fs = require('fs');
const playlistPath = './playlist.txt';
const playlisttxt = fs.readFileSync(playlistPath, 'utf8');
let playlist = [];

if(playlisttxt === ''){
    playlist.push('gJX2iy6nhHc');
    console.log('--');
}else{
    const videoId = 'gJX2iy6nhHc';
    playlist = playlisttxt.split(',');
    playlist.push(videoId);
    playlist = playlist.filter((x, i, self) => self.indexOf(x) === i); //重複削除
}
console.log(playlist);

fs.writeFileSync(playlistPath, playlist.toString());