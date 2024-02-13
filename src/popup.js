console.log("popup.js is loaded");

/*
 * popup.htmlのロードイベント
 */
// 保存した設定にあるベース名リストと先頭名リストをテキストボックにいれる
window.addEventListener('load',()=>{

// Storage
//var StorageClass = new StorageClass("test_key1", "test_value1");

// ベース名の初期化
chrome.storage.sync.get(['animal_list'], function (value) {
    if (typeof value.animal_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        console.log("init none");
        // htmlのテキストにセット
	var animal_input = document.getElementById("animal_text");
	animal_input.value = animal_str;
	
    } else {
	// ロードした内容をinput textに書き込み
        //value.messages.push(message);
        console.log("loaded date ->" + value.animal_list);
        // htmlのテキストにセット
	var animal_input = document.getElementById("animal_text");
	animal_input.value = value.animal_list;
    }
    // 保存処理
        //chrome.storage.sync.set({'messages': value.messages }, function () {
    //});
});

// 先頭名の初期化
chrome.storage.sync.get(['first_list'], function (value) {
    if (typeof value.first_list === 'undefined') {
        // 初回はデータが存在しないためテンプレートを入れる
        console.log("init none");
        // htmlのテキストにセット
	var animal_input = document.getElementById("first_text");
	animal_input.value = firstname_str;
	
    } else {
	// ロードした内容をinput textに書き込み
        //value.messages.push(message);
        console.log("loaded date ->" + value.first_list);
        // htmlのテキストにセット
	var animal_input = document.getElementById("first_text");
	animal_input.value = value.first_list;
    }
    // 保存処理
        //chrome.storage.sync.set({'messages': value.messages }, function () {
    //});
});

// 保存
/*
chrome.storage.sync.set({'messages': value}, function () {
    console.log(value.messages);
});
*/
})





/*
 * popup.htmlにあるボタンのクリックイベント
 */
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

// ベース名リストのクリア
document.getElementById("delete_animal").addEventListener("click",()=>{

	var animal_input = document.getElementById("animal_text");
	animal_input.value = "";

}, false);

// 先頭名リストのクリア
document.getElementById("delete_first").addEventListener("click",()=>{

	var animal_input = document.getElementById("first_text");
	animal_input.value = "";

}, false);
