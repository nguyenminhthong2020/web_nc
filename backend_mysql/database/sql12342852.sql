-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql12.freemysqlhosting.net
-- Thời gian đã tạo: Th5 24, 2020 lúc 10:58 AM
-- Phiên bản máy phục vụ: 5.5.62-0ubuntu0.14.04.1
-- Phiên bản PHP: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `sql12342852`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `account_number` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `balance` bigint(32) NOT NULL DEFAULT '0',
  `status` int(2) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `transaction_fee` bigint(32) NOT NULL DEFAULT '0',
  `type_fee` int(2) NOT NULL,
  `success` int(2) NOT NULL DEFAULT '0',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cmnd` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `permission` int(2) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `fullname`, `cmnd`, `birthday`, `phone`, `address`, `email`, `permission`, `created_at`, `updated_at`) VALUES
(1, 'admin3', '$2a$08$.sB.vOh/97.K1MN.3QT1gu8goeSLSJaRsXFpI98iTqg9VrcxLvYiC', '', '', '0000-00-00', '', '', '', 0, '2020-05-23 19:58:23', NULL),
(2, 'ad7', '$2a$08$NuymEapuRgMMfCLDXeQOQOFpz.cpXl948O4yld/zmfJow77KNPP..', '', '', '0000-00-00', '', '', '', 0, '2020-05-23 19:58:32', NULL),
(3, 'admin5', '$2a$08$5XbP7IKOGGs789KdmijalOYCTfAVlmD79lnKcDbOLqPHi4g/GR8l2', '', '', '0000-00-00', '', '', '', 0, '2020-05-24 04:15:37', NULL),
(4, 'admin10', '$2a$08$VDRpWUtyCqLScwEAuN7mmOyt8oNyrl.BGQL.MSx4PvR1nOjHSDD7m', '', '', '0000-00-00', '', '', '', 0, '2020-05-24 04:45:25', NULL),
(5, 'our1', '$2a$08$vARvYEIODZZ1b/7jfoxFT.uHUfQNyHQtvMSwIoHFHmkhPKWj5k.qq', '', '', '0000-00-00', '', '', '', 0, '2020-05-24 05:02:35', NULL),
(6, 'our1', '$2a$08$y8U0ZLYJ13tueiABhyLxO.zdZPpZxYj9ihbJ59HYaSBfmHCJRZTnq', '', '', '0000-00-00', '', '', '', 0, '2020-05-24 05:17:30', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_refresh_token`
--

CREATE TABLE `user_refresh_token` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rdt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_refresh_token`
--

INSERT INTO `user_refresh_token` (`user_id`, `refresh_token`, `rdt`) VALUES
(2, 'pVK5wQ8QUipnwxXN2ktPUUj7T3LUxA306PO9LXiQP2DHSTDNICSVVTpNqxyvZOWrrzc9Y9hssHG6zLzr', '2020-05-24 04:03:06'),
(3, '9sm7TmOWkLFamXoOfRVFKR2ffVYV4gaPlK70b4imIZzRcOhFcvLvqJYPUMKSKyAo5YQkOJDMj1SncGa4', '2020-05-24 12:19:57');

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
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
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
