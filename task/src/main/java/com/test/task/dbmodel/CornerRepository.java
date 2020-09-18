package com.test.task.dbmodel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CornerRepository extends JpaRepository<Corner, Long> {

    int deleteByRoom(Room room);
}
