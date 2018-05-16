'use strict';

const player = require('./libs/playsound');
const ytdl = require('./libs/ytdl');
const fs = require('fs');
const playListFilePath = './playlist.txt';

class LoopPlay {
    constructor(videoId) {
        //初期プレイリストをファイルから取得
        this.playList = [];
        const firstVideoId = `gJX2iy6nhHc`;
        const playListTxt = fs.readFileSync(playListFilePath, 'utf8');
        if(playListTxt === ''){
            this.setPlayList(firstVideoId); //ファイルの中身が無ければ追加
        }else{
            this.playList = playListTxt.split(','); //プレイリストを作成ファイルから
        }
        
        this.count = 1;
        this.outputfile = './audiofile/output.mp4';
        this.currentMusicName = '';
        this.currentMusicId = '';
    }

    //プレイリストの更新
    setPlayList(videoId) {
        this.playList.push(videoId); //追加
        this.playList = this.playList.filter((x, i, self) => self.indexOf(x) === i); //重複削除
        fs.writeFileSync(playListFilePath, this.playList.toString()); //ファイル保存
    }

    //シャッフル
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

    //再生中の曲の情報
    getCurrentPlay(){
        return {
            name: this.currentMusicName, //名前
            id: this.currentMusicId, //id
            originalContentUrl: `https://i.ytimg.com/vi/${this.currentMusicId}/sddefault.jpg`, //LINE仕様は最大1024x1024
            previewImageUrl: `https://i.ytimg.com/vi/${this.currentMusicId}/default.jpg` //LINE仕様は最大240x240
        }
        //sddefault 640X480
        //hqdefault 480X360
        //mqdefault 320×180
        //default 120×90
    }

    checkYoutubeId(mes){
        const regexpYt = new RegExp(/youtube.com\/watch\?v=([^&]{11})/);
        const regexpShare = new RegExp(/youtu.be\/([^&]{11})/);
        
        let videoId = '';
        if(mes.match(regexpYt)){
            videoId = mes.match(regexpYt)[1];
        }else if(mes.match(regexpShare)){
            videoId = mes.match(regexpShare)[1];
        }
        return videoId;
    }
    
    async start() {
        console.log(`${this.count}曲目~`);
        try {
            this.currentMusicId = this.playList[this.count-1]; //今からDLするvideoId
            this.currentMusicName = await ytdl(this.currentMusicId, this.outputfile);
            console.log(`[${this.currentMusicName}]をDL成功!`);
    
            let res = await player(this.outputfile);
            console.log('----Play Done!!-----');
            
            this.count++;
            console.log(':Next...');            
        } catch (error) {
            //エラー発生。再生できる曲がなければカウンタを1に戻す
            this.count = 1;
            console.log('[!!]-再生できる曲がないので最初に戻ります。');            
        }

        this.start();
    }
}

if(process.argv[1] === 'loopPlay' || process.argv[1] === 'loopPlay.js'){
    const loopPlay = new LoopPlay('gJX2iy6nhHc'); //初期再生のURL
    loopPlay.start();
}else{
    module.exports = LoopPlay;
}