package com.test.task.controller;


import com.test.task.dbmodel.RoomResponse;
import com.test.task.dbmodel.RoomDTO;
import com.test.task.dbmodel.Room;
import com.test.task.service.RoomService;
import com.test.task.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping(path = "/api/1.0/rooms", consumes = "application/json", produces = "application/json")
    ResponseEntity<RoomResponse> createRoom(@RequestBody RoomDTO roomDTO){
        RoomResponse response = roomService.create(roomDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping(path = "/validateRoom", consumes = "application/json", produces = "application/json")
    ResponseEntity<RoomDTO> validateRoom(@RequestBody RoomDTO roomDTO){
        roomService.validateRoom(roomDTO);
        return new ResponseEntity<>(roomDTO, HttpStatus.OK);
    }

    @GetMapping("/api/1.0/rooms")
    ResponseEntity<List<Room>> getAllRooms(){
        List<Room> rooms = roomService.findAll();
        if (rooms == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PutMapping("/api/1.0/rooms/{name}")
    GenericResponse updateRoom(@PathVariable String name, @RequestBody RoomDTO room){
        if (name == null){
            return new GenericResponse("Name can't be NULL");
        }
        if (room == null){
            return  new GenericResponse("Pass new data to update record");
        }
        Room updatedRoom = roomService.update(name, room);
        if (updatedRoom == null){
            return new GenericResponse("There are no room with that name");
        }
        return new GenericResponse("Room has been updated");
    }

    @DeleteMapping("/api/1.0/rooms/{name}")
    GenericResponse deleteRoom(@PathVariable String name){
        if (name == null){
            return new GenericResponse("Name can't be NULL");
        }
        roomService.delete(name);
        return new GenericResponse("Room has been removed");
    }
}
