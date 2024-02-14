// 設定情報クラス
class StorageClass {

    constructor(key) {
        this.key = key;
    }

    /** 保存するkeyの取得 **/
    // arg1 : なし
    // return : keyの返却
    getKey() {
        return this.key;
    }

    /** 自身をstorageに保存する **/
    // arg1 : なし
    // return : なし
    saveStorage(value) {
        // 保存処理
	savekey = this.key;
        chrome.storage.local.set({savekey: value }, function () { });
    }

    /** 自身のkeyのものをstorageから取得する**/
    // arg1 : なし
    // return : keyで取得したvalue
    getStorage() {

      var result = "None";
      chrome.storage.local.get([this.key], function (value) {
	    if (typeof value.messages === 'undefined') {
                result = "None";
		console.log("getStorage not initilized");
	    } else {
		// ロードした内容をinput textに書き込み
		//value.messages.push(message);
		result = value.messages;
	    }
      });
      return result;
    }

    /** カンマ区切りの文字列を配列にする関数(重複は削除)**/
    // arg1 : 文字列(カンマ区切り)
    // return : 分割後の配列
    splitComma(arg_str) {
        var array =  arg_str.split(/,/);
        // 先頭名配列を重複削除して初期化
        var result_array = array.filter((element, index) => {
            return array.indexOf(element) == index;
        })
	return result_array;
    }
}
