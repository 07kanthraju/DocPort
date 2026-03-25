package com.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class DoctorAvailabality {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String doctor_id;
    private String day_of_week;
    private String start_time;
    private String end_time;
    private int slot_duration_minutes;
    private boolean is_active;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(String doctor_id) {
        this.doctor_id = doctor_id;
    }

    public String getDay_of_week() {
        return day_of_week;
    }

    public void setDay_of_week(String day_of_week) {
        this.day_of_week = day_of_week;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public int getSlot_duration_minutes() {
        return slot_duration_minutes;
    }

    public void setSlot_duration_minutes(int slot_duration_minutes) {
        this.slot_duration_minutes = slot_duration_minutes;
    }

    @Override
    public String toString() {
        return "DoctorAvailabality{" +
                "id=" + id +
                ", doctor_id='" + doctor_id + '\'' +
                ", day_of_week='" + day_of_week + '\'' +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", slot_duration_minutes=" + slot_duration_minutes +
                ", is_active=" + is_active +
                '}';
    }
}
