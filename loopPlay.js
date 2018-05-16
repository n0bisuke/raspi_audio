'use strict';

const player = require('./libs/playsound');
const ytdl = require('./libs/ytdl');
const fs = require('fs');
const playListFilePath = './playlist.txt';

class LoopPlay {
    constructor(videoId) {
        const firstVideoId = `gJX2iy6nhHc`;
        const playListTxt = fs.readFileSync(playListFilePath, 'utf8');
        
        this.playList = [];
        if(playListTxt === ''){
            this.setPlayList(firstVideoId); //ファイルの中身が無ければ追加
        }else{
            this.playList = playListTxt.split(','); //プレイリストを作成ファイルから
        }
        
        this.count = 1;
        this.outputfile = './audiofile/output.mp4';
        this.currentMusicName = '';
    }

    setPlayList(videoId) {
        this.playList.push(videoId); //追加
        this.playList = this.playList.filter((x, i, self) => self.indexOf(x) === i); //重複削除
        fs.writeFileSync(playListFilePath, this.playList.toString()); //ファイル保存
    }

    shufflePlayList(){
        const arr = this.playList.slice();
        for (let i = arr.length - 1; 0 < i; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            // arr[i] <-> arr[r]
            [arr[i], arr[r]] = [arr[r], arr[i]];
        }
        this.playList = arr;
        fs.writeFileSync(playListFilePath, this.playList.toString()); //ファイル保存
    }

    getCurrentPlay(){
        return this.currentMusicName;
    }
    
    async start() {
        console.log(`${this.count}曲目~`);
        
        //もし再生できる曲がなければカウンタを1に戻す
        if(!this.playList[this.playList.length - 1]) {
            this.count = 1;
            console.log('再生できる曲がないので最初に戻ります。');
        }

        let fileName = await ytdl(this.playList[this.count-1], this.outputfile);
        console.log(`[${fileName}]をDL成功!`);
        this.currentMusicName = fileName;
        console.log(`-----playlist=${this.playList.toString()}-----`);
        this.counst++;
        let res = await player(this.outputfile);
        console.log(res);
        this.start();
    }
}

if(process.argv[1] === 'loopPlay' || process.argv[1] === 'loopPlay.js'){
    const loopPlay = new LoopPlay('gJX2iy6nhHc'); //初期再生のURL
    loopPlay.start();
}else{
    module.exports = LoopPlay;
}