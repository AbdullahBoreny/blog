CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userName" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_userName_unique" UNIQUE("userName")
);
