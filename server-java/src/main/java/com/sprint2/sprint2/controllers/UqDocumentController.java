package com.sprint2.sprint2.controllers;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

import com.sprint2.sprint2.models.UqDocument;
import com.sprint2.sprint2.repository.UqDocumentRepository;
import com.sprint2.sprint2.resources.DocumentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UqDocumentController {

    private final UqDocumentRepository uqDocumentRepository;

    private boolean documentExists(String name){
        List<UqDocument> documents = this.uqDocumentRepository.findAll();
        return documents.stream().anyMatch(e -> e.getName().equals(name));
    }

    public UqDocumentController(UqDocumentRepository uqDocumentRepository) {
        this.uqDocumentRepository = uqDocumentRepository;
    }

    @GetMapping("/document")
    public ResponseEntity<List<UqDocument>> getAll(){
        return ResponseEntity.ok(this.uqDocumentRepository.findAll());
    }

    @PostMapping("/document")
    public ResponseEntity createProduct(@RequestBody DocumentRequest body){

        System.out.println(body.toString());

        if(documentExists(body.getDocumentName())){
            return ResponseEntity.status(204).body("Ya existe ese documento");
        }else{
            UqDocument document = new UqDocument();
            document.setDocument(body.getDocumentText());
            document.setName(body.getDocumentName());
            return ResponseEntity.status(200).body(this.uqDocumentRepository.save(document));
        }
    }

    @GetMapping("/document/{name}")
    public ResponseEntity getDocumentByName(@PathVariable String name){
        List<UqDocument> documents = this.uqDocumentRepository.findAll();
        Optional<UqDocument> document = documents.stream().filter(e-> e.getName().equals(name)).findFirst();
        return document.isPresent()? ResponseEntity.ok(document.get()) :  ResponseEntity.status(204).body("The document was not found");
    }


}
