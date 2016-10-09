# wp-frontplate

フロントエンド開発の効率を上げるテンプレートのWordpress版

[CHANGELOG](https://github.com/frontainer/wp-frontplate/blob/master/CHANGELOG.md)

## Dependence

* [NodeJS](https://nodejs.org/) 5.0以上
* [frontplate-cli](https://www.npmjs.com/package/frontplate-cli)
* [Docker for Mac](https://docs.docker.com/docker-for-mac/) または [Docker for Windows](https://docs.docker.com/docker-for-windows/)

## Get Started

frontplate-cliをインストールします。

```
npm i frontplate-cli -g
```

次にプロジェクトを生成します。

```
frp create my-wp-app --preset wp
```

ダウンロードとインストールが完了したら、できたプロジェクトに移動し、`npm start` コマンドを実行します。

```
cd my-wp-app
npm start
```

以上で起動完了です。その他のコマンドは [frontplate](https://github.com/frontainer/frontplate) のREADMEを参照してください

## ビルド

```
npm run build
```

## サーバー起動&ファイル監視

```
npm run serve
```

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

## Dependencies documentation

このテンプレートは[frontplate](https://github.com/frontainer/frontplate)と[frontplate-cli](https://github.com/frontainer/frontplate-cli)がベースになっています。

詳細なドキュメントはそれぞれのドキュメントを参照してください。

[frontplate](https://github.com/frontainer/frontplate)
[frontplate-cli](https://github.com/frontainer/frontplate-cli)
