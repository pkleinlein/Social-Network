DROP TABLE IF EXISTS benutzer;

CREATE TABLE benutzer(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    bio VARCHAR (350),
    photo VARCHAR (200)
);
