package com.test.task.dbmodel;


import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    void deleteByRoomName(String roomName);

    Room findByRoomName(String roomName);
}
