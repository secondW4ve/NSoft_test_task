package com.test.task.dbmodel;

import java.util.List;

public class RoomDTO {

    private List<CornerDTO> room;

    public void setRoom(List<CornerDTO> room){
        this.room = room;
    }

    public List<CornerDTO> getRoom() {
        return room;
    }
}
