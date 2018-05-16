// const fs = require('fs');
// const playlistPath = './playlist.txt';
// const playlisttxt = fs.readFileSync(playlistPath, 'utf8');
// let playlist = [];

// if(playlisttxt === ''){
//     playlist.push('gJX2iy6nhHc');
//     console.log('--');
// }else{
//     const videoId = 'gJX2iy6nhHc';
//     playlist = playlisttxt.split(',');
//     playlist.push(videoId);
//     playlist = playlist.filter((x, i, self) => self.indexOf(x) === i); //重複削除
// }
// console.log(playlist);

// fs.writeFileSync(playlistPath, playlist.toString());
// const mes = 'http://www.youtube.com/watch?v=JpCyeo_kNA0';
// const mes = `https://youtu.be/JpCyeo_kNA0`;
// const mes = `http://liginc.co.jp/web/programming/php/156225`;
// const mes = `JpCyeo_kNA0`;
// const mes = `https://www.youtube.com/watch?v=PCp2iXA1uLE`;

// const regexpYt = new RegExp(/youtube.com\/watch\?v=([^&]{11})/);
// const regexpShare = new RegExp(/youtu.be\/([^&]{11})/);
// // const regexpId = new RegExp(/([^&]{11})/);

// let videoId = '';
// if(mes.match(regexpYt)){
//     videoId = mes.match(regexpYt)[1];
// }else if(mes.match(regexpShare)){
//     videoId = mes.match(regexpShare)[1];
// }else if(mes.match(regexpId)){
//     vodepId = mes;
// }else{
//     console.log('YoutubeのURLを教えてね');
// }

// console.log(videoId);
// let res = mes.match(regexp);
// if(mes.match(/youtube.com\/watch\?v=([^&]{11})/){

// }else if(mes.match(/youtu.be\/([^&]{11})/)){

// }


// if(mes.match(/youtube.com\/watch\?v=([^&]{11})/)){
//     console.log()
// }else if(mes.match(/youtu.be\/([^&]{11})/)){

// }
// console.log(mes.match(/([youtube.com\/watch\?v= || youtu.be\/][^&]{11})/));
// console.log(mes.match(/[youtube.com\/watch\?v= || youtu.be\/]([^&]{11})/)); //通常URL
// console.log(mes.match(/youtu.be\/([^&]{11})/)); //


var youtubedl = require('youtube-dl');
var url = 'https://youtu.be/PizwcirYuGY';
 
var options = {
  // Downloads available thumbnail.
  all: false,
  // The directory to save the downloaded files in.
  cwd: __dirname,
};

let dl = youtubedl.getThumbs(url, options, function(err, files) {
  if (err) throw err;
  console.log('thumbnail file downloaded:', files);
});

console.log
dl.on('info', (info) => {
    console.log('Download started...');
    // console.log('filename: ' + info.filename);
    filename = info._filename;
    // console.log('size: ' + info.size);
});