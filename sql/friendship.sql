DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
    id SERIAL PRIMARY KEY,
    senderId INTEGER NOT NULL,
    recipId INTEGER NOT NULL,
    status INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
