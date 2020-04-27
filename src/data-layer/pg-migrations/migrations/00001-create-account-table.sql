CREATE TABLE
IF NOT EXISTS "account"
("id"   SERIAL , "account_number" VARCHAR
(10) NOT NULL, "balance" FLOAT NOT NULL, PRIMARY KEY
("id"));

INSERT INTO "account"
  ("account_number", "balance")
VALUES
  ('12345678', 1000000);
INSERT INTO "account"
  ("account_number", "balance")
VALUES
  ('88888888', 1000000);