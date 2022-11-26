CREATE TABLE account (
    email VARCHAR PRIMARY KEY NOT NULL,
    username VARCHAR NOT NULL ,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR default NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    profile_picture VARCHAR default NULL
);


CREATE TABLE garden (
    owner VARCHAR PRIMARY KEY NOT NULL,
    garden_name VARCHAR,
    manager VARCHAR,
    garden_adress VARCHAR
);

CREATE TABLE task (
    task_id INTEGER PRIMARY KEY NOT NULL,
    task_name VARCHAR,
    task_manager VARCHAR,
    task_state VARCHAR,
    validation_state VARCHAR,
    completion_state VARCHAR,
    deadline date
);

CREATE TABLE parcelle (
    parcelle_id INTEGER PRIMARY KEY NOT NULL,
    parcelle_state VARCHAR,
    cultivated_vegetable VARCHAR
);

CREATE TABLE dispose(
    parcelle_id INTEGER,
    task_id INTEGER
)

CREATE TABLE fait(

)