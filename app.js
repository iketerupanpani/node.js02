//インターネットアクセルする「http」というオブジェクトを読み込む。
//変数＝require(ID(モジュール))
const http = require('http');
const fs = require('fs');
//サーバーオブジェクトを作る
//変数＝http.createServer(関数);
var server = http.createServer(getFromClient);
//request=クライアントからサーバーへの要求
//response=サーバーからクライアントへの返信
// (request, response) => {
//実行する処理
//response.end=クライアントに返信して終了する
// response.end('<html><body><h1>Hello</h1><p> Node.js!!!</p></body></html>');
// response.setHeader('Content-Type', 'text/html');
// response.write('<!DOCTYPE html><html lang="ja">');
// response.write('<head><meta charset="utf-8">');
// response.write('<title>Hello</title></head>');
// response.write('<body><h1>Hello Node.js!</h1>');
// response.write('<p>This is Node.js sample page.</p>');
// response.write('<p>これは、Node.jsのサンプルページです。</p>', 'utf8');
// response.write('</body></html>');
// response.end();

// fs.readFile('./index.html', 'UTF-8',
//     (error, data) => {
//         response.writeHead(200, { 'Content-Type': 'text/html' });
//         response.write(data);
//         response.end();
//     })
//     }
// );
//サーバーオブジェクトを待ち受け状態にする
server.listen(3000);
console.log('Server start!');

//createServerの処理
function getFromClient(request, response) {
    fs.readFile('./index.html', 'UTF-8',
        (error, data) => {
            var content = data.
                replace(/dummy_title/g, 'タイトルです').
                replace(/dummy_content/g, 'これがコンテンツです。');

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        }
    );
}