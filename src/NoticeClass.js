// お知らせ情報クラス
class NoticeClass {

    constructor(message) {
        this.message = message;
        this.display_name = "ustreamer";
        this.split_msg = "";
	this.init_flg = this.initSplitMsg(message);
    }

    /** 渡されたメッセージからidとそれ以降のメッセージを分割する関数 */
    // arg1 : オリジナルのメッセージ
    // return : なし
    initSplitMsg(message) {
        // [display_name]が***を引き換えました の形式でidとmsgを分割して初期化
	 try{
             this.display_name = message.split('が')[0]; // TODO デバッグ
             this.split_msg = message.replace(this.display_name,"");
             return true;

	 }catch (e){
             console.log(`NoticeClass init failed -> : ${e}`);
             return false;
	 }
    
    }

}
