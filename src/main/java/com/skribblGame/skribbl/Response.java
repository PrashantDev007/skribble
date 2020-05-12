package com.skribblGame.skribbl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Response {

	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	public void sendData(Data data) {

		ObjectMapper mapper = new ObjectMapper();
		String jsonString = null;
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			System.out.println("exception");
		}
		messagingTemplate.convertAndSend("/topic/draw", jsonString);

	}

}
