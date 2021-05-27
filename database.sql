
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "job" (
	"id" serial,
	"user_id" serial NOT NULL,
	"contractor" varchar(255),
	"street_address" varchar(255) NOT NULL UNIQUE,
	"city" varchar(80) NOT NULL,
	"state" varchar(20) NOT NULL,
	"zip" varchar(20) NOT NULL,
	"start_date" DATE NOT NULL,
	"outside_corners" integer NOT NULL,
	"inside_corners" integer NOT NULL,
	"status" varchar(80),
	"complete" BOOLEAN NOT NULL DEFAULT 'false',
	"comments" TEXT,
	"finish_date" DATE NOT NULL,
	CONSTRAINT "job_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "panel" (
	"id" serial NOT NULL,
	"length" integer DEFAULT '0',
	CONSTRAINT "panel_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "wall_panel" (
	"id" serial NOT NULL,
	"wall_id" integer NOT NULL,
	"panel_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "wall_panel_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "wall" (
	"id" serial NOT NULL,
	"job_id" integer NOT NULL,
	"length" integer NOT NULL,
	CONSTRAINT "wall_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "job" ADD CONSTRAINT "job_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "wall_panel" ADD CONSTRAINT "wall_panel_fk0" FOREIGN KEY ("wall_id") REFERENCES "wall"("id");
ALTER TABLE "wall_panel" ADD CONSTRAINT "wall_panel_fk1" FOREIGN KEY ("panel_id") REFERENCES "panel"("id");
ALTER TABLE "wall" ADD CONSTRAINT "wall_fk0" FOREIGN KEY ("job_id") REFERENCES "job"("id");