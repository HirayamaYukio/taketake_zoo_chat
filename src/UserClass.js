// ユーザー情報クラス
class UserClass {

    constructor(default_name, animal_name) {
        this.default_name = default_name;
        this.animal_name = animal_name;
    }

    /** 渡されたTwitchの名前が自身のdefault_nameか確認する関数 */
    // arg1 : 今回変更するユーザーの名前
    // return : true -> 同じ名前, flse -> 違う名前
    confDefaultName(arg_name) {
	// 多重登録防止の為、デフォルト名と動物名を確認もする
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

    /** 渡されたTwitchの名前が自身のdefault_nameか確認する関数 */
    // arg1 : 今回変更するユーザーの名前
    // return : 自身の動物名
    getAnimalName() {
        return this.animal_name;
    }

}
