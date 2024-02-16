// ユーザー情報クラス
class UserClass {

    // arg1 : 配信サイトのユニークid(アルファベットと数字)
    // arg2 : 元々表示されていたディスプレイネーム(idと同じもしくは2バイト文字列)
    // arg3 : 置換後の名前
    constructor(stream_id,default_name, animal_name) {
        this.stream_id = stream_id;
        this.default_name = default_name;
        this.animal_name = animal_name;
    }

    /** 渡されたTwitchの名前が自身のdefault_nameか確認する関数 */
    // arg1 : 今回変更するユーザーの名前
    // return : true -> 同じ名前, flse -> 違う名前
    confDefaultName(arg_name) {
	if (this.default_name == arg_name) return  true;
        return false;
    
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
    //confStreamId(arg_id) {
    //    if (this.stream_id == arg_id) return true;
    //    return false;
    //
    //}
    /** stream_idとdefault_nameの両方でユーザー同一確認をする関数 **/
    /** ただし、同じdefault_nameが複数あるときは正しく判定できない(仕様)**/
    // arg1 : id
    // arg2 : 表示名
    // return : true -> 同じユーザー, flse -> 違うユーザー
    confSameUser(arg_id,arg_name) {
        // streamIdとdefaultnameの両方で確認する
        if (this.stream_id == arg_id) return true;
        else if (this.default_name == arg_name) return  true;
        return false;
    
    }
    
    /** default_nameがブランクなら設定するsetter**/
    // arg1 : 設定する表示名
    // return : なし
    setDefaultNameIfBlank(arg_name) {
        if (this.default_name == "") this.default_name = arg_name;
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
