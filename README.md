## Docker + React App + API Express + MySQL

このプロジェクトのフロントエンド実装は React で行う。<br/>
MySQL データベースに接続された設定済みの express API サーバー と、オプションで phpMyAdmin
をデータベース管理者としてあらかじめ設定。さらに、すべてのスタックが Docker コンテナとして動作する。

## 使用アーキテクト

- React
- mysql
- express(Sequelize)
- phpMyAdmin
- docker

```
$ npm install -g create-react-app

$ docker-compose up
```

docker-compose.yml ファイルの中で、有効な port、database のパスワード、dev/production 環境やその他の簡単な設定を必要に応じて変更する。
