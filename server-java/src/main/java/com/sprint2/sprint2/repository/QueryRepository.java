/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.sprint2.sprint2.repository;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

import com.sprint2.sprint2.models.Query;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface QueryRepository extends MongoRepository<Query,String> {
}
