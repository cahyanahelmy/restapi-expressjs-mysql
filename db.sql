create table bahasa(
    id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nama varchar(60),
    deskripsi varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);