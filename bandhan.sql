-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2023 at 07:31 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bandhan`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userCode` varchar(50) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `category` enum('0','1') NOT NULL DEFAULT '1',
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userCode`, `firstName`, `lastName`, `username`, `password`, `email`, `category`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `enabled`) VALUES
(1, 'yqOjk', 'Vaibhav', 'Mandlik', 'vaibhav.mandlik1@gmail.com', '123456', 'vaibhav.mandlik2@gmail.com', '1', 1, '2023-05-15 19:29:28', 1, '2023-05-20 18:28:23', '1'),
(12, 'jIXm4', 'Vaibhav', 'Mandlik', 'vaibhav@gmail.com', '123', 'vaibhav@gmail.com', '1', 12, '2023-05-20 15:04:29', 12, '2023-05-20 15:04:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_additional_details_master`
--

CREATE TABLE `user_additional_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `hobbies` longtext NOT NULL,
  `foodType` varchar(10) NOT NULL,
  `houseType` enum('1','2') DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_address_details_master`
--

CREATE TABLE `user_address_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `addressLine1` varchar(255) NOT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `taluka` varchar(10) NOT NULL,
  `city` varchar(10) NOT NULL,
  `state` varchar(10) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_address_details_master`
--

INSERT INTO `user_address_details_master` (`id`, `userId`, `addressLine1`, `addressLine2`, `landmark`, `taluka`, `city`, `state`, `pincode`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `enabled`) VALUES
(1, 12, '', NULL, NULL, '', 'Pune', '', '', 0, '2023-05-20 15:04:29', 0, '2023-05-20 15:04:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_basic_details_master`
--

CREATE TABLE `user_basic_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `height` varchar(10) NOT NULL,
  `weight` float NOT NULL,
  `bodyTone` varchar(100) NOT NULL,
  `placeOfBirth` varchar(100) NOT NULL,
  `timeOfBirth` time NOT NULL,
  `dateOfBirth` date NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_basic_details_master`
--

INSERT INTO `user_basic_details_master` (`id`, `userId`, `height`, `weight`, `bodyTone`, `placeOfBirth`, `timeOfBirth`, `dateOfBirth`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `enabled`) VALUES
(1, 12, '', 0, '', '', '00:00:00', '0000-00-00', 0, '2023-05-20 15:04:29', 0, '2023-05-20 15:04:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_educational_details_master`
--

CREATE TABLE `user_educational_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `educationType` varchar(10) NOT NULL,
  `qualification` varchar(10) NOT NULL,
  `stream` varchar(10) NOT NULL,
  `qualifiedFrom` varchar(255) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_interest_details_master`
--

CREATE TABLE `user_interest_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `interestedInId` int(11) NOT NULL,
  `isAccepted` enum('0','1') NOT NULL DEFAULT '0',
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_kundali_details_master`
--

CREATE TABLE `user_kundali_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `moonStar` varchar(10) DEFAULT NULL,
  `moonSign` varchar(10) DEFAULT NULL,
  `gan` varchar(10) NOT NULL,
  `gotra` varchar(10) NOT NULL,
  `naadi` varchar(10) NOT NULL,
  `caste` varchar(10) NOT NULL,
  `subCaste` varchar(10) NOT NULL,
  `manglik` enum('0','1') DEFAULT NULL,
  `bloodGroup` varchar(10) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_medical_details_master`
--

CREATE TABLE `user_medical_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isSpectacles` enum('0','1') NOT NULL DEFAULT '0',
  `alcoholic` varchar(10) NOT NULL,
  `smoking` varchar(10) NOT NULL,
  `medicalHistory` longtext NOT NULL,
  `isInsured` enum('0','1') DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_personal_details_master`
--

CREATE TABLE `user_personal_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `gender` enum('0','1','2') NOT NULL,
  `primaryPhoneNumber` varchar(12) NOT NULL,
  `secondaryPhoneNumber` varchar(12) DEFAULT NULL,
  `managedBy` enum('0','1') NOT NULL DEFAULT '1',
  `bio` longtext DEFAULT NULL,
  `marriageType` varchar(10) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_personal_details_master`
--

INSERT INTO `user_personal_details_master` (`id`, `userId`, `gender`, `primaryPhoneNumber`, `secondaryPhoneNumber`, `managedBy`, `bio`, `marriageType`, `createdBy`, `createdOn`, `updatedBy`, `updatedOn`, `enabled`) VALUES
(1, 12, '0', '8668723797', NULL, '1', NULL, NULL, 0, '2023-05-20 15:04:29', 0, '2023-05-20 15:04:29', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_personal_document_master`
--

CREATE TABLE `user_personal_document_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `aadharId` varchar(12) NOT NULL,
  `voterId` varchar(10) NOT NULL,
  `drivingId` varchar(15) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_professional_details_master`
--

CREATE TABLE `user_professional_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `incomeType` enum('1','2') DEFAULT NULL,
  `designation` varchar(100) NOT NULL,
  `jobLocation` varchar(255) NOT NULL,
  `incomeRange` varchar(10) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_recent_visitors_details_master`
--

CREATE TABLE `user_recent_visitors_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `visitorId` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_recent_visitors_details_master`
--

INSERT INTO `user_recent_visitors_details_master` (`id`, `userId`, `visitorId`, `createdBy`, `createdOn`, `enabled`) VALUES
(1, 12, 1, 12, '2023-05-20 20:23:22', '1'),
(2, 12, 1, 12, '2023-05-20 20:31:59', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_shortlisted_details_master`
--

CREATE TABLE `user_shortlisted_details_master` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `shortlistedId` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedBy` int(11) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `enabled` enum('0','1') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userCodeIndex` (`userCode`);

--
-- Indexes for table `user_additional_details_master`
--
ALTER TABLE `user_additional_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address_details_master`
--
ALTER TABLE `user_address_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_basic_details_master`
--
ALTER TABLE `user_basic_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_educational_details_master`
--
ALTER TABLE `user_educational_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_interest_details_master`
--
ALTER TABLE `user_interest_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_kundali_details_master`
--
ALTER TABLE `user_kundali_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_medical_details_master`
--
ALTER TABLE `user_medical_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_personal_details_master`
--
ALTER TABLE `user_personal_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_personal_document_master`
--
ALTER TABLE `user_personal_document_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_professional_details_master`
--
ALTER TABLE `user_professional_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_recent_visitors_details_master`
--
ALTER TABLE `user_recent_visitors_details_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_shortlisted_details_master`
--
ALTER TABLE `user_shortlisted_details_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_additional_details_master`
--
ALTER TABLE `user_additional_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_address_details_master`
--
ALTER TABLE `user_address_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_basic_details_master`
--
ALTER TABLE `user_basic_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_educational_details_master`
--
ALTER TABLE `user_educational_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_interest_details_master`
--
ALTER TABLE `user_interest_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_kundali_details_master`
--
ALTER TABLE `user_kundali_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_medical_details_master`
--
ALTER TABLE `user_medical_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_personal_details_master`
--
ALTER TABLE `user_personal_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_personal_document_master`
--
ALTER TABLE `user_personal_document_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_professional_details_master`
--
ALTER TABLE `user_professional_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_recent_visitors_details_master`
--
ALTER TABLE `user_recent_visitors_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_shortlisted_details_master`
--
ALTER TABLE `user_shortlisted_details_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
