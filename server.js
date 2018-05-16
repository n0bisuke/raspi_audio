'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const LoopPlay = require('./loopPlay');
const player = new LoopPlay('gJX2iy6nhHc'); //初期再生のURL
player.start(); //再生スタート

const config = require('./lineconfig');
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});
const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    let mes = '';

    //プレイリストの表示
    if(event.message.text === 'プレイリスト'){
        mes = player.playList.length + '曲登録中';
        mes = mes + player.playList.toString();
    }

    else if(event.message.text === '今の曲'){
        mes = player.getCurrentPlay() + 'を再生中です。';
    }

    else if(event.message.text === 'シャッフル'){
        player.shufflePlayList();
        mes = 'シャッフルします。次の曲からシャッフル再生です。';
    }

    else if(event.message.text.length !== 11){
        mes = 'youtubeのビデオIDを送ってね!!!';
    }
    
    //プレイリスト更新
    else{
        mes = '登録しました';
        player.setPlayList(event.message.text); //プレイリスト更新
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: mes //実際に返信の言葉を入れる箇所
    });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);