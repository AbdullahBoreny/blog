CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"url" text NOT NULL,
	"likes" integer NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "readingList" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"blogId" integer NOT NULL,
	"timestamp1" timestamp DEFAULT now() NOT NULL,
	"isRead" boolean
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"userName" text NOT NULL,
	"password_hash" text DEFAULT '' NOT NULL,
	"token" text,
	CONSTRAINT "users_userName_unique" UNIQUE("userName")
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;