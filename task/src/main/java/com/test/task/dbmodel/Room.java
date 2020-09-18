package com.test.task.dbmodel;

import com.sun.istack.NotNull;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.util.List;

@Entity
@EntityScan(basePackages = {"com.test.task.dbmodel"})
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long id;

    @NotNull
    private String roomName;

    @OneToMany(mappedBy = "room", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Corner> corners;

    public String getRoomName(){
        return this.roomName;
    }

    public void setRoomName(String roomName){
        this.roomName = roomName;
    }

    public void setCorners(List<Corner> corners) {
        this.corners = corners;
    }

    public List<Corner> getCorners() {
        return corners;
    }
}
