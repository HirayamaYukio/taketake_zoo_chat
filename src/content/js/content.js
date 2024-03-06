/*
 メインファイル。
 全体の流れ:
 1. Interval Timerの設定
   初期チャットが読み込まれるまでポーリングして、チャットがあれば1-1.を行う。
   一定時間経過して初期チャットが読み込まれなければ1-2.を行う。

    1-1. 初期チャットへの置換処理(initChangeChatName();のcall)
    初期表示されたチャットへ名前変換の処理を行う(50行くらい)
    その後、定期監視処理2.を登録して自身を停止する。
    1-2. 定期監視処理2.を登録して自身を停止する。
2. 定期監視機能はチャットが更新される(正確にはdocument.getElementById('root')以下)と
   以下の項目に対して処理を行い
  2-1.最新から数個のチャットに対してユーザー名の名前を置換する
  2-2.ポイント交換の報酬に表示されているユーザー名の名前を置換する

! 拡張機能を止めるときはChromeの管理機能からして下さい。
*/

console.log("Taketake script loaded!");

/*
 共通変数
*/
// 初期処理ポーリング時間
const const_polling_msec = 5000;
// 配信者id
var host_id = "";
// ユーザークラス格納配列
let userClassList = [];
// ベース名格納配列
let animal_args = [];
// 先頭名管理クラス初期化
let init_array =[];
var firstnameClass = new FirstnameClass(init_array);
// 報酬格納配列
let reward_args = [];
// 表示モード
var display_mode = 0;
// 共通変数初期化完了フラグ
var init_param_flg = false;

// 共通変数の初期化
initParam();


