package com.sprint2.sprint2.controllers;


import com.sprint2.sprint2.models.Info;
import com.sprint2.sprint2.models.ScriptDto;
import com.sprint2.sprint2.repository.InfoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@RestController
public class ServerApi {

    private final InfoRepository repository;

    public ServerApi(InfoRepository repository) {
        this.repository = repository;
    }

    private String sendPrologRequest(String script) throws IOException, InterruptedException {
        var PORT = 8000;
        var API = "/compile";
        var SERVICE = String.format("http://localhost:%d%s", PORT, API);

        var client = HttpClient.newHttpClient();

        var uri = URI.create(SERVICE);

        var body = "{\"script\":\""+script+"\"}"; //"{\"a\":10, \"b\":665}";

        var request = HttpRequest.newBuilder(uri)
                .version(HttpClient.Version.HTTP_1_1)
                .header("Content-Type", "application/json")
                .header("accept", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
        var response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    @PostMapping("/compile")
    public String compile(@RequestBody ScriptDto scriptDto) throws InterruptedException {
        try{
            return sendPrologRequest(scriptDto.getScript());
        }catch (Exception e){
            return "Hubo un problema";
        }
    }



    @GetMapping("/about")
    public Info getMembers(){
        return this.repository.findAll().stream().findFirst().get();
    }



    

}
