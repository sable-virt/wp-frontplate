# wp-frontplate

フロントエンド開発の効率を上げるテンプレートのWordpress版

** Version4.0.0 beta-1 **

- ※ Node.js 5.0以上が必要です

[CHANGELOG](https://github.com/frontainer/frontplate/blob/master/CHANGELOG.md)

[過去バージョン](https://github.com/frontainer/frontplate/releases)

## Feature

- HTMLモジュール（EJS）
- SASS
- SASSLint
- ES2015
- スプライト画像の作成とSassファイルの出力
- JS/CSSの圧縮と最適化
- CSSのベンダープレフィックス付与自動化
- 非対応CSSプロパティアラート
- ユニットテスト（Mocha/PowerAssert）
- LiveReload
- ESLint
- HTMLHint
- JS/CSSソースマップ
- DockerによるWordpress開発環境

## Dependence

* [NodeJS](https://nodejs.org/) 5.0以上
* [Docker for Mac](https://docs.docker.com/docker-for-mac/) または [Docker for Windows](https://docs.docker.com/docker-for-windows/)

## 構成

```
package.json - nomパッケージ設定ファイル
frp.config.js - テンプレートの全体の設定ファイル。出力先や各タスクの設定を記述
/public - コンパイルされたデータが入っている
/config - 設定用フォルダ
  ┣ copy.config.js
  ┣ html.config.js
  ┣ image.config.js
  ┣ server.config.js
  ┣ sprite.config.js
  ┣ style.config.js
  ┣ test.conf.js
  ┣ webpack.config.js
  ┣ webpack.config.production.js
  ┗ webpack.core.js
/wp - Wordpressのファイル群を入れるフォルダ
/src - 開発用フォルダ
  ┣ /images - 画像を入れるフォルダ。public/pc/imagesに複製される
  ┣ /js - JSフォルダ。ES6で書ける。直下にあるJSは
  ┃  ┣ app.js - public/pc/js/app.jsとして出力される
  ┃  ┗ /modules
  ┃     ┗ hoge.js - ここファイルは出力されないが変更は監視される
  ┣ /lib - ライブラリフォルダ。外部ライブラリ等を置く。public/pc/libに複製される
  ┣ /sass - sassフォルダ。ファイル名が_(アンダースコア)で始まっていないscssはpublic/pc/cssに出力される
  ┣ /sprites - スプライト生成フォルダ。ここに作ったフォルダがsass/sprites/_フォルダ名.scssとして出力される
  ┃  ┗ /icon - スプライト画像を入れるフォルダ。class="icon icon-ファイル名"で参照されるので英数字推奨
  ┣ /test - テストコードを置くフォルダ。ここにおいたファイルはテストコードとして実行される
  ┗ /view - ビューファイル(ejs)を置くフォルダ。ファイル名が_(アンダースコア)で始まっていないejsはpublic/pcに出力される
      ┣ index.ejs - public/pc/index.htmlとして出力される
      ┗ parts/
         ┣ _header.ejs - アンダースコアから始まるファイルは出力されない
         ┗ sub.ejs - public/pc/parts/sub.htmlとして出力される
```

## Get Started

[Wordpress](https://ja.wordpress.org/) をダウンロードし、wpフォルダに配置します。

次のコマンドを実行して必要なファイルをインストールします。

```
npm i
```

続いて次のコマンドを実行して、ビルド・サーバーを起動します。

```
npm start
```

その他のコマンドは [frontplate](https://github.com/frontainer/frontplate) のREADMEを参照してください

## DB Dump

次のコマンドを実行し、`プロジェクト名_mysql_1`というコンテナが起動していることを確認します。

```
docker ps
```

コンテナ名を記憶したら、次のコマンドを実行します。 

※ プロジェクト名_mysql_1の部分は前記のコマンドで確認したものに置き換えてください
※ DB名の部分はWordpressを設置したデータベース名に置き換えてください
※ ユーザー名やパスワードも適宜変更してください

```
docker exec -it プロジェクト名_mysql_1 bash -c "mysqldump -uroot -ppassword DB名 –add-drop-table > /docker-entrypoint-initdb.d/mysql.dump.sql"
```

`sql/mysql.dump.sql` というファイルが出力されます。

## DB Import

SQLファイルをもとにデータをインポートする場合は次のコマンドを実行します。

```
docker exec -it プロジェクト名_mysql_1 bash -c "mysql -uroot -ppassword DB名 < /docker-entrypoint-initdb.d/mysql.dump.sql"
```

## DB Rebuild

※ このコマンドを実行するとデータベースの内容はすべてクリアされます

`sql/xxxx.sql` のようにSQLファイルを配置します。

次のコマンドを実行します。
```
docker-compose down
npm start
```

sql以下に配置されたSQLをインポートした新しいデータベースが作成されます。
