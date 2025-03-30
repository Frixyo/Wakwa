CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO users (name, image) VALUES ('Joueur 1', 'pionBleu');
INSERT INTO users (name, image) VALUES ('Joueur 2', 'pionVert');
INSERT INTO users (name, image) VALUES ('Joueur 3', 'pionRose');
INSERT INTO users (name, image) VALUES ('Joueur 4', 'pionBleu');
INSERT INTO users (name, image) VALUES ('Joueur 5', 'pionVert');
INSERT INTO users (name, image) VALUES ('Joueur 6', 'pionRose');

CREATE TABLE plateaux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO plateaux (name) VALUES ('Test');
INSERT INTO plateaux (name) VALUES ('Plateau 2');
INSERT INTO plateaux (name) VALUES ('Plateau 3');
INSERT INTO plateaux (name) VALUES ('Plateau 4');
INSERT INTO plateaux (name) VALUES ('Plateau 5');
INSERT INTO plateaux (name) VALUES ('Plateau 6');
INSERT INTO plateaux (name) VALUES ('Plateau 7');
INSERT INTO plateaux (name) VALUES ('Plateau 8');

CREATE TABLE cases(
    id INTEGER PRIMARY KEY,
    plateaux_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (plateaux_id) REFERENCES plateaux(id)
);

INSERT INTO cases (id, plateaux_id, description, image) VALUES (1, 1, 'Case 1', 'cartebb_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (2, 1, 'Case 2', 'cartemarron_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (3, 1, 'Case 3', 'carterouge_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (4, 1, 'Case 4', 'cartevert_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (5, 1, 'Case 5', 'carteviolet_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (6, 1, 'Case 6', 'cartebb_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (7, 1, 'Case 7', 'cartemarron_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (8, 1, 'Case 8', 'carterouge_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (9, 1, 'Case 9', 'cartevert_01');
INSERT INTO cases (id, plateaux_id, description, image) VALUES (10, 1, 'Case 10', 'carteviolet_01');