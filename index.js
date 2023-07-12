// チェックボックスの値がtrueの数を求めるときに必要な変数を定義 初期値0
let count_checked_true = 0;

let stack_array = [];
let strage = localStorage;

// スタックの配列削除用 今はもういらない 記録用
const stack_delete = () =>{
	console.log('デバック用：スタック全削除');
	for(let i =0;i<stack_array.length;i++){
		stack_array.shift();
		console.log(stack_array);
	}
	save_array(stack_array);
	console.log('デバック用：完成');
};

// dateの初期値を常に今日にする方法 https://tenshoku-miti.com/takepon/javascript-add-default-date/　（21/06/2023　にパクった）
window.onload = function () {　//開いた瞬間にやるもの
let today = new Date();
today.setDate(today.getDate());
let yyyy = today.getFullYear();
let mm = ("0" + (today.getMonth() + 1)).slice(-2);
let dd = ("0" + today.getDate()).slice(-2);
document.getElementById("today").value = yyyy + '-' + mm + '-' + dd;
pickup_array("t");
 }



const pickup_array = (witch) =>{
	// 保存したものを呼び出す用  https://1-notes.com/javascript-save-the-array-to-local-storage/   (28/06/2023　参照)
	let json = localStorage.getItem('storage_array');
	let array = JSON.parse(json);
	console.log(array);
	// console.log(array[0]);
	// console.log(array[1]);

	if(witch == "t"){
		for(let i=0;i<array.length;i++){
		stack_array.push(array[i]);
		// console.log(stack_array);
		}
	}
	
	// 保存されているものを出力する。 
	let doc = document.getElementById("output");
	let doc_html; let doc_high; let doc_normal; let doc_low;
	console.log(stack_array.length);
	console.log(stack_array);
	for (let i=1;i<stack_array.length;i=i+6){
		if(array[i+1] == "高い"){
		console.log('if == true');
			doc_high=`
				<div class="task_output_post[]">
					<div class="task_output_post_high">
						<div class="task_output_post_high_name">
							タスク名：${array[i-1]}
						</div>
						<div class="task_output_post_high_text">
							タスクの内容：${array[i]}
						</div>
						<div class="task_output_post_high_priority">
							優先度：${array[i+1]}
						</div>
						<div class="task_output_post_high_limit">
							期日：${array[i+2]}年${array[i+3]}月${array[i+4]}日
						</div>
						<div class="task_output_post_button">
							<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
						</div>
					</div>
				</div>
			` ;
			doc_normal = ''; doc_low = '';
		}else if(array[i+1] == "普通"){
			doc_normal=`
				<div class="task_output_post[]">
					<div class="task_output_post_normal">
						<div class="task_output_post_normal_name">
							タスク名：${array[i-1]}
						</div>
						<div class="task_output_post_normal_text">
							タスクの内容：${array[i]}
						</div>
						<div class="task_output_post_normal_priority">
							優先度：${array[i+1]}
						</div>
						<div class="task_output_post_normal_limit">
							期日：${array[i+2]}年${array[i+3]}月${array[i+4]}日
						</div>
						<div class="task_output_post_button">
							<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
						</div>
					</div>
				</div>
			` ;
			doc_high = ''; doc_low ='';
		}else if(array[i+1] == "低い"){
			doc_low=`
				<div class="task_output_post[]">
					<div class="task_output_post_low">
						<div class="task_output_post_low_name">
							タスク名：${array[i-1]}
						</div>
						<div class="task_output_post_low_text">
							タスクの内容：${array[i]}
						</div>
						<div class="task_output_post_low_priority">
							優先度：${array[i+1]}
						</div>
						<div class="task_output_post_low_limit">
							期日：${array[i+2]}年${array[i+3]}月${array[i+4]}日
						</div>
						<div class="task_output_post_button">
							<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
						</div>
					</div>
				</div>
			` ;
			doc_high = ''; doc_normal = ''; 
		}
		doc_html += doc_high + doc_normal + doc_low;
	}//forループ終了
	doc.innerHTML = doc_html;

};//pickup_array 終了
// window.addEventListener('load',function(){
	
// })

const save_array = (arr)=>{			
	// ブラウザ保存  https://1-notes.com/javascript-save-the-array-to-local-storage/   (28/06/2023　参照)
	let json = JSON.stringify(arr);
	localStorage.setItem('storage_array',json);	
};

