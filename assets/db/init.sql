CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO users (name, image) VALUES ('test', 'test');
INSERT INTO users (name, image) VALUES ('test2', 'test2');
INSERT INTO users (name, image) VALUES ('test3', 'test3');

CREATE TABLE plateaux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO plateaux (name) VALUES ('Plateau 1');
INSERT INTO plateaux (name) VALUES ('Plateau 2');
INSERT INTO plateaux (name) VALUES ('Plateau 3');
INSERT INTO plateaux (name) VALUES ('Plateau 4');
INSERT INTO plateaux (name) VALUES ('Plateau 5');
INSERT INTO plateaux (name) VALUES ('Plateau 6');
INSERT INTO plateaux (name) VALUES ('Plateau 7');
INSERT INTO plateaux (name) VALUES ('Plateau 8');

CREATE TABLE Plateau1(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau2(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau3(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau4(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau5(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau6(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau7(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE Plateau8 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);