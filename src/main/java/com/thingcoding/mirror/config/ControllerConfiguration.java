package com.thingcoding.mirror.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
//@EnableWebSocket websockt or sockJS
@EnableWebSocketMessageBroker
@ComponentScan(basePackages = {
		"com.thingcoding.mirror.handlers"
})

public class ControllerConfiguration extends AbstractWebSocketMessageBrokerConfigurer { 

	/*@Autowired
	private EchoHandler echoHandler;
	 */
	
	
	
	/**
	 *  1) 핸들러 지정.
	 *  2) 소켓 엔드 포인트 지정. 
	 * 
	 * 
	 * */
	
	/*
	 * 
	 * extends WebMvcConfigurerAdapter implements WebSocketConfigurer
	 * 
	 * @Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		// websocket
		//registry.addHandler(echoHandler, "/echo");

		registry.addHandler(echoHandler, "/echo").withSockJS();
	}*/
	
	
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		//end point 설정
		registry.addEndpoint("/endpoint").withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		
		//send url prefix
		registry.enableSimpleBroker("/subscribe");
		
		//subscribe prefix
		registry.setApplicationDestinationPrefixes("/app");
		
		registry.setUserDestinationPrefix("/user");
	
	}
	
	
	
	
	

	
}
