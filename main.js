//プレイリストの閲覧権限がないと使えない
//"URL","タイトル","hh:mm:ss",秒数
//という行で構成されたCSVファイルをダウンロードする
(function () {
	var $queue=document.getElementById("queue");
	var outputCSV='"URL","タイトル","再生時間","再生時間(秒)","Addした人"\n';
	for(var $currentElement=$queue.firstElementChild;$currentElement!=null;$currentElement=$currentElement.nextElementSibling){
		
		var $qe_title=$currentElement.getElementsByClassName("qe_title")[0];
		//URLをCSVに追加
		outputCSV+='"'+$qe_title.href+'",';
		
		//タイトルをCSVに追加
		//ダブルクオーテーションが含まれていたら二重化
		outputCSV+='"'+$qe_title.innerText.replace('"','""')+'",';
		
		//hh:mm:ss形式の再生時間
		var hhmmss=$currentElement.getElementsByClassName("qe_time")[0].innerText;
		if(hhmmss.length!=8){//mm:ss形式だった場合
			hhmmss="00:"+hhmmss;
		}
		
		//↑、秒数に変換したものをCSVに追加
		outputCSV+='"'+hhmmss+'",';
		outputCSV+='"'+hhmmssToSeconds(hhmmss)+'",';
		
		//Addした人の名前を追加
		outputCSV+='"'+$currentElement.title.substring(10)+'"';
		
		//改行を追加
		outputCSV+='\n';

	}
	
	//リンクを生成し自動ダウンロード
	var link=document.createElement("a");
	link.download="savedList.csv";
	var blob=new Blob([outputCSV],{type:"text/csv"});
	link.href=URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href);
	
	//hh:mm:ssを秒数に変換する関数
	function hhmmssToSeconds(input) {
		return input.substring(0,2)*3600+input.substring(3,5)*60+input.substring(6)*1;
	}
})();