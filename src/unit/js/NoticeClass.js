// お知らせ情報クラス
class NoticeClass {

    constructor(message,reward_array) {
        this.message = message;
        this.display_name = "Listener";
        this.split_msg = "";
	this.init_flg = this.initSplitMsg(message,reward_array);
    }

    /** 渡されたメッセージからidとそれ以降のメッセージを分割する関数 */
    // arg1 : オリジナルのメッセージ
    // arg2 : 報酬メッセージのリスト
    // return : なし
    initSplitMsg(message,reward_array) {
        // [display_name]が***を引き換えました の形式でidとmsgを分割して初期化
	 try{
             for (let i = 0; i < reward_array.length; ++i) {
	     // 先頭から配列にある報酬メッセージでdisplay_nameを除外した文章を作成
                 let tmp_msg = "が"+ reward_array[i] + "を引き換えました"
                 let tmp_result = message.split(tmp_msg);
		 // 登録されている文言にヒットしたら、表示名とメッセージを格納
                 if(tmp_result.length == 2){
                     this.display_name = tmp_result[0];
                     this.split_msg = tmp_msg;
                     return true;
                 }
             }
             return false;

	 }catch (e){
             console.log(`NoticeClass init failed -> : ${e}`);
             return false;
	 }
    
    }

    /** 置換前の表示メッセージを返却する関数 **/
    // arg1 : なし
    // return : 置換するお知らせチャットの表示メッセージ(stirng)
    getDisplayMsg() {
             return this.display_name + this.split_msg;
    
    }

}
