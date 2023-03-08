package com.sprint2.sprint2.models;

// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

public class Member {

    String name;
    String cedula;

    @Override
    public String toString() {
        return "Member{" +
                "name='" + name + '\'' +
                ", id='" + cedula + '\'' +
                '}';
    }

    public Member(String name, String id) {
        this.name = name;
        this.cedula = id;
    }

    public Member() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }
}
