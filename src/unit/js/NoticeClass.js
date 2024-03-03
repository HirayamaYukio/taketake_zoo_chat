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
                 let tmp_message = message.split(tmp_result[0]);
		 var result_message = tmp_message[1]
	         // 作成した文章を使って比較して、ヒットするものがあれば格納してbreak
                 if(tmp_result.length == 2){
                     this.display_name = tmp_result[0];
                     this.split_msg = result_message;
                     return true;
                 }
             }
             return false;

	 }catch (e){
             console.log(`NoticeClass init failed -> : ${e}`);
             return false;
	 }
    
    }

}
