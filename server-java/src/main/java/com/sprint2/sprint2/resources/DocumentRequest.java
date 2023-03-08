package com.sprint2.sprint2.resources;

public class DocumentRequest {

    private String documentName;
    private String documentText;

    public DocumentRequest() {
    }

    public DocumentRequest(String documentName, String documentText) {
        this.documentName = documentName;
        this.documentText = documentText;
    }

    @Override
    public String toString() {
        return "DocumentRequest{" +
                "documentName='" + documentName + '\'' +
                ", documentText='" + documentText + '\'' +
                '}';
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getDocumentText() {
        return documentText;
    }

    public void setDocumentText(String documentText) {
        this.documentText = documentText;
    }
}
