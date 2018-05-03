/**
 * 
 */

'use strict';

function getRequestParam(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
};


let roomId = getRequestParam('id');

//전송 메시지 input
let sendText = document.getElementById("sendText");
// 전송 버튼
let sendBtn = document.getElementById("sendBtn");
let sendBtn2 = document.getElementById("sendBtn2");
//채팅 리스트
let chatList = document.getElementById("chatList");



/**
 * @websocket with SockJS
 * Websocket 객체 선언
 * ws
 * */
let ws = new SockJS("http://112.158.50.86:8080/endpoint");

/**
 *@STOMP client 구성 
 * 
 * 
 * 
 * */
let client = Stomp.over(ws);

client.connect({}, function(frame){
	console.log("connected stomp oversokjs");
	
	client.subscribe('/subscribe/echo', function(data){
		let jsonData = JSON.parse(data.body);
		let li = liCreateFn(jsonData.name+": "+jsonData.message);
		chatList.append(li);
	});
	
	
	client.subscribe('/subscribe/echo/'+roomId, function(data){
		let jsonData = JSON.parse(data.body);
		let li = liCreateFn(jsonData.name+": "+jsonData.message);
		chatList.append(li);
	});
	
});



// 웹소켓 open method
ws.open  = function(){
	console.log('open');
	
	
	let li = liCreateFn("open");
	chatList.append(li);
};



//웹소켓 close 후 처리 method
ws.onclose = function() {
	console.log('onclose');
	
	
	let li = liCreateFn("onclose");
	chatList.append(li);
};

sendBtn.onclick = function(event){
	event.preventDefault();
	let data = {name:"마루", message: sendText.value};
	
	client.send("/app/echo", {},JSON.stringify(data));
};

sendBtn2.onclick = function(event){
	event.preventDefault();
	let data = {name:"포메", message: sendText.value};
	
	client.send("/app/echo/"+roomId, {},JSON.stringify(data));
};


/**
 * LI태그를 만들고 리턴해주는 함수
 * text: 입력값을 매개변수로 받아서 넣어줌
 * 
 * return : li 오브젝트를 리턴
 * */
var liCreateFn = function(text){
	
	let li = document.createElement("LI");
	li.innerHTML = text;
	
	return li;
};


