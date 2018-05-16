const fs = require('fs');
const ytdl = require('youtube-dl');
var url = 'https://www.youtube.com/watch?v=H7HmzwI67ec';

// pass ['-f', 'bestaudio'] || ['-f', 'm4a'] for other formats with yt

ytdl.exec(url, ['-f', 'bestaudio'], {}, function exec(err, output) {
    'use strict';
    if (err) { throw err; }
    console.log(output.join('\n'));
});