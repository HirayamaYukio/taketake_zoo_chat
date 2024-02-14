// お知らせ情報クラス
class NoticeClass {

    constructor(message) {
        this.message = message; // TODO ここは""に括られてメッセージが来るから抽出は注意
        this.stream_id = "ustreamer";
        this.split_msg = "";
	// TODO バグってるから単体テストでデバッグ
	this.initFlg = initSplitMsg(message);
    }

    /** 渡されたメッセージからidとそれ以降のメッセージを分割する関数 */
    // arg1 : オリジナルのメッセージ
    // return : なし
    initSplitMsg(message) {
        // [stream_id]が***を引き換えました の形式でidとmsgを分割して初期化
	 try{
             this.stream_id = mesage.split('が')[0];
             this.split_msg = mesage.split('が')[1];
             return true;

	 }catch (e){
             console.log(`NoticeClass init failed -> : ${e}`);
             return false;
	 }
    
    }

    /** 渡された名前が自身のanimal_nameか確認する関数 */
    // arg1 : 今回変更するユーザーの名前
    // return : true -> 同じ名前, flse -> 違う名前
    confAnimalName(arg_name) {
        if (this.animal_name == arg_name) return true;
        return false;
    
    }

    /** 渡されたidが自身のstream_idか確認する関数 */
    // arg1 : 確認するid
    // return : true -> 同じid, flse -> 違うid
    confStreamId(arg_id) {
        if (this.stream_id == arg_id) return true;
        return false;
    
    }

    /** 置換後の名前をgetする関数 */
    // arg1 : なし
    // return : 自身の動物名
    getAnimalName() {
        return this.animal_name;
    }

    /** stream idをgetする関数 */
    // arg1 : なし
    // return : 自身の動物名
    getStreamId() {
        return this.stream_id;
    }

}
