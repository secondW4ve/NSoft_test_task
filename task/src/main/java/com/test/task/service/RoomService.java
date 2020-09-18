package com.test.task.service;

import com.test.task.dbmodel.*;
import com.test.task.exception.ValidationException;
import com.test.task.shared.TaskValidator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;

@Service
public class RoomService {

    private RoomRepository roomRepository;

    private CornerRepository cornerRepository;

    public RoomService(RoomRepository roomRepository, CornerRepository cornerRepository){
        this.roomRepository = roomRepository;
        this.cornerRepository = cornerRepository;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public RoomResponse create(RoomDTO roomDTO) throws ValidationException{
        validateData(roomDTO);
        Room room = new Room();
        room.setRoomName(getRandomName());
        Room savedRoom = roomRepository.save(room);
        RoomResponse response = new RoomResponse();
        response.setRoomName(savedRoom.getRoomName());
        response.setRoom(roomDTO.getRoom());
        for(CornerDTO corner : roomDTO.getRoom()){
            Corner newRecord = new Corner();
            newRecord.setRoom(room);
            newRecord.setX(corner.getX());
            newRecord.setY(corner.getY());
            cornerRepository.save(newRecord);
        }
        return response;
    }

    public void validateRoom(RoomDTO roomDTO){
        validateData(roomDTO);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public Room findById(Long id){
        return roomRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Room with id:" + id + " not found"));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(String name){
        roomRepository.deleteByRoomName(name);
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Transactional
    public Room update(String name, RoomDTO roomDTO) throws ValidationException{
        validateData(roomDTO);
        Room parentRoom = roomRepository.findByRoomName(name);
        if (parentRoom == null){
            return null;
        }
        cornerRepository.deleteByRoom(parentRoom);
        for(CornerDTO corner : roomDTO.getRoom()){
            Corner newRecord = new Corner();
            newRecord.setX(corner.getX());
            newRecord.setY(corner.getY());
            newRecord.setRoom(parentRoom);
            cornerRepository.save(newRecord);
        }
        return parentRoom;
    }

    private void validateData(RoomDTO roomDTO) throws ValidationException{
        TaskValidator validator = new TaskValidator(roomDTO.getRoom());
        if (!validator.isEnoughCoordinates()){
            throw new ValidationException("There should be at least 4 pairs of coordinates in request");
        }
        if (!validator.areCoordinatesIntegers()){
            throw new ValidationException("Not all coordinates are integers");
        }
        if (!validator.isWallsPerpendicular()){
            throw new ValidationException("Not all walls are perpendicular");
        }
        if (!validator.areWallsIntersect()){
            throw new ValidationException("Some walls intersect");
        }
        if (!validator.isRoomAreaFinit()){
            throw new ValidationException("Room's area is infinite");
        }
    }

    private String getRandomName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
