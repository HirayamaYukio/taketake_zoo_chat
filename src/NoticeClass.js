// お知らせ情報クラス
class NoticeClass {

    constructor(message) {
        this.message = message;
        this.stream_id = "ustreamer";
        this.split_msg = "";
	this.init_flg = this.initSplitMsg(message);
    }

    /** 渡されたメッセージからidとそれ以降のメッセージを分割する関数 */
    // arg1 : オリジナルのメッセージ
    // return : なし
    initSplitMsg(message) {
        // [stream_id]が***を引き換えました の形式でidとmsgを分割して初期化
	 try{
             this.stream_id = message.split('が')[0];
             this.split_msg = message.replace(this.stream_id,"");
             return true;

	 }catch (e){
             console.log(`NoticeClass init failed -> : ${e}`);
             return false;
	 }
    
    }

}
