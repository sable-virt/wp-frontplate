# wp-frontplate

フロントエンド開発の効率を上げるテンプレートのWordpress版

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

[frontplate](https://github.com/frontainer/frontplate) の構成に以下のフォルダが追加されます。

```
/docker - コンパイルされたデータが入っている
┃┣ /mysql
┃┃  ┣ Dockerfile - MySQLのDockerfile
┃┃  ┗ my.cnf - MySQLの基本設定ファイル
┃┣ /nginx
┃┃  ┣ default.conf - Nginxのサーバー設定
┃┃  ┣ Dockerfile - NginxのDockerfile
┃┃  ┗ nginx.cnf - Nginxの基本設定ファイル
┃┗ /phpfpm
┃    ┣ Dockerfile - php-fpmのDockerfile
┃    ┣ entrypoint.sh - php-fpm起動スクリプト
┃    ┗ php-fpm.conf - php-fpmの基本設定ファイル
/sql - SQLファイルを格納するフォルダ
/wp - Wordpressのファイル群を入れるフォルダ
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

## MySQLエクスポート

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

## MySQLインポート

SQLファイルをもとにデータをインポートする場合は次のコマンドを実行します。

```
docker exec -it プロジェクト名_mysql_1 bash -c "mysql -uroot -ppassword DB名 < /docker-entrypoint-initdb.d/mysql.dump.sql"
```

## MySQLの再構築

**【注意】 このコマンドを実行するとデータベースの内容はすべてクリアされます **

`sql/xxxx.sql` のようにSQLファイルを配置します。

次のコマンドを実行します。
```
docker-compose down
npm start
```

sql以下に配置されたSQLをインポートした新しいデータベースが作成されます。
