# src/constants/db-init.sql

create table User(
    id int auto_increment primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    createdAt datetime,
    updatedAt datetime
);

create table Time(
    id int auto_increment primary key,
    startDate datetime,
    endDate datetime null,
    userID int null,
    createdAt datetime,
    updatedAt datetime,
    FOREIGN KEY (userID) REFERENCES User(id) ON DELETE CASCADE
);