// 配列を作って、そこにタスク内容と優先度と日時を格納する。　ちゃんと入ってるか確認するために、一時的に出力する。
function make_new_array(){
	const name = document.getElementById('task_input_name').value;

	const text = document.getElementById('task_input_text').value;

	// ラジオボタンのうちチェックされたものだけを得る
	// .item() , .checked　が必要らしい　pri=の.valueはhighとかlowとか入れたやつが返される。　for()の中のiは初期値1にしたらちゃんと動いた
	const checkValue =document.getElementsByName('priority');
	let pri = ' ';
	for(let i=1;i<4;i++){
		if(checkValue.item(i).checked){
			pri = checkValue.item(i).value;
		}
	}

	// 優先度を日本語に変換する関数を生成　お手本.js l:419からのパクリ(switch文をif文で置き換えた)
	const get_pri_jp = (priority) => {
	let str = '';
	if(priority == 'high'){
		str = '高い';
	}else if (priority == 'normal'){
		str = '普通';
	}else if (priority == 'low'){
		str = '低い';
	}
	return str;
};
pri = get_pri_jp(pri);

// 期日を取り出す https://mebee.info/2022/12/04/post-82072/ (06/27/2023参照)
let toString = Object.prototype.toStirng;
let date1 = new Date(document.getElementById("today").value);
let limit = {
	year : date1.getFullYear(),
	month : date1.getMonth()+1,
	date : date1.getDate(),
};

	const array = [name,text,pri,limit.year,limit.month,limit.date];
	// console.log("array:"+array);

	// <div></div>内に新しくhtmlを記述する方法　保存したタスクを表示する用
	let doc = document.getElementById("output");
	let doc_high=`
		<div class="task_output_post[]">
			<div class="task_output_post_high">
				<div class="task_output_post_high_name">
					タスク名：${name}
				</div>
				<div class="task_output_post_high_text">
					タスクの内容：${text}
				</div>
				<div class="task_output_post_high_priority">
					優先度：${pri}
				</div>
				<div class="task_output_post_high_limit">
					期日：${limit.year}年${limit.month}月${limit.date}日
				</div>
				<div class="task_output_post_button">
					<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
				</div>
			</div>
		</div>
	` ;

	let doc_normal = `
		<div class="task_output_post[]">
			<div class="task_output_post_normal">
				<div class="task_output_post_normal_name">
					タスク名：${name}
				</div>
				<div class="task_output_post_normal_text">
					タスクの内容：${text}
				</div>
				<div class="task_output_post_normal_priority">
					優先度：${pri}
				</div>
				<div class="task_output_post_normal_limit">
					期日：${limit.year}年${limit.month}月${limit.date}日
				</div>
				<div class="task_output_post_button">
					<input type="checkbox" name="delete_task_radio[]" value="1"/> タスク完了
				</div
			</div>
		</div>
	`;

	let doc_low = `
		<div class="task_output_post[]">
			<div class="task_output_post_low">
				<div class="task_output_post_low_name">
					タスク名：${name}
				</div>
				<div class="task_output_post_low_text">
					タスクの内容：${text}
				</div>
				<div class="task_output_post_low_priority">
					優先度：${pri}
				</div>
				<div class="task_output_post_low_limit">
					期日：${limit.year}年${limit.month}月${limit.date}日
				</div>
				<div class="task_output_post_button">
					<input type="checkbox" name="delete_task_radio[]" value="1"/> タスク完了
				</div
			</div>
		</div>
	`;
	// 入力したものを全部出力できるようにした(全部足す)
	const normal_html_post = (h) =>{
		if(pri == "高い"){
			h += doc_high;
		}else if (pri == "普通"){
			h += doc_normal;
		}else if (pri == "低い"){
			h += doc_low;
		}
		return h;
	};
	let html = doc;
	html.innerHTML += normal_html_post(html);

	// let doc1 = document.getElementById("output_aritcle");
	// doc1.innerHTML = '<div><p>（テスト）入力した内容：['+ array+ ']</p></div>';


	// ユーザーエージェント（どの機種、どのアプリから開いているか）判別：後でやる（優先度低い）

	// 保存したものに入力したものをスタックにプッシュしていく
	for(let i=0;i<array.length /6;i++){
		stack_array.push(name);
		stack_array.push(text);
		stack_array.push(pri);
		stack_array.push(limit.year);
		stack_array.push(limit.month);
		stack_array.push(limit.date);
	save_array(stack_array);
	console.log("保存："+stack_array);
	}
}//make_new_array終了

// 削除用関数
const checkboxes = document.getElementsByClassName('task_output_post[]');
const delete_task = ()=>{
	console.log('デバック用（削除関数）：開始');
	console.log('デバック用：stack_array：'+stack_array);
	let delete_task_array = document.getElementsByName('delete_task_radio[]');
	let checked_true = document.getElementsByName('delete_task_radio[]').checked;

	// チェックボックスがtrueの数を求める
	for(let i=0;i<delete_task_array.length;i++){

		if(delete_task_array[i].checked == true){
			count_checked_true += 1;
		}

	}
	console.log('デバック用：count_checked_true='+count_checked_true);
	console.log('デバック用：stack_array：'+stack_array);
	for(let i =0; i<delete_task_array.length;i++){
		if (delete_task_array[i].checked == true){
			for(let i=0;i<6;i++){
				stack_array.splice(i,6);
			}	
		}
		// console.log('デバック用：stack_array：'+stack_array);
	}
	// console.log(stack_array);
	for(let i=0;i<delete_task_array.length;i++){
		console.log('デバック用：forループ'+i+'回目');
		for(let j=0;j<delete_task_array.length;j++){
			// console.log(i+'個目のチェックボックスの値='+delete_task_array[i].checked);
			if(delete_task_array[j].checked == true){
				// console.log(checkboxes[j]);
			 	checkboxes[j].remove();
			 	// console.log('デバック用：stack_array：'+stack_array);
			}
			 // console.log('デバック用：stack_array：'+stack_array);
		}
		// console.log('デバック用：stack_array：'+stack_array);
	}
	console.log('デバック用（削除関数）：終了');
	// console.log('デバック用：stack_array：'+stack_array);
	save_array(stack_array);
}; //delete_task 終了

