package com.sprint2.sprint2.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


// Autores Grupo 1pm
// Diego Jimenez
//Cynthia Murillo
// Jean Carlo
// Gerardo Salazar

@Document("info")
public class Info {
    @Id
    String _id;
    List<Member> members;
    String course;
    String university;
    String semester;
    int year;
    String school;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public Info(String _id, List<Member> members, String course, String university, String semester, int year, String school) {
        this._id = _id;
        this.members = members;
        this.course = course;
        this.university = university;
        this.semester = semester;
        this.year = year;
        this.school = school;
    }

    public Info() {
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    @Override
    public String toString() {

        String memberInfo = "";

        for (int i   = 0 ; i<members.size();i++){
            memberInfo+=members.get(i).toString();
        }



        return "Info{" +

                ", course='" + course + '\'' +
                ", university='" + university + '\'' +
                ", semester='" + semester + '\'' +
                ", year=" + year +
                ", school='" + school + '\'' +
                '}' +memberInfo;
    }
}
