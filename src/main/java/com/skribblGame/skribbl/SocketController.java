package com.skribblGame.skribbl;

import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.jni.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@Controller
public class SocketController<T> {

	@Autowired
	Data data;
	@Autowired
	Response response;
	
@MessageMapping("/data")
@SendTo("/topic/draw")
	public  void sendData(@RequestBody String paramMap) throws JsonMappingException, JsonProcessingException {

	
	
//System.out.println(paramMap);
//Convert JSON to POJO





ObjectMapper mapper = new ObjectMapper();
Map<String,T> map=new HashMap<>();
map=mapper.readValue(paramMap,Map.class);

data.setMousePressed( map.get("mousePressed"));
data.setIsDown(map.get("isDown"));
data.setLastX(map.get("lastX"));
data.setLastY(map.get("lastY"));
data.setX(map.get("x"));
data.setY(map.get("y"));



System.out.println(data);

response.sendData(data);



}

}

		


