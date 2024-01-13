console.log("taketakeスプリクトの読み込み成功");
// チャットリストの配列を生成
//
//
//
//
//
// CONST
const const_noname = "ThisNameIsNotOnTheList";

// ユーザークラス格納配列
let userClassList = [];
// ファイルからテンプレートの読み込み
//console.log(animal_args);
//const const_animal_list =  JSON.parse(animal_json.random_name);


//  監視登録
var observer = new MutationObserver(function(){
	// 定期チャット名変更
	periodicChangeChatName();
});

// 監視要素
const elem = document.getElementById('root');
//const elem = document.querySelectorAll('.chat-line__message');
console.log(`OUT PUT observe : ${elem}`);

const config = { 
  attributes: false, // ノードの属性変化を監視するかどうか
  childList: true, // 	子ノードの変化も監視するかどうか
  characterData: true, // ノードのデータ変化を監視するかどうか
  subtree: true, // 子孫ノードの変化も監視するかどうか
};


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


/** チャット名置換関数 */
function initChangeChatName() {
    // チャット一覧を取得
    var elements_list = document.getElementsByClassName('chat-line__message');

    // 取得したチャット全てに初期処理
    Array.prototype.forEach.call(elements_list, (value, index) => {
      try{
          var display_name = value.getElementsByClassName('chat-author__display-name');
          // textContentが取得できない場合は非チャットとして処理をスキップ
          //console.log(`OUT PUT will replace: ${animal[0].outerHTML}`);
          //console.log(`OUT PUT will replace: ${animal[0].textContent}`);
          var tmp_name = "ustreamer-12345";
	  var hit_flg = false;
	  // UserClassListを確認して名前を変更したことがあるか確認
	  userClassList.forEach(instance => {
		  // 動物の名前になっていたら処理を1ループスキップ
		  if (instance.confAnimalName(display_name[0]) && !hit_flg) throw "This name processed";

		  // リストにすでに名前あり
		  if (instance.confDefaultName(display_name[0]) && !hit_flg){
		      tmp_name = instance.getAnimalName();
	              hit_flg = true;
		  }
	  });

	  // リストに名前がなければ動物名生成とユーザー配列に新しく追加
          if(hit_flg == false){
		  tmp_name = createAnimalName(1);
		  var userClass = new UserClass(display_name[0],tmp_name);
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
          console.log(`Into catch e-> : ${e}`);

      }
    });
}

/** 定期チャット名置換関数 */
function periodicChangeChatName() {
    var elements_list = document.getElementsByClassName('chat-line__message');
    var elements_size = elements_list.length;
    
    // とりあえず定期実行は10回しか回さないようにする
    for (let i = 0; i < 10; i++) {
      try{
	  // 後ろから回したいから新しいindexを作成
	  var index = elements_size -i ;
          var animal = elements_list[index].getElementsByClassName('chat-author__display-name');
          // textContentが取得できない場合は非チャットとして処理をスキップ
          var tmp_name = "ustreamer-12345";
          if (animal[0].textContent != tmp_name){
              animal[0].textContent = tmp_name;
          }

	  // IDがある場合は削除
          var delete_target = elements_list[index].getElementsByClassName('chat-author__intl-login');
	  if (delete_target != null ){
              delete_target[0].textContent = "";
	  }
      }catch (e){
          //console.log(`Into catch e-> : ${e}`);

      }
     }
    //});
}

/** 新しい動物の名前を生成する関数 */
// arg1 : インクリメントナンバー
// return : 動物名
function createAnimalName(number) {
	// TODO とりあえずランダムに1つ返すようにする
        console.log(`length -> : ${animal_args.length}`);

	// 絵文字をランダムな数字で持ってくる
        var animal_name =  animal_args[Math.floor(Math.random()* animal_args.length)]	
	
	// 先頭につける文字をランダムで取得
	var first_namber = Math.floor(Math.random()* firstname_args.length);
	var first_name = firstname_args[first_namber];

	
	// 先頭の文字列は取得できたら削除して被らないようにする
	
	// first_name +  持ってきた絵文字 + さんで名前を生成して返却
	return animal_args[number];

}

