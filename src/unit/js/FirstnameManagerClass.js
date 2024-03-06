// 先頭情報クラス
class FirstnameClass {


    constructor(firstname_args) {
        this.firstname_array = firstname_args;
	this.number = 1; // リストが空になった時用の数字
    }

    /* 先頭用文字列を返却する。(ここではリストから削除しない) */
    // arg : なし
    // return : 
    getFirstname() {
        var number =  Math.floor(Math.random()* this.firstname_array.length);
        var result  = this.firstname_array[number];
        return  result;
    
    }

    /* 渡された文字列をリストから削除する */
    // arg : 削除対象
    // return : 対象を削除したリストを保持した新しいFirstnameClass
    deleteName(target_name) {
	var reg = new RegExp(target_name);
        const newlist = this.firstname_array.filter( value => ! (value.match(reg)) )
	// 新しくクラスを作って返却
	var newClass = new FirstnameClass(newlist);
        return newClass;
    }

    /* リスト内文字が無くなった時用の数字を文字列で返却する関数 */
    // arg : なし
    // return :  [数字] (string)
    getNumbername() {
	    var result = String(this.number);
	    this.number++;
        return result;
    
    }

    /* リスト内文字があるか確認する関数*/
    // arg : なし
    // return : true -> あり、false -> なし
    isListEmpty() {
        if (this.firstname_array.length == 0) return false;
        return true;
    
    }
}
