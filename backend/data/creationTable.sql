CREATE TABLE account (
    email VARCHAR PRIMARY KEY NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR default NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    profile_picture VARCHAR default NULL
);


CREATE TABLE garden (
    garden_name VARCHAR PRIMARY KEY NOT NULL,
    owner VARCHAR,
    manager VARCHAR,
    garden_type VARCHAR NOT NULL,
    street_address VARCHAR,
    country VARCHAR,
    city VARCHAR,
    province VARCHAR,
    postal_code INTEGER
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

CREATE TABLE plot(
    plot_id INTEGER PRIMARY KEY NOT NULL,
    garden_name VARCHAR,
    plot_state VARCHAR,
    cultivated_vegetable VARCHAR
);

CREATE TABLE own(
    plot_id INTEGER PRIMARY KEY NOT NULL,
    task_id INTEGER
);

CREATE TABLE do(
    username VARCHAR PRIMARY KEY NOT NULL,
    task_id INTEGER
);

CREATE TABLE link(
    username VARCHAR PRIMARY KEY NOT NULL,
    garden_name VARCHAR
);