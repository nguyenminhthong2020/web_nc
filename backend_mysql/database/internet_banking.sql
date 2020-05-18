-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 18, 2020 lúc 04:44 PM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `internet_banking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `account_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `balance` bigint(32) NOT NULL DEFAULT 0,
  `status` int(2) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `associate_banks`
--

CREATE TABLE `associate_banks` (
  `id` bigint(20) NOT NULL,
  `bank_code` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `list_receiver`
--

CREATE TABLE `list_receiver` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `receiver_account_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `receiver_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank_code` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'GO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otp`
--

CREATE TABLE `otp` (
  `transaction_id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction_history`
--

CREATE TABLE `transaction_history` (
  `transaction_id` int(11) NOT NULL,
  `sender_account_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `bank_code` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'GO',
  `receiver_account_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `money` bigint(32) NOT NULL,
  `transaction_fee` bigint(32) NOT NULL DEFAULT 0,
  `type_fee` int(2) NOT NULL,
  `success` int(2) NOT NULL DEFAULT 0,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cmnd` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `permission` int(2) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_refresh_token`
--

CREATE TABLE `user_refresh_token` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rdt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `associate_banks`
--
ALTER TABLE `associate_banks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bank_code` (`bank_code`);

--
-- Chỉ mục cho bảng `list_receiver`
--
ALTER TABLE `list_receiver`
  ADD PRIMARY KEY (`user_id`,`receiver_account_number`),
  ADD KEY `receiver_account_number` (`receiver_account_number`);

--
-- Chỉ mục cho bảng `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Chỉ mục cho bảng `transaction_history`
--
ALTER TABLE `transaction_history`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `sender_account_number` (`sender_account_number`),
  ADD KEY `receiver_account_number` (`receiver_account_number`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `user_refresh_token`
--
ALTER TABLE `user_refresh_token`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `associate_banks`
--
ALTER TABLE `associate_banks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transaction_history`
--
ALTER TABLE `transaction_history`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction_history` (`transaction_id`);

--
-- Các ràng buộc cho bảng `user_refresh_token`
--
ALTER TABLE `user_refresh_token`
  ADD CONSTRAINT `user_refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
