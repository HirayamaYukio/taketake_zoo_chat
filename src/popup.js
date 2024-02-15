console.log("popup.js is loaded");

/*
  ローカル設定のロードとpopup画面の初期化
*/
// Host idの初期化
chrome.storage.local.get(['host_id'], function (value) {
    if (typeof value.host_id === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        // htmlのテキストにセット
	var host_input = document.getElementById("host_id");
	host_input.value = "";

        // 初期保存処理
            chrome.storage.local.set({'host_id': "" }, function () {
        });
	
    } else {
	// ロードした内容をinput textに書き込み
        //value.messages.push(message);
        console.log("loaded date ->" + value.host);
        // htmlのテキストにセット
	var host_input = document.getElementById("host_id");
	host_input.value = value.host_id;
    }
    // 保存処理
        //chrome.storage.local.set({'messages': value.messages }, function () {
    //});
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
            chrome.storage.local.set({'animal_list': animal_input.value }, function () {
        });
	
    } else {
	// ロードした内容をinput textに書き込み
        //value.messages.push(message);
        console.log("loaded date ->" + value.animal_list);
        // htmlのテキストにセット
	var animal_input = document.getElementById("animal_text");
	animal_input.value = value.animal_list;
    }
    // 保存処理
        //chrome.storage.local.set({'messages': value.messages }, function () {
    //});
});

// 先頭名の初期化
chrome.storage.local.get(['first_list'], function (value) {
    if (typeof value.first_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        console.log("init none");
        // htmlのテキストにセット
	var first_input = document.getElementById("first_text");
	first_input.value = firstname_str;

        // 初期保存処理
        chrome.storage.local.set({'first_list': first_input.value }, function () {
        });
	
    } else {
	// ロードした内容をinput textに書き込み
        //value.messages.push(message);
        console.log("loaded date ->" + value.first_list);
        // htmlのテキストにセット
	var first_input = document.getElementById("first_text");
	first_input.value = value.first_list;
    }
    // 保存処理
        //chrome.storage.local.set({'messages': value.messages }, function () {
    //});
});

// 保存
/*
chrome.storage.local.set({'messages': value}, function () {
    console.log(value.messages);
});
*/

// 表示モードの初期化
chrome.storage.local.get(['display_mode'], function (value) {
    if (typeof value.display_mode === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        console.log("init none");
        // htmlのテキストにセット
	var display_select = document.getElementById("display_mode");
	display_select.value = "1";
	//display_select[1].selected = true;

        // 初期保存処理
            chrome.storage.local.set({'display_mode': display_select.value }, function () {
        });
	
    } else {
	// ロードした内容でselectを変更
        //value.messages.push(message);
        console.log("loaded date ->" + value.display_mode);
        // htmlのにセット
	var display_select = document.getElementById("display_mode");
	display_select.value = value.display_mode;
	var index = Number(value.display_mode);
	    // TODO バッグてる？
	display_select[index].selected = true;
    }
    // 保存処理
        //chrome.storage.local.set({'messages': value.messages }, function () {
    //});
});

/*
 * popup.htmlのロードイベント
 */
// 保存した設定にあるベース名リストと先頭名リストをテキストボックにいれる
window.addEventListener('load',()=>{

// Storage
//var StorageClass = new StorageClass("test_key1", "test_value1");

})





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

// 設定保存ボタン
document.getElementById("storage_save").addEventListener("click",()=>{

	// host idのテキストソ取得
	var host_id = document.getElementById("host_id");
        // host id保存処理
        chrome.storage.local.set({'host_id': host_id.value }, function () {
        });

        // ベース名リストのテキストを取得
	var animal_input = document.getElementById("animal_text");
	//animal_input.value = animal_str;
        // ベース名保存処理
        chrome.storage.local.set({'animal_list': animal_input.value }, function () {
        });

        // 先頭名リストのテキストを取得
	var first_input = document.getElementById("first_text");
	//animal_input.value = animal_str;
        // 保存処理
        chrome.storage.local.set({'first_list': first_input.value }, function () {
        });

        // 表示モードを取得
	var display_select = document.getElementById("display_mode");
	//animal_input.value = animal_str;
        // 保存処理
        chrome.storage.local.set({'display_mode': display_select.value }, function () {
        });

}, false);
