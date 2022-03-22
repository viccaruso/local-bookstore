-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher, reviewer, review, book_author;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS book CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE publisher (
    publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE author (
    author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name TEXT,
    dob DATE,
    pob TEXT
);

CREATE TABLE book (
    book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    publisher_id BIGINT NOT NULL,
    -- FOREIGN KEY (publisher_id) REFERENCES publisher (publisher_id),
    released SMALLINT NOT NULL
);

CREATE TABLE reviewer (
    reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE review (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating SMALLINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    review VARCHAR(140) NOT NULL,
    book_id BIGINT NOT NULL
);

CREATE TABLE book_author (
    author_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book (book_id),
    FOREIGN KEY (author_id) REFERENCES author (author_id)
);

INSERT INTO
    book(title, publisher_id, released)
VALUES
    ('House of Sky and Breath', 1, 2000)





