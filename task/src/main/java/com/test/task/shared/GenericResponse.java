package com.test.task.shared;

public class GenericResponse {

    private String message;

    public GenericResponse() {}

    public GenericResponse(String message){
        this.message = message;
    }


    public String getMessage(){
        return this.message;
    }

    public void setMessage(String message){
        this.message = message;
    }
}
