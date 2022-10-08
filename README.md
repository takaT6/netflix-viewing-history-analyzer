# netflix-viewing-history-analyzer
Netflix Viewing History Analyzer Service.


Vue.jsに触れてみる第二弾です。

ネットフリックス公式サイトからダウンロードできる視聴履歴を読み込ませると、試聴したドラマ/映画/アニメをまとめて、タイトルで一覧化します。シリーズ系はクリックで試聴したエピソードと日付を確認できます。

映画情報に関しては下記のAPIを使用しています。

映画情報取得API => TMDB(THE MOVIE DATA BASE) https://www.themoviedb.org/documentation/api

vue-routerでルートを制御し、より動的なComponentの切り替えを実装してます。

# DEMO
domo => https://heretics-of-nagasaki.com/netflix-analyzer/#upload

*視聴履歴はWeb版Netflix公式サイトからダウンロードしてください
<img width="730" alt="スクリーンショット 2022-07-13 16 53 37" src="https://user-images.githubusercontent.com/77357587/188393627-4df7f466-ac4c-4640-9967-f28adf01178b.png">

 
# Requirement
 
* webpack 5.72.1
* webpack-cli 4.9.2
* webpack-dev-server 4.9.1
* typescript 4.7.2
* ts-loader 9.3.0
* vue-router 4.0.16
* .
* .
Please see "package.json".

# Installation
```bash
# install dependencies
npm install
```
 
# Usage
 
```bash
# app build
npm run build

# serve with hot reload
npm run start
```

