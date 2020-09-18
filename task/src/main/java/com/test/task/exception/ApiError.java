package com.test.task.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;
import java.util.Map;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ApiError {

    private String error;

    public ApiError(){}

    public ApiError(int status, String message) {
        this.error = message;
    }
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

}
