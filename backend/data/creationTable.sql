CREATE TABLE account (
    username VARCHAR PRIMARY KEY NOT NULL,
    email VARCHAR NOT NULL,
    name VARCHAR,
    password VARCHAR,
    telephone INTEGER,
    address VARCHAR,
    profile_picture TEXT
);

CREATE TABLE garden (
    owner VARCHAR PRIMARY KEY NOT NULL,
    garden_name VARCHAR,
    manager VARCHAR,
    garden_adress VARCHAR
)

CREATE TABLE task (
    task_id INTEGER
    task_name VARCHAR
    task_manager VARCHAR
    task_state VARCHAR
    validation_state VARCHAR
    completion_state VARCHAR
    deadline date
)

CREATE TABLE parcelle (
    parcelle_id INTEGER 
    parcelle_state VARCHAR
    cultivated_vegetable VARCHAR
)

CREATE TABLE dispose(
    parcelle_id INTEGER
    task_id INTEGER
)