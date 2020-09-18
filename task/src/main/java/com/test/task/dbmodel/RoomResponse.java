package com.test.task.dbmodel;

import java.util.List;

public class RoomResponse {

    private String roomName;

    private List<CornerDTO> room;

    public void setRoom(List<CornerDTO> room){
        this.room = room;
    }

    public List<CornerDTO> getRoom() {
        return room;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
