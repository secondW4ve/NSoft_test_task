package com.test.task.shared;

import com.test.task.exception.ApiError;
import com.test.task.exception.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler({ValidationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleNotFoundException(ValidationException exception, HttpServletRequest request){
        ApiError apiError = new ApiError(400, exception.getMessage());
        return apiError;
    }
}
