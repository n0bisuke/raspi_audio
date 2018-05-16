'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const ngrok = require('ngrok');

const LoopPlay = require('./loopPlay');
const player = new LoopPlay('gJX2iy6nhHc'); //初期再生のURL
player.start(); //再生スタート

const config = require('./lineconfig');
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch(err => {
          console.log(err);
      });
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
        const currentInfo = player.getCurrentPlay();
        mes = `${currentInfo.name}を再生中です。 \n http://www.youtube.com/watch?v=${currentInfo.id}`;
        console.log(currentInfo);


        return client.replyMessage(event.replyToken, [{
            type: 'text',
            text: mes
        },{
            "type": "image",
            "originalContentUrl": currentInfo.originalContentUrl,
            "previewImageUrl": currentInfo.previewImageUrl
        }]);
    }

    else if(event.message.text === 'シャッフル'){
        player.shufflePlayList();
        mes = 'シャッフルします。次の曲からシャッフル再生です。';
    }
    
    //プレイリスト更新
    else{
        const videoId = player.checkYoutubeId(event.message.text);
        if(videoId !== ''){
            mes = '登録しました';
            player.setPlayList(videoId); //プレイリスト更新
        }else{
            mes = 'プレイリストに追加するにはYoutubeのURLを送ってください。';
        }
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: mes //実際に返信の言葉を入れる箇所
    });
}

(async()=>{
    app.listen(PORT);
    const ngrokURL = await ngrok.connect(PORT);
    console.log(`// ${ngrokURL} -> http://localhost:${PORT}`);
})();