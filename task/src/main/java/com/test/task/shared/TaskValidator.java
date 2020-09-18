package com.test.task.shared;

import com.test.task.dbmodel.CornerDTO;

import java.util.List;

public class TaskValidator {

    private List<CornerDTO> corners;

    public TaskValidator(List<CornerDTO> corners){
        this.corners = corners;
    }

    public List<CornerDTO> getCorners() {
        return corners;
    }

    public void setCorners(List<CornerDTO> corners) {
        this.corners = corners;
    }

    public boolean isEnoughCoordinates() {
        if(corners.size() < 4)
            return false;
        return true;
    }

    public boolean areCoordinatesIntegers() {
        for (CornerDTO corner : corners){
            if (corner.getX() != (int) corner.getX() || corner.getY() != (int)corner.getY()){
                return false;
            }
        }
        return true;
    }

    public boolean isWallsPerpendicular() {
        for(int i = 0; i < corners.size() - 2; i++){
            CornerDTO p1, p2, p3;
            p1 = corners.get(i);
            p2 = corners.get(i + 1);
            p3 = corners.get(i + 2);
            if (p1.getX() == p3.getX() && (p1.getY() == p3.getY())){
                return false;
            }
            if (!(
                    (p1.getY() == p2.getY() && p3.getX() == p2.getX()) ||
                            (p1.getX() == p2.getX() && p3.getY() == p2.getY())
            )
            ){
                return false;
            }
        }
        return true;
    }

    public boolean areWallsIntersect() {
        if(areThereSamePoints()){
            return false;
        }

        for (int i = 0; i < corners.size() - 3; i++){
            for (int j = i + 2; j < corners.size() - 1; j ++){
                if (intersect(corners.get(i), corners.get(i + 1), corners.get(j), corners.get(j + 1))){
                    return false;
                }
            }
        }
        return true;
    }

    private boolean areThereSamePoints() {
        for(int i = 0; i < corners.size() - 1; i++){
            if (corners.get(i).getX() == corners.get(i + 1).getX() &&
                    corners.get(i).getY() == corners.get(i + 1).getY()
            )
                return true;
        }
        return false;
    }

    public boolean isRoomAreaFinit(){
        if (corners.get(corners.size() - 1).getY() == corners.get(0).getY() &&
            corners.get(corners.size() - 1).getX() > corners.get(0).getX()
        ){
            return true;
        }
        return false;
    }

    public boolean intersect(CornerDTO a, CornerDTO b, CornerDTO c, CornerDTO d){
        if ((a.getX() == b.getX() && a.getX() == c.getX() && a.getX() == d.getX()) ||
                (a.getY() == b.getY() && a.getY() == c.getY() && a.getY() == d.getY())
        )
            return false;
        return intersect_1(a.getX(), b.getX(), c.getX(), d.getX()) &&
                intersect_1(a.getY(), b.getY(), c.getY(), d.getY()) &&
                area(a,b,c) * area(a,b,d) <= 0 &&
                area(c,d,a) * area(c,d,b) <= 0;
    }

    private int area (CornerDTO a, CornerDTO b, CornerDTO c){
        return (b.getX() - a.getX()) * (c.getY() - a.getY()) - (b.getY() - a.getY()) * (c.getX() - a.getX());
    }

    private boolean intersect_1(int a, int b, int c, int d){
        if (a > b){
            int temp = a;
            a = b;
            b = temp;
        }
        if (c > d){
            int temp = c;
            c = d;
            d = temp;
        }
        return Math.max(a, c) <= Math.min(b, d);
    }
}
