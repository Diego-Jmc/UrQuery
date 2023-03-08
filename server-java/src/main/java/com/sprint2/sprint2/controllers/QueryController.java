package com.sprint2.sprint2.controllers;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

import com.sprint2.sprint2.models.Query;
import com.sprint2.sprint2.repository.QueryRepository;
import com.sprint2.sprint2.resources.QueryRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class QueryController {

    private final QueryRepository queryRepository;

    private boolean documentExists(String name){
        List<Query> documents = this.queryRepository.findAll();
        return documents.stream().anyMatch(e -> e.getName().equals(name));
    }

    public QueryController(QueryRepository queryRepository) {
        this.queryRepository = queryRepository;
    }

    @GetMapping("/query")
    public ResponseEntity<List<Query>> getAll(){
        return ResponseEntity.ok(this.queryRepository.findAll());
    }

    @PostMapping("/query")
    public ResponseEntity createProduct(@RequestBody QueryRequest body){

        System.out.println(body.toString());

        if(documentExists(body.getQueryName())){
            return ResponseEntity.status(204).body("Ya existe ese query");
        }else{
            Query query = new Query();
            query.setQuery(body.getQueryText());
            query.setResult(body.getResultText());
            query.setName(body.getQueryName());
            return ResponseEntity.status(200).body(this.queryRepository.save(query));
        }
    }

    @GetMapping("/query/{name}")
    public ResponseEntity getDocumentByName(@PathVariable String name){
        List<Query> documents = this.queryRepository.findAll();
        Optional<Query> query = documents.stream().filter(e-> e.getName().equals(name)).findFirst();
        return query.isPresent()? ResponseEntity.ok(query.get()) :  ResponseEntity.status(204).body("The query was not found");
    }


}
