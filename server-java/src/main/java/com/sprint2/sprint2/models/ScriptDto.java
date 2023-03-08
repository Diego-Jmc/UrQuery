package com.sprint2.sprint2.models;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar


public class ScriptDto {

    String script;

    public ScriptDto() {
    }

    public ScriptDto(String script) {
        this.script = script;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    @Override
    public String toString() {
        return "ScriptDto{" +
                "script='" + script + '\'' +
                '}';
    }
}
