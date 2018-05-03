package com.thingcoding.mirror.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

	
	
	@RequestMapping("/")
	public String main(@RequestParam(required = true ) String id) {
		
		return "main.html";
	}
	
	
	
}
