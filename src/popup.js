// クリックしたときのイベント
document.getElementById('btn').addEventListener('click', () => {
    //let body_element = document.body;
    //console.log(body_element);
    //document.querySelector('h1').textContent = body_element;

    let Data = {"Title": "", "URL": ""}  // 格納するDaTa

	chrome.tabs.getSelected(tab=>{  // 現在のタブを取得
	    Data.Title = tab.title;  // tabに現在のタブが格納されている（？）。
	    Data.URL = tab.url;    // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
	    console.log(`Title: ${Data.Title}`);  // 出力は、「ポップアップを検証」で見れる。
	    console.log(`URL: ${Data.URL}`);
	});
})

