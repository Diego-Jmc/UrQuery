package com.sprint2.sprint2.repository;

import com.sprint2.sprint2.models.UqDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UqDocumentRepository extends MongoRepository<UqDocument,String> {
}
