CREATE TABLE IF NOT EXISTS users (
  id              INT               PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  email           VARCHAR(50)       NOT NULL,
  firstName       VARCHAR(50),
  lastName        VARCHAR(50),
  phone           VARCHAR(20),
  age             INT
);

INSERT INTO 
    users (email, firstName, lastName, phone, age)
VALUES
    ('pumpyouup@muscleman.com', 'Arnold', 'Schwarzeneggar', '5555555555', 70),
    ('emcsquared@genius.com', 'Albert', 'Einstein', '0300000000', 142),
    ('freecar@checkunderyourseat.com', 'Oprah', 'Winfrey', '1234567890', 70),
    ('jenny@tommytwotone.com', 'Jenny', 'Doe', '5558675309', 40),
    ('hagrid@yerawizard.com', 'Rubeus', 'Hagrid', '7342852074', 87);