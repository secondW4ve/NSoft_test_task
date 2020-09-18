package com.test.task.exception;

public class ValidationException extends RuntimeException {

    private String message;

    public ValidationException(String errorMessage){
        super();
        this.message = errorMessage;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}