package com.sprint2.sprint2.resources;

public class QueryRequest {

    private String queryName;
    private String queryText;
    private String resultText;

    public QueryRequest() {
    }

    public QueryRequest(String queryName, String queryText, String resultText) {
        this.queryName = queryName;
        this.queryText = queryText;
        this.resultText = queryText;
    }

    @Override
    public String toString() {
        return "QueryRequest{" +
                "queryName='" + queryName + '\'' +
                ", queryText='" + queryText + '\'' +
                ", resultText='" + resultText + '\'' +
                '}';
    }

    public String getQueryName() {
        return queryName;
    }

    public void setQueryName(String queryName) {
        this.queryName = queryName;
    }

    public String getQueryText() {
        return queryText;
    }

    public void setQueryText(String queryText) {
        this.queryText = queryText;
    }
    
    public String getResultText() {
        return resultText;
    }

    public void setResultText(String resultText) {
        this.resultText = resultText;
    }
}
