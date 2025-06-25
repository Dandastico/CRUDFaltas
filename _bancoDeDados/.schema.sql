SET time_zone = "-03:00";

-- criação do banco de dados "faltas"
CREATE DATABASE IF NOT EXISTS `faltas`;
USE faltas;

-- ----------------------------------------------

-- estrutura da tabela faltas
CREATE TABLE IF NOT EXISTS faltas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    dia DATE DEFAULT (CURRENT_DATE),
    valor DECIMAL(3,2) NOT NULL
);

-- ----------------------------------------------

-- inserções na tabela
INSERT INTO faltas (nome, dia, valor) VALUES 
    ('Linguagem Técnica de Programação', '2025-05-12', 1.00),
    ('Engenharia de Software', '2025-05-13', 0.50),
    ('Linguagem Técnica de Programação', '2025-05-19', 0.25);