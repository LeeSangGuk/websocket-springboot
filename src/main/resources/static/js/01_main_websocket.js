/**
 * 
 */

'use strict';


//전송 메시지 input
let sendText = document.getElementById("sendText");
// 전송 버튼
let sendBtn = document.getElementById("sendBtn");

//채팅 리스트
let chatList = document.getElementById("chatList");



/**
 * Websocket 객체 선언
 * ws
 * */
let ws = new WebSocket("ws://127.0.0.1:8080/echo");

// 웹소켓 open method
ws.open  = function(){
	console.log('open');
	
	
	let li = liCreateFn("open");
	chatList.append(li);
};

//웹소켓 받은 메시지 처리 method
ws.onmessage = function(message) {
	console.log('onmessage');
	

	let li = liCreateFn(message.data);

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
	let data = sendText.value;
	
	ws.send(data);
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
