console.log("popup.js is loaded");

/*
  ローカル設定のロードとpopup画面の初期化
*/
// Host idの初期化
chrome.storage.local.get(['host_id'], function (value) {
    if (typeof value.host_id === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
	var host_input = document.getElementById("host_id");
	host_input.value = "";
        // 初期保存処理
        chrome.storage.local.set({'host_id': "" }, function () { });

    } else {
	// ロードした内容をinput textに書き込み
	var host_input = document.getElementById("host_id");
	host_input.value = value.host_id;
    }
});
// ベース名の初期化
chrome.storage.local.get(['animal_list'], function (value) {
    if (typeof value.animal_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        console.log("init none");
        // htmlのテキストにセット
	var animal_input = document.getElementById("animal_text");
	animal_input.value = animal_str;

        // 初期保存処理
            chrome.storage.local.set({'animal_list': animal_input.value }, function () { });
	
     }else {
	// ロードした内容をinput textに書き込み
	var animal_input = document.getElementById("animal_text");
	animal_input.value = value.animal_list;
    }
});

// 先頭名の初期化
chrome.storage.local.get(['first_list'], function (value) {
    if (typeof value.first_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
	var first_input = document.getElementById("first_text");
	first_input.value = firstname_str;

        // 初期保存処理
        chrome.storage.local.set({'first_list': first_input.value }, function () { });
	
    } else {
	// ロードした内容をinput textに書き込み
	var first_input = document.getElementById("first_text");
	first_input.value = value.first_list;
    }
});

// Rewardsの初期化
chrome.storage.local.get(['reward_list'], function (value) {
    if (typeof value.reward_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
	var reward_input = document.getElementById("reward_text");
	reward_input.value = "";

        // 初期保存処理
        chrome.storage.local.set({'reward_list': "" }, function () { });
	
    } else {
	// ロードした内容をinput textに書き込み
	var reward_input = document.getElementById("reward_text");
	reward_input.value = value.reward_list;
    }
});

// 表示モードの初期化
chrome.storage.local.get(['display_mode'], function (value) {
    if (typeof value.display_mode === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
	var display_select = document.getElementById("display_mode");
	display_select.value = "0";

        // 初期保存処理
        chrome.storage.local.set({'display_mode': display_select.value }, function () { });
	
    } else {
	// ロードした内容でselectを変更
	var display_select = document.getElementById("display_mode");
	display_select.value = value.display_mode;
	var index = Number(value.display_mode);
	display_select[index].selected = true;
    }
});

/*
 * popup.htmlにあるボタンのクリックイベント
 */
// ベースの名前リストのコピーボタン
document.getElementById("copy_host").addEventListener("click",()=>{

 const cb = new ClipboardJS('button#copy_host');
 cb.on("success", function(e){
     console.log('Copied Successfully.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });
 cb.on("error", function(e) {
     console.error('Failed to Copy.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });

}, false);

// ベースの名前リストのコピーボタン
document.getElementById("copy_animal").addEventListener("click",()=>{

 const cb = new ClipboardJS('button#copy_animal');
 cb.on("success", function(e){
     console.log('Copied Successfully.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });
 cb.on("error", function(e) {
     console.error('Failed to Copy.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });

     //console.log("click!!!");  // 出力は、「ポップアップを検証」で見れる。
}, false);

//先頭名前リストのコピーボタン
document.getElementById("copy_first").addEventListener("click",()=>{

 const cb = new ClipboardJS('button#copy_first');
 cb.on("success", function(e){
     console.log('Copied Successfully.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });
 cb.on("error", function(e) {
     console.error('Failed to Copy.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });

     //console.log("click!!!");  // 出力は、「ポップアップを検証」で見れる。
}, false);

//報酬リストのコピーボタン
document.getElementById("copy_rewards").addEventListener("click",()=>{

 const cb = new ClipboardJS('button#copy_rewards');
 cb.on("success", function(e){
     console.log('Copied Successfully.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });
 cb.on("error", function(e) {
     console.error('Failed to Copy.', e);
     setTimeout(()=>{
         console.log("time out");  // 出力は、「ポップアップを検証」で見れる。
     },3000);
 });

     //console.log("click!!!");  // 出力は、「ポップアップを検証」で見れる。
}, false);

// host idのクリアボタン
document.getElementById("delete_host").addEventListener("click",()=>{

	var host_input = document.getElementById("host_id");
	host_input.value = "";

}, false);

// ベース名リストのクリアボタン
document.getElementById("delete_animal").addEventListener("click",()=>{

	var animal_input = document.getElementById("animal_text");
	animal_input.value = "";

}, false);

// 先頭名リストのクリアボタン
document.getElementById("delete_first").addEventListener("click",()=>{

	var animal_input = document.getElementById("first_text");
	animal_input.value = "";

}, false);

// 報酬リストのクリアボタン
document.getElementById("delete_rewards").addEventListener("click",()=>{

	var reward_input = document.getElementById("reward_text");
	reward_input.value = "";

}, false);

// 設定保存ボタン
document.getElementById("storage_save").addEventListener("click",()=>{

	// host idのテキスト取得
	var host_id = document.getElementById("host_id");
        // host id保存処理
        chrome.storage.local.set({'host_id': host_id.value }, function () {
        });

        // ベース名リストのテキストを取得
	var animal_input = document.getElementById("animal_text");
        // ベース名保存処理
        chrome.storage.local.set({'animal_list': animal_input.value }, function () {
        });

        // 先頭名リストのテキストを取得
	var first_input = document.getElementById("first_text");
        // 保存処理
        chrome.storage.local.set({'first_list': first_input.value }, function () {
        });

	// 報酬リストのテキスト取得
	var reward_list = document.getElementById("reward_text");
        // reward_list保存処理
        chrome.storage.local.set({'reward_list': reward_list.value }, function () {
        });

        // 表示モードを取得
	var display_select = document.getElementById("display_mode");
        // 保存処理
        chrome.storage.local.set({'display_mode': display_select.value }, function () {
        });

}, false);