/*
  監視設定
*/
//  監視登録
var observer = new MutationObserver(function(){
	// 定期チャット名変更
	periodicChangeChatName();
	// お知らせチャット名変更
	periodicChangeNoticeName();
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
var millisec = 0;
const initInterval = function(){

    // 共通変数の初期化が完了してからチャットの初期化をする
    if (init_param_flg){
	    // チャット一覧を取得
	    // 初期チャットが読み込まれるかわからないので、初めのn秒はポーリングで監視
	    var elements_list = document.getElementsByClassName('chat-line__message');
	    if (elements_list.length != 0 && millisec < const_polling_msec ){
		// 初回の名前変更
		initChangeChatName();
		// 定期状態監視登録
		observer.observe(elem, config);
		// タイマ停止
		clearInterval(initIntervalId);
	    }else if (millisec < const_polling_msec){
		millisec += 10;
	    }else{
		// 一定時間経過後は定期状態監視登録してタイマ停止
		observer.observe(elem, config);
		clearInterval(initIntervalId);
	    }
    }

};
// 初期チャット読み込みに対応するためのポーリング処理とその後の定期監視を登録するタイマ
let initIntervalId = setInterval(initInterval, 10);


/*
 初期化関数
*/
async function initParam(){
// Host id 初期化
var hostStorage = new StorageClass("host_id");
host_id = await hostStorage.getLocalStorage();

// ベース名リスト初期化
var animalStorage = new StorageClass("animal_list");
var animal_sto_str = await animalStorage.getLocalStorage();
if (animal_sto_str == "") {
    // リストが無いなら初期値を格納
    animal_sto_str = animal_str; 
}
animal_args = animalStorage.splitComma(animal_sto_str);

// 先頭名初期化
var firstStorage = new StorageClass("first_list");
var first_str = await firstStorage.getLocalStorage();
if (first_str == "") {
    // リストが無いなら初期値を格納
    first_str = firstname_str;
}
const init_firstname_array = firstStorage.splitComma(first_str);

// 報酬リスト初期化
var rewardsStorage = new StorageClass("reward_list");
var rewards_str = await rewardsStorage.getLocalStorage();
reward_args = rewardsStorage.splitComma(rewards_str);

// 表示モード初期化
var displayModeStorage = new StorageClass("display_mode");
display_mode = Number(await displayModeStorage.getLocalStorage());

// 先頭名管理クラス初期化
firstnameClass = new FirstnameClass(init_firstname_array);

// 共通変数初期化完了
init_param_flg = true;

}

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
          var stream_id = display_name[0].getAttribute('data-a-user') // idの取得
          // textContentが取得できない場合は非チャットとして処理をスキップ
          //console.log(`OUT PUT will replace: ${animal[0].outerHTML}`);
          //console.log(`OUT PUT will replace: ${animal[0].textContent}`);
          var tmp_name = "ustreamer-12345";
	  var hit_flg = false;
	  // UserClassListを確認して名前を変更したことがあるか確認
	  userClassList.forEach(instance => {
		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(display_name_str) && !hit_flg) throw "This name processed";

		  // リストにすでにユーザーあり
		  if (instance.confSameUser(stream_id,display_name_str) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }
	  });

	  // 設定で配信者の名前はフィルタしないようにする
	  if(stream_id == host_id ){
		  tmp_name = display_name_str;
	  }else if(stream_id != host_id && !hit_flg){
	          // リストに名前がなければ動物名生成とユーザー配列に新しく追加
		  tmp_name = createAnimalName();
		  var userClass = new UserClass(stream_id,display_name_str,tmp_name);
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
          var display_name_str = display_name[0].textContent; // 表示名の取得
          var stream_id = display_name[0].getAttribute('data-a-user') // idの取得
	  // UserClassListを確認して名前を変更したことがあるか確認
	  userClassList.forEach(instance => {
		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(display_name_str) && !hit_flg) throw "This name processed";

		  // 置換後リストにすでにidもしくはnameがあるか確認する
		  if (instance.confSameUser(stream_id,display_name_str) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }
	  });

	  // 設定で配信者の名前はフィルタしないようにする
	  if(stream_id == host_id ){
		  tmp_name = display_name_str;
	  }else if(stream_id != host_id && !hit_flg){
	      // 置換後リストに名前がなければ動物名生成とユーザー配列に新しく追加
	      tmp_name = createAnimalName();
	      var userClass = new UserClass(stream_id,display_name_str,tmp_name);
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

/** お知らせチャット名置換関数 */
function periodicChangeNoticeName() {
    var elements_list = document.getElementsByClassName('user-notice-line');
    var elements_size = elements_list.length;
    
    // とりあえず定期実行は最大3回しか回さないようにする
    for (let i = 0; i < 3; i++) {
      try{
	  // お知らせチャットが0の場合は処理をスキップ
          if (elements_size < 1) throw "UserNoticeLine is None";

	  // 後ろから回したいから新しいindexを作成
	  var index = elements_size -i ;

	  // 引き換えメッセージの取得
          var notice_message = elements_list[index].getElementsByClassName('Layout-sc-1xcs6mc-0 kjARyu');
          // お知らせメッセージのinnerHTMLを取得
	  var innerHTML =  notice_message[0].innerHTML;


	  // お知らせ情報クラスを作成
	  var noticeClass = new NoticeClass(notice_message[0].textContent,reward_args);

	  var hit_flg = false;
	  var tmp_name = "ustreamer-12345";
          //var display_name_str = display_name[0].textContent;
	  // UserClassListを確認して置換後リストにidがあるか確認
	  userClassList.forEach(instance => {

		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(noticeClass.display_name) && !hit_flg) throw "This name processed";

		  // 置換後リストにすでにidもしくはnameがあるか確認する
		  if (instance.confSameUser("",noticeClass.display_name) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }

	  });

	  if(!hit_flg){
	      // 置換後リストに名前がなければ動物名生成とユーザー配列に新しく追加
	      // (ただし、idは取れないのでダミーを格納)
	      tmp_name = createAnimalName();
	      // stream_idはお知らせチャットから取れないのでblank
	      var userClass = new UserClass("",noticeClass.display_name,tmp_name);
	      userClassList.push(userClass);
	  } 
	 // 置換後お知らせメッセージを作成
	 if (noticeClass.init_flg){
	     result_msg = tmp_name + noticeClass.split_msg;
	     // innerHTML内のテキストを置換
	     var result_innerHTML = innerHTML.replace(noticeClass.getDisplayMsg(), result_msg);
	     //お知らせメッセージを置換
             notice_message[0].innerHTML = result_innerHTML;
	 }else{
             // noticeClassの初期化に失敗してたらエラー表示
             console.log("noticeClass initFlg is False");
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

            switch (display_mode){
	        case 0:
                    // 数字モードで生成
                    result = createNumberName();
	            return result;
                    break;
	        case 1:
                    // 先頭名モードで生成
                    result = createFirstName();
	            return result;
                    break;
	        default:
                    throw "Out of range Exeption";
                    break;
	   }

	}catch (e){
            console.log(`Into catch e-> : ${e}`);
            var min = 1 ;
            var max = 99999 ;
            var number = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            return "ustreamer-" + String(number) ;

	}

}

/** 先頭名で動物の名前を生成する関数 */
// arg : なし
// return : 動物名 (string)
function createFirstName() {
	var result = "ustreamer-23456";

	try{
  	    // 絵文字をランダムな数字で持ってくる
            var animal_name =  animal_args[Math.floor(Math.random()* animal_args.length)]	
	
            if (firstnameClass.isListEmpty()) {
	        // 先頭につける文字をランダムで取得
	        var first_name = firstnameClass.getFirstname();
	        result = first_name + animal_name;
                
	        // 取得した文字列が今後重複しないように削除
	        /*** 先頭名情報クラスを上書きしているので注意***/
	        firstnameClass = firstnameClass.deleteName(first_name);

	    }else{
	        // 先頭名が枯渇したら数字で作る
	        result = createNumberName();

	    }
	    // first_name +  持ってきた絵文字 で名前を生成して返却
	    return result;

	}catch (e){
            var min = 1 ;
            var max = 99999 ;
            var number = Math.floor( Math.random() * (max + 1 - min) ) + min ;
            return "ustreamer-" + String(number) ;

	}

}

/** 数字モードで新しい動物の名前を生成する関数 */
// arg : なし
// return : 動物名 (string)
function createNumberName() {
	var result = "ustreamer-23456";

	// 絵文字をランダムな数字で持ってくる
	var animal_name =  animal_args[Math.floor(Math.random()* animal_args.length)]	

	// 末尾の文字列を生成
	var number_str = firstnameClass.getNumbername();
	result = animal_name + number_str;

	// 持ってきた絵文字 + 数字で名前を生成して返却
	return result;
}
