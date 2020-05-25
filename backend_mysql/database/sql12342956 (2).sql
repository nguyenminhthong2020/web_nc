-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: sql12.freemysqlhosting.net
-- Thời gian đã tạo: Th5 25, 2020 lúc 03:50 PM
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
-- Cơ sở dữ liệu: `sql12342956`
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
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`account_number`, `user_id`, `balance`, `status`, `created_at`, `updated_at`) VALUES
('230500001', 1, 750000, 1, '2020-05-25 06:00:08', '2020-05-25 15:08:15'),
('2305000015', 15, 100000, 1, '2020-05-25 06:02:24', NULL),
('230500002', 2, 100000, 1, '2020-05-25 06:01:06', NULL),
('230500003', 3, 100000, 1, '2020-05-25 06:01:12', NULL),
('230500004', 4, 100000, 1, '2020-05-25 06:01:19', NULL),
('230500005', 5, 100000, 1, '2020-05-25 06:01:25', NULL),
('230500006', 6, 100000, 1, '2020-05-25 06:01:32', NULL),
('230500007', 7, 100000, 1, '2020-05-25 06:01:38', NULL),
('230500008', 8, 100000, 1, '2020-05-25 06:01:44', NULL),
('230500009', 9, 100000, 1, '2020-05-25 06:03:29', NULL);

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
-- Cấu trúc bảng cho bảng `partner_call_log`
--

CREATE TABLE `partner_call_log` (
  `id` bigint(20) NOT NULL,
  `bank_code` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `account_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `partner_call_log`
--

INSERT INTO `partner_call_log` (`id`, `bank_code`, `account_number`, `created_at`) VALUES
(1, 'TEST', '230500001', '2020-05-25 08:15:53'),
(2, 'TEST', '230500002', '2020-05-25 08:24:38'),
(3, 'TEST', '230500002', '2020-05-25 13:25:24'),
(4, 'TEST', '230500001', '2020-05-25 13:52:55'),
(5, 'TEST', '230500002', '2020-05-25 13:53:45'),
(6, 'TEST', '230500003', '2020-05-25 13:53:58'),
(7, '25Bank', '230500001', '2020-05-25 14:44:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `recharge_money_log`
--

CREATE TABLE `recharge_money_log` (
  `id` bigint(20) NOT NULL,
  `bank_code` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `receive_account_number` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `money` bigint(32) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `recharge_money_log`
--

INSERT INTO `recharge_money_log` (`id`, `bank_code`, `receive_account_number`, `money`, `created_at`) VALUES
(5, 'TEST', '', 100000, '2020-05-25 16:47:55'),
(6, 'TEST', '', 100000, '2020-05-25 21:34:13'),
(7, '25Bank', '', 150000, '2020-05-25 23:08:15');

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
(1, 'infymt1', '$2a$08$nVk8CGQr0ZosDg681fhCUOdXDNPlaOndetr3pS7tTF4VMv2g05o7S', 'Nguyễn Minh Thông', '12345', '1998-10-27', '12345', '', '', 2, '2020-05-25 05:44:29', NULL),
(2, 'sypham', '$2a$08$V48w5E0KgwrNHZm.JFUw2.O.H2WyLJzqYtFywSzEQDL8YImtOYmZ.', 'Phạm Đình Sỹ', '', '1998-12-31', '123456', '', '', 1, '2020-05-25 05:45:28', NULL),
(3, 'steven', '$2a$08$nmpDkqEjIAmbNrsjcuNMmufaOqJaVOx/HldO25r89BRVL9ecaHpAi', 'Phan Văn Anh Tuấn', '', '0000-00-00', '12345678', '', '', 0, '2020-05-25 05:46:08', NULL),
(4, 'admin', '$2a$08$bJTwvldL3e1S0bl8ADVq7uJtZdeSASIOPyUrsVdVkC5bFIgyvUR1m', 'Admin', '', '0000-00-00', '123', '', '', 2, '2020-05-25 05:46:41', NULL),
(5, 'user', '$2a$08$vo6iRMVlhKGTi5MOGOaNGOBMkNvmDieO29M1H92pbLqZA3ydI7xEu', 'User 1', '', '0000-00-00', '12345', '', '', 0, '2020-05-25 05:47:46', NULL),
(6, 'user2', '$2a$08$szeMQOL3.NP.SYjOzPqz1uqsKM/dx9bsrqIWTTKLXwvDKwMSPMPq2', 'User 2', '', '0000-00-00', '12345', '', 'abcde@gmail.com', 0, '2020-05-25 05:51:47', NULL),
(7, 'user3', '$2a$08$OmkGFjPjpqGw6LtNR0kVguvBpEN9NPwKjtQOMNk9NR0qB.QBwG9oG', 'User 3', '', '0000-00-00', '12345', '', '', 0, '2020-05-25 05:53:01', NULL),
(8, 'user4', '$2a$08$ZBca.Tm8XklD38DeNVcEruzq.B58/G67a1cCGnIUgUh1UJPzI6riO', 'User 4', '', '0000-00-00', '', '', '', 0, '2020-05-25 05:54:35', NULL),
(9, 'user5', '$2a$08$RaWnMHDFuzfNzfIG16PYZea/sdkD.ThrgTOUSfhkIhQX4CwNsnVEq', 'User 5', '', '0000-00-00', '', '', '', 0, '2020-05-25 05:54:46', NULL),
(15, 'user6', '$2a$08$UgHfxxT8FEKoIgqs4eeTf.aNgpgd8D9QCDIF/8hFU/8.bl/kBJQ4G', 'Trần Văn C', '', '0000-00-00', '', '', '', 0, '2020-05-25 05:55:27', NULL),
(16, 'user7', '$2a$08$ByjsPI8zfCvXnp9RowN8GeqeDLKOmwfm81kFdLhMvXJ4nYOlQEJXe', 'Nguyễn Văn B', '', '0000-00-00', '', '', '', 0, '2020-05-25 05:55:50', NULL);

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
-- Chỉ mục cho bảng `partner_call_log`
--
ALTER TABLE `partner_call_log`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `recharge_money_log`
--
ALTER TABLE `recharge_money_log`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT cho bảng `partner_call_log`
--
ALTER TABLE `partner_call_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT cho bảng `recharge_money_log`
--
ALTER TABLE `recharge_money_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT cho bảng `transaction_history`
--
ALTER TABLE `transaction_history`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
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
