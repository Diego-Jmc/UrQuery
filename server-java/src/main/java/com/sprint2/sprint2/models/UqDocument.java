package com.sprint2.sprint2.models;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("uq_document")
public class UqDocument {

    @Id
    private String id;
    private String name;


    private String document;

    public UqDocument() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UqDocument(String id, String name, String document) {
        this.id = id;
        this.name = name;
        this.document = document;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }
}
