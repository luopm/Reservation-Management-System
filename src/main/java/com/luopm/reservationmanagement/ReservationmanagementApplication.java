package com.luopm.reservationmanagement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@MapperScan("com.luopm.reservationmanagement.Dao")
@SpringBootApplication
public class ReservationmanagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReservationmanagementApplication.class, args);
    }
}
