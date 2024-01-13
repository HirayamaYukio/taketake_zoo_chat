/*
 メインファイル。
 全体の流れ:
 1. タイマーの設定
   ブラウザの読み込みを待つためにワンショットタイマでディレイを掛ける
   (ホントは読み込み完了イベントの検知で発火させたほうがいい)
 2. 初期チャットへの置換処理(initChangeChatName();のcall)
    初期表示されたチャットへ名前変換の処理を行う(50行くらい)
 3. 定期的に実行する名前変換処理を登録する
    チャットが更新される(正確にはdocument.getElementById('root')以下)と
    最新から数個のチャットに対して処理をする
 ! 拡張機能を止めるときはChromeの管理機能からして下さい。
*/

console.log("taketakeスプリクトの読み込み成功");

/*
 共通変数
*/
const const_noname = "ThisNameIsNotOnTheList";
// ユーザークラス格納配列
let userClassList = [];
// 先頭名初期読み込み
var init_firstname_array = firstname_str.split(/,/);
// 先頭名管理クラス初期化
var firstnameClass = new FirstnameClass(init_firstname_array);
// 動物名初期読み込み
const animal_args = animal_str.split(/\n/);



/*
  監視設定
*/
//  監視登録
var observer = new MutationObserver(function(){
	// 定期チャット名変更
	periodicChangeChatName();
});

// 監視要素
const elem = document.getElementById('root');
const config = { 
  attributes: false, // ノードの属性変化を監視するかどうか
  childList: true, // 	子ノードの変化も監視するかどうか
  characterData: true, // ノードのデータ変化を監視するかどうか
  subtree: true, // 子孫ノードの変化も監視するかどうか
};

/*
  タイマーのコールバック関数と宣言
*/
//タイマー登録で初回処理をした後に、定期状態監視を登録する
const log = function(){
    // 初回の名前変更
    initChangeChatName();
    // 監視の登録
    observer.observe(elem, config);
    console.log(`regist observe`);

};

// ブラウザ読み込み後すぐだと動かないのでDelay
setTimeout(log, 3000);


/*
  ここから共通関数
*/
/** 初期表示チャット名置換関数 */
function initChangeChatName() {
    // チャット一覧を取得
    var elements_list = document.getElementsByClassName('chat-line__message');

    // 取得したチャット全てに初期処理
    Array.prototype.forEach.call(elements_list, (value, index) => {
      try{
          var display_name = value.getElementsByClassName('chat-author__display-name');
          var display_name_str = display_name[0].textContent; // 名前の文字列だけを抽出
          // textContentが取得できない場合は非チャットとして処理をスキップ
          //console.log(`OUT PUT will replace: ${animal[0].outerHTML}`);
          //console.log(`OUT PUT will replace: ${animal[0].textContent}`);
          var tmp_name = "ustreamer-12345";
	  var hit_flg = false;
	  // UserClassListを確認して名前を変更したことがあるか確認
	  userClassList.forEach(instance => {
		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(display_name_str) && !hit_flg) throw "This name processed";

		  // リストにすでに名前あり
		  if (instance.confDefaultName(display_name_str) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }
	  });

	  // 配信者のチャットの場合はそれとわかるようにする
	  if(display_name_str == "たけっちノームコア" && delete_target[0].textContent == " (usttakecchi9)"){
		  tmp_name = "でもでもでもでも👑たけっちさん";
	  }else if(!hit_flg){
	          // リストに名前がなければ動物名生成とユーザー配列に新しく追加
		  tmp_name = createAnimalName();
		  var userClass = new UserClass(display_name_str,tmp_name);
		  userClassList.push(userClass);
	  } 
 
	 // チャット欄の名前を置き換える
         display_name[0].textContent = tmp_name;

	  // IDがある場合は削除
          var delete_target = value.getElementsByClassName('chat-author__intl-login');
	  if (delete_target != null ){
              delete_target[0].textContent = "";
	  }
      }catch (e){
          // delete_targetがない人が大体なので、ここのlogが大量に出る
          //console.log(`Into catch e-> : ${e}`);

      }
    });
}

/** 定期チャット名置換関数 */
function periodicChangeChatName() {
    var elements_list = document.getElementsByClassName('chat-line__message');
    var elements_size = elements_list.length;
    
    // とりあえず定期実行は最大5回しか回さないようにする
    for (let i = 0; i < 5; i++) {
      try{
	  // 後ろから回したいから新しいindexを作成
	  var index = elements_size -i ;
          //var animal = elements_list[index].getElementsByClassName('chat-author__display-name');
          var display_name = elements_list[index].getElementsByClassName('chat-author__display-name');
          // textContentが取得できない場合は非チャットとして処理をスキップ
          var tmp_name = "ustreamer-12345";
	  var hit_flg = false;
          var display_name_str = display_name[0].textContent;
	  // UserClassListを確認して名前を変更したことがあるか確認
	  userClassList.forEach(instance => {
		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(display_name_str) && !hit_flg) throw "This name processed";

		  // リストにすでに名前あり
		  if (instance.confDefaultName(display_name_str) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }
	  });

	  // 配信者のチャットの場合はそれとわかるようにする
	  if(display_name_str == "たけっちノームコア" && delete_target[0].textContent == " (usttakecchi9)"){
		  tmp_name = "でもでもでもでも👑たけっちさん";
	  }else if(!hit_flg){
	      // リストに名前がなければ動物名生成とユーザー配列に新しく追加
		  tmp_name = createAnimalName();
		  var userClass = new UserClass(display_name_str,tmp_name);
		  userClassList.push(userClass);
	  } 
 
	 // チャット欄の名前を置き換える
         display_name[0].textContent = tmp_name;

	  // IDがある場合は削除
          var delete_target = elements_list[index].getElementsByClassName('chat-author__intl-login');
	  if (delete_target != null ){
              delete_target[0].textContent = "";
	  }
      }catch (e){
          //console.log(`Into catch e-> : ${e}`);

      }
     }
}

/** 新しい動物の名前を生成する関数 */
// arg : なし
// return : 動物名 (string)
function createAnimalName() {
	var result = "ustreamer-23456";

	try{
  	    // 絵文字をランダムな数字で持ってくる
            var animal_name =  animal_args[Math.floor(Math.random()* animal_args.length)]	
	
            if (firstnameClass.isListEmpty()) {
	        // 先頭につける文字をランダムで取得
	        var first_name = firstnameClass.getFirstname();
	        result = first_name + animal_name + "さん";
                
	        // 取得した文字列が今後重複しないように削除
	        /*** 先頭名情報クラスを上書きしているので注意***/
	        firstnameClass = firstnameClass.deleteName(first_name);

	    }else{
	        // 先頭名が枯渇したら数字で作る
	        var first_name = firstnameClass.getNumbername();
	        result = first_name + animal_name + "さん";

	    }
	    // first_name +  持ってきた絵文字 + さんで名前を生成して返却
	    return result;

	}catch (e){
            var min = 1 ;
            var max = 99999 ;
            var number = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            return "ustreamer-" + String(number) ;

	}

}
