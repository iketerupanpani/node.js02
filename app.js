

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
const skateart_page = fs.readFileSync('./skateart.ejs', 'utf8');
const shop_page = fs.readFileSync('./shop.ejs', 'utf8');
const news_page = fs.readFileSync('./news.ejs', 'utf8');
const aboutus_page = fs.readFileSync('./aboutus.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

//サーバーオブジェクトを作る **変数＝http.createServer(関数);**
var server = http.createServer(getFromClient);

//サーバーオブジェクトを待ち受け状態にする
server.listen(3000);
console.log('Server start!');

//createServerの処理
function getFromClient(request, response) {

    var url_parts = url.parse(request.url, true);


    switch (url_parts.pathname) {

        case '/':
            response_index(request, response);
            break;

        case '/other':
            response_other(request, response);
            break;

        case '/home':
            response_home(request, response);
            break;


        case '/result':
            response_result(request, response);
            break;

        case '/skateart':
            var content = ejs.render(skateart_page, {
                title: "Skateart",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/news':
            var content = ejs.render(news_page, {
                title: "news",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;

        case '/shop':
            var content = ejs.render(shop_page, {
                title: "Shop",
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
            break;


        case '/aboutus':
            //データ用変数
            var data = {
                'BOSS 1': 'KOU SHISEI',
                'BOSS 2': 'KASHIWAGI TOMOYEAH',
                'ADDRESS': "K＆K H.Q.",
                'TEL': '090-666-666',
            }
            var content = ejs.render(aboutus_page, {
                title: "AboutUs",
                data: data,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
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

//データ用変数
var data = {
    msg: 'no message...'
};

//★indexのアクセス処理
function response_index(request, response) {

    // POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        // データ受信終了のイベント処理
        request.on('end', () => {
            data = qs.parse(body); //データのパース
            //クッキーの保存
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}
//indexのページ作成
function write_index(request, response) {
    var msg = "伝言でーす"
    var cookie_data = getCookie('msg', request);
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

//クッキーの値を設定
function setCookie(key, value, response) {
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

//クッキーの値を取得
function getCookie(key, request) {
    var cookie_data = request.headers.cookie != undefined ?
        request.headers.cookie : '';
    var data = cookie_data.split(';');
    for (var i in data) {
        if (data[i].trim().startsWith(key + '=')) {
            var result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return '';
}
var data2 = {
    'Taro': ['taro@yamada', '09-999-999', 'Tokyo'],
    'Hanako': ['hanako@flower', '09-999-999', 'Yokohama'],
    'Sachiko': ['sachi@happy', '09-999-999', 'Nagoya'],
    'Ichiro': ['ichi@baseball', '09-999-999', 'USA'],
}
//★otherのアクセス処理
function response_other(request, response) {
    var msg = "これはOtherページです。"
    var content = ejs.render(other_page, {
        title: "Other",
        content: msg,
        data: data2,
        filename: 'data_item',
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
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
