
手順 2015.06.03
追記 2015.11.10 モジュールコピペ用のところに2つのモジュール追加

① bitbucketから、 grunt_first_kit_02 を任意のローカルディレクトリ（作業ディレクトリ）にクローンする
② grunt-cliをインストールする npm install -g grunt-cli
③ Bowerのインストール npm install -g bower
④ Gruntモジュールのインストール npm init そしてだいたいenter
⑤ Bowerでパッケージのダウンロード bower init 途中、nodeにチェック入れる
⑥ gruntfile.js
⑦ 作業ディレクトリにgruntのインストール npm install grunt --save-dev
⑧ grunt とコマンド打つと、足りないモジュールのエラーが出てくるので モジュールをインストールする npm install モジュール名 -save-dev --save-devつけること。pacage.jsonに自動追記してもらうため。 ※必要なモジュールメモ npm install assemble grunt-contrib-connect grunt-ect grunt-contrib-compass grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-watch grunt-open ・コピペ用 npm install assemble grunt-contrib-connect grunt-ect grunt-contrib-compass grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-watch grunt-open grunt-image grunt-newer --save-dev
・コピペ用単体ver⇒ npm install assemble -save-dev npm install grunt-contrib-connect -save-dev npm install grunt-ect -save-dev npm install grunt-contrib-compass -save-dev npm install grunt-contrib-concat -save-dev npm install grunt-contrib-cssmin -save-dev npm install grunt-contrib-watch -save-dev npm install grunt-open -save-dev npm install grunt-image --save-dev npm install grunt-contrib-newer --save-dev
npm install grunt-contrib-cssmin -save-dev
npm install grunt-open -save-dev
npm install assemble -save-dev
npm install grunt-contrib-connect -save-dev
/ grunt-contrib-○○のモジュールをインストールする npm install grunt-contrib -save-dev ⇒これだとデータ多すぎるので、やはりひとつひとつ /
⑨ 多分これでいける


追加 2015.11.10
① 画像圧縮の自動化のため、追記した。
for文でgruntが名前の頭につくモジュールの読み込みしていたけど
指定読み込みがしたくなったので、ベタ書きに変更した。
②必要なモジュール
npm install --save-dev grunt-image
npm install --save-dev grunt-newer
