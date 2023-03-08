package com.sprint2.sprint2.repository;

import com.sprint2.sprint2.models.Info;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InfoRepository extends MongoRepository<Info,String> {



}
