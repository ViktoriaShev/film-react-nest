CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create database project_db
    with owner project_user;

CREATE TABLE public.films
(
    id          uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_697487ada088902377482c970d1"
            PRIMARY KEY,
    rating      DOUBLE PRECISION                NOT NULL,
    director    VARCHAR                         NOT NULL,
    tags        TEXT                            NOT NULL,
    image       VARCHAR                         NOT NULL,
    cover       VARCHAR                         NOT NULL,
    title       VARCHAR                         NOT NULL,
    about       VARCHAR                         NOT NULL,
    description VARCHAR                         NOT NULL
);

ALTER TABLE public.films OWNER TO project_user;

CREATE TABLE public.schedules
(
    id       uuid DEFAULT uuid_generate_v4() NOT NULL
        CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd"
            PRIMARY KEY,
    daytime  VARCHAR                         NOT NULL,
    hall     INTEGER                         NOT NULL,
    rows     INTEGER                         NOT NULL,
    seats    INTEGER                         NOT NULL,
    price    DOUBLE PRECISION                NOT NULL,
    taken    TEXT                            NOT NULL,
    "filmId" UUID
        CONSTRAINT "FK_1c2f5e637713a429f4854024a76"
            REFERENCES public.films
);

ALTER TABLE public.schedules OWNER TO project_user;


