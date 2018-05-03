package com.thingcoding.mirror.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thingcoding.mirror.domain.MirrorData;

@Controller
public class EchoController {

	
	@MessageMapping("/echo") // STMOP CLINEt의 대한 target url
	@SendTo("/subscribe/echo") //보낼 
	public MirrorData sendEcho(MirrorData receviedData) {
		
		MirrorData sendData = new MirrorData(receviedData.getName(), receviedData.getMessage());
		
		return sendData;
		
	}
	
	@MessageMapping("/echo/{roomId}") // STMOP CLINEt의 대한 target url
	@SendTo("/subscribe/echo/{roomId}") //보낼 
	public MirrorData sendEcho2(MirrorData receviedData, String roomId) {
		
		MirrorData sendData = new MirrorData(receviedData.getName(), receviedData.getMessage());
		
		return sendData;
		
	}

	
}
