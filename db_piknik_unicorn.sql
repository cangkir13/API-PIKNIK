-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 12 Agu 2020 pada 20.42
-- Versi server: 8.0.21-0ubuntu0.20.04.4
-- Versi PHP: 7.3.19-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_piknik_unicorn`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_area`
--

CREATE TABLE `master_area` (
  `idlocation` int NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `kabupaten` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `kelurahan` varchar(200) NOT NULL,
  `kodepos` varchar(100) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float DEFAULT NULL,
  `id` int NOT NULL,
  `city_type` varchar(255) DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `cluster_backup` varchar(255) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `last_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;;

-- --------------------------------------------------------

--
-- Struktur dari tabel `master_kategori_wisata`
--

CREATE TABLE `master_kategori_wisata` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_privilage`
--

CREATE TABLE `user_privilage` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `client_code` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `create_at` timestamp NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;;

--
-- Dumping data untuk tabel `user_privilage`
--

INSERT INTO `user_privilage` (`id`, `email`, `password`, `client_code`, `status`, `create_at`, `update_at`) VALUES
(10, 'csTES2@mk.com', '$2a$10$oTpZ8lmnFZcB./6kRWfQfen/HNQtg6zHgrHldB8xEG9Ae0eQtI78S', 'sakzxdxmaa', 1, '2020-08-10 20:44:00', '2020-08-10 20:44:00'),
(11, 'csTES@mk.com', '$2a$10$WDr6OqHiokB10S2tKzEBAeMUJw2bNHjtd5uccbyyQ0G7W7HrP.ate', 'ZfYBtxAQ8M', 1, '2020-08-10 20:44:06', '2020-08-10 20:44:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_profile`
--

CREATE TABLE `user_profile` (
  `id_profile` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `no_hp` varchar(100) NOT NULL,
  `idlocation` int NOT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_root`
--

CREATE TABLE `user_root` (
  `id_root` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;;

--
-- Dumping data untuk tabel `user_root`
--

INSERT INTO `user_root` (`id_root`, `name`, `create_at`, `update_at`) VALUES
(1, 'SUPER ADMIN', '2020-08-02 17:00:00', '2020-08-03 00:00:00'),
(2, 'CUSTOMER SERVICE', '2020-08-02 17:00:00', '2020-08-03 00:00:00'),
(3, 'VENDOR TRAVEL', '2020-08-02 17:00:00', '2020-08-03 00:00:00'),
(4, 'USER', '2020-08-02 17:00:00', '2020-08-03 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `master_area`
--
ALTER TABLE `master_area`
  ADD PRIMARY KEY (`idlocation`);

--
-- Indeks untuk tabel `master_kategori_wisata`
--
ALTER TABLE `master_kategori_wisata`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_privilage`
--
ALTER TABLE `user_privilage`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id_profile`);

--
-- Indeks untuk tabel `user_root`
--
ALTER TABLE `user_root`
  ADD PRIMARY KEY (`id_root`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `master_area`
--
ALTER TABLE `master_area`
  MODIFY `idlocation` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `master_kategori_wisata`
--
ALTER TABLE `master_kategori_wisata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user_privilage`
--
ALTER TABLE `user_privilage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id_profile` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user_root`
--
ALTER TABLE `user_root`
  MODIFY `id_root` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