// 優先度順並び替え
const fun_sort_priority = () =>{
	// console.log('デバック用：優先度順並び替え');
	// console.log(stack_array);
	let sort_array = [];
	let sort_high_array =[];
	let sort_normal_array =[];
	let sort_low_array =[];
	for(let i=2;i<stack_array.length;i+=6){
		// console.log('for スタート');
		// console.log(stack_array[i]);
		if(stack_array[i] == '高い'){
			for(let j=-2;j<4;j++){
				sort_array.push(stack_array[i+j]);
			}
		}
	}
	for(let i=2;i<stack_array.length;i+=6){
		// console.log('for スタート');
		// console.log(stack_array[i]);
		if(stack_array[i] == '普通'){
			for(let j=-2;j<4;j++){
				sort_array.push(stack_array[i+j]);
			}
		}
	}
	for(let i=2;i<stack_array.length;i+=6){
		// console.log('for スタート');
		// console.log(stack_array[i]);
		if(stack_array[i] == '低い'){
			for(let j=-2;j<4;j++){
				sort_array.push(stack_array[i+j]);
			}
		}
	}
	
	console.log('デバック用（sort_array）');
	console.log(sort_array);
	
	// let doc = document.getElementById("output");
	// let doc_html; let doc_high; let doc_normal; let doc_low;
	// // console.log(sort_array.length);
	// for (let i=0;i<sort_array.length;i+=6){
	// 	if(sort_array[i+2] == "高い"){
	// 		doc_high=`
	// 			<div class="task_output_post[]">
	// 				<div class="task_output_post_high">
	// 					<div class="task_output_post_high_name">
	// 						タスク名：${sort_array[i]}
	// 					</div>
	// 					<div class="task_output_post_high_text">
	// 						タスクの内容：${sort_array[i+1]}
	// 					</div>
	// 					<div class="task_output_post_high_priority">
	// 						優先度：${sort_array[i+2]}
	// 					</div>
	// 					<div class="task_output_post_high_limit">
	// 						期日：${sort_array[i+3]}年${sort_array[i+4]}月${sort_array[i+5]}日
	// 					</div>
	// 					<div class="task_output_post_button">
	// 						<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
	// 					</div>
	// 				</div>
	// 			</div>
	// 		` ;
	// 		doc_normal = ''; doc_low = '';
	// 	}else if(sort_array[i+2] == "普通"){
	// 		doc_normal=`
	// 			<div class="task_output_post[]">
	// 				<div class="task_output_post_normal">
	// 					<div class="task_output_post_normal_name">
	// 						タスク名：${sort_array[i]}
	// 					</div>
	// 					<div class="task_output_post_normal_text">
	// 						タスクの内容：${sort_array[i+1]}
	// 					</div>
	// 					<div class="task_output_post_normal_priority">
	// 						優先度：${sort_array[i+2]}
	// 					</div>
	// 					<div class="task_output_post_normal_limit">
	// 						期日：${sort_array[i+3]}年${sort_array[i+4]}月${sort_array[i+5]}日
	// 					</div>
	// 					<div class="task_output_post_button">
	// 						<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
	// 					</div>
	// 				</div>
	// 			</div>
	// 		` ;
	// 		doc_high = ''; doc_low ='';
	// 	}else if(sort_array[i+2] == "低い"){
	// 		doc_low=`
	// 			<div class="task_output_post[]">
	// 				<div class="task_output_post_low">
	// 					<div class="task_output_post_low_name">
	// 						タスク名：${sort_array[i]}
	// 					</div>
	// 					<div class="task_output_post_low_text">
	// 						タスクの内容：${sort_array[i+1]}
	// 					</div>
	// 					<div class="task_output_post_low_priority">
	// 						優先度：${sort_array[i+2]}
	// 					</div>
	// 					<div class="task_output_post_low_limit">
	// 						期日：${sort_array[i+3]}年${sort_array[i+4]}月${sort_array[i+5]}日
	// 					</div>
	// 					<div class="task_output_post_button">
	// 						<input type="checkbox" name="delete_task_radio[]" onclick="1"/> タスク完了
	// 					</div>
	// 				</div>
	// 			</div>
	// 		` ;
	// 		doc_high = ''; doc_normal = ''; 
	// 	}
	// 	doc_html += doc_high + doc_normal + doc_low;
	// doc.innerHTML = doc_html;
	// }
	save_array(sort_array);

	pickup_array();
}; //ソート関数終了
