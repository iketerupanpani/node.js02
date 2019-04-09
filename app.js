

//インターネットアクセルする「http」というオブジェクトを読み込む。**変数＝require(ID(モジュール))
const http = require('http');
const fs = require('fs');

//ejsオブジェクトの読み込み
const ejs = require('ejs');

//スタイルシートの読み込み処理を追加する
const url = require('url');

//querystringモジュールのロード
const qs = require('querystring');

//テンプレートファイルの読み込み **readFileSync=同期処理**
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const home_page = fs.readFileSync('./home.ejs', 'utf8');
const result_page = fs.readFileSync('./result.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

//サーバーオブジェクトを作る **変数＝http.createServer(関数);**
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

// function getFromClient(request, response) {
//     fs.readFile('./index.ejs', 'UTF-8',
//         (error, data) => {
//             var content = data.
//                 //replace=検索置換
//                 // replace(/dummy_title/g, 'BlockChain-ART-Collection').
//                 // replace(/dummy_content/g, '☺️☺️');
//                 response.writeHead(200, { 'Content-Type': 'text/html' });
//             response.write(content);
//             response.end();
//         }
//     );
// }

function getFromClient(request, response) {

    var url_parts = url.parse(request.url, true);


    switch (url_parts.pathname) {

        case '/':
            // var content = "これはIndexページです。"
            // var query = url_parts.query;
            // if (query.msg != undefined) {
            //     var query_obj =
            //         content += 'あなたは、「' + query.msg + '」と送りました。';
            // }
            // //レンダリングの実行
            // var content = ejs.render(index_page, {
            //     title: "Index",
            //     content: content,
            // });
            // response.writeHead(200, { 'Content-Type': 'text/html' });
            // response.write(content);
            // response.end();
            response_index(request, response);
            break;

        case '/other':
            // var content = ejs.render(other_page, {
            //     title: "Other",
            //     content: "これは新しく用意したページです。",
            // });
            // response.writeHead(200, { 'Content-Type': 'text/html' });
            // response.write(content);
            // response.end();
            response_other(request, response);
            break;

        case '/home':
            // var content = ejs.render(home_page);
            // response.writeHead(200, { 'Content-Type': 'text/html' });
            // response.write(content);
            // response.end();
            response_home(request, response);
            break;


        case '/result':
            // var content = ejs.render(result_page, {
            //     title: "Result",
            //     content: "これは検索結果が出るページです。",
            // });
            // response.writeHead(200, { 'Content-Type': 'text/html' });
            // response.write(content);
            // response.end();
            response_result(request, response);
            break;

        case '/style.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }

}
//★indexのアクセス処理
function response_index(request, response) {
    var msg = "これはIndexページです。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
//★otherのアクセス処理
function response_other(request, response) {
    var msg = "これはOtherページです。"

    //POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body); //データのパース
            msg += 'あなたは、「' + post_data.msg + '」と書きました。';
            var content = ejs.render(other_page, {
                title: "Other",
                content: msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });

        //GETアクセス時の処理
    } else {
        var msg = "ページがありません。"
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();

    }
}

//★homeのアクセス処理
function response_home(request, response) {
    var msg = "ARTIST"
    var content = ejs.render(home_page, {
        title: "BlockChain-ART-Collection",
        content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

//★resultのアクセス処理
function response_result(request, response) {
    var msg = "検索結果　："

    //POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body); //データのパース
            msg += post_data.msg;
            var content = ejs.render(result_page, {
                title: "Result",
                content: msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });

        //GETアクセス時の処理
    } else {
        var msg = "HOMEに戻り、再度検索してください。"
        var content = ejs.render(result_page, {
            title: "Result",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();

    }
}
