CREATE TABLE account (
    id INTEGER,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL ,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR default NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE garden (
    id_garden INTEGER NOT NULL,
    garden_name VARCHAR NOT NULL,
    owner VARCHAR,
    manager VARCHAR,
    garden_type VARCHAR NOT NULL,
    street_address VARCHAR,
    country VARCHAR,
    city VARCHAR,
    province VARCHAR,
    postal_code INTEGER,
    PRIMARY KEY (id_garden),
    FOREIGN KEY (owner) REFERENCES account(id),
    FOREIGN KEY (manager) REFERENCES account(id)
);

CREATE TABLE task (
    task_id INTEGER NOT NULL,
    task_name VARCHAR,
    task_manager VARCHAR,
    task_state VARCHAR,
    validation_state VARCHAR,
    completion_state VARCHAR,
    deadline date,
    PRIMARY KEY (task_id),
    FOREIGN KEY (task_manager) REFERENCES account(id)

);

CREATE TABLE plot(
    plot_id INTEGER NOT NULL,
    garden_id INTEGER,
    plot_state VARCHAR,
    cultivated_vegetable VARCHAR,
    PRIMARY KEY (plot_id),
    FOREIGN KEY (garden_id) REFERENCES garden(id_garden)
);

CREATE TABLE own(
    plot_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    PRIMARY KEY (plot_id, task_id),
    FOREIGN KEY (plot_id) REFERENCES plot(plot_id),
    FOREIGN KEY (task_id) REFERENCES task(task_id)
);

CREATE TABLE do(
    account_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    PRIMARY KEY (account_id, task_id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (task_id) REFERENCES task(task_id)

);

CREATE TABLE link(
    account_id INTEGER NOT NULL,
    garden_id INTEGER NOT NULL,
    PRIMARY KEY (account_id, garden_id),
    FOREIGN KEY (account_id) REFERENCES account(id),
    FOREIGN KEY (garden_id) REFERENCES garden(id_garden)

);

