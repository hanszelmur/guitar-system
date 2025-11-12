-- Create database
CREATE DATABASE guitar_db;
USE guitar_db;

-- Users table (for authentication)
CREATE TABLE users (
  iduser INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  usertype ENUM('admin', 'basic') NOT NULL
);

-- Guitars table (1 PK + 4 attributes)
CREATE TABLE guitar (
  idguitar INT PRIMARY KEY AUTO_INCREMENT,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);

-- Insert sample users
INSERT INTO users (username, password, usertype) VALUES 
('admin', 'admin123', 'admin'),
('basicuser', 'user123', 'basic');

-- Insert sample guitars
INSERT INTO guitar (brand, model, price, stock) VALUES
('Fender', 'Stratocaster', 1299.99, 15),
('Gibson', 'Les Paul', 2499.99, 8),
('Yamaha', 'FG800', 199.99, 25),
('Ibanez', 'RG550', 899.99, 12),
('Taylor', '214ce', 1099.99, 10);
