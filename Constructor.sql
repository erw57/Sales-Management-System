-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 28, 2015 at 06:38 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `system`
--
CREATE DATABASE IF NOT EXISTS `system` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `system`;

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `cus_id` char(5) NOT NULL DEFAULT '',
  `name` varchar(25) DEFAULT NULL,
  `street` varchar(20) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip_code` varchar(5) DEFAULT NULL,
  `kind` varchar(8) DEFAULT NULL,
  `business_category` varchar(10) DEFAULT NULL,
  `company_income` decimal(10,2) DEFAULT NULL,
  `marriage_status` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `home_income` decimal(7,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`cus_id`, `name`, `street`, `city`, `state`, `zip_code`, `kind`, `business_category`, `company_income`, `marriage_status`, `age`, `gender`, `home_income`) VALUES
('93021', 'Kaien Liao', 'S Pacific', 'Pittsburgh', 'PA', '15024', 'home', NULL, NULL, 'Single', 21, 'M', 1000.00),
('93022', 'Juntao Gu', 'N Pacific', 'Pittsburgh', 'PA', '15024', 'home', NULL, NULL, 'Single', 23, 'M', 3000.00),
('93023', 'Steve Jobs', 'Walnut', 'Apple', 'CA', '29302', 'home', NULL, NULL, 'Single', 56, 'M', 95062.10);

-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE `Inventory` (
  `prod_id` char(8) NOT NULL DEFAULT '',
  `store_name` varchar(20) NOT NULL DEFAULT '',
  `amount` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Inventory`
--

INSERT INTO `Inventory` (`prod_id`, `store_name`, `amount`) VALUES
('92082938', 'Center Store', 1011.00),
('92082939', 'Center Store', 1185.00);

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `prod_id` char(8) NOT NULL DEFAULT '',
  `prod_name` varchar(25) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `product_kind` varchar(20) DEFAULT NULL,
  `image_path` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`prod_id`, `prod_name`, `price`, `product_kind`, `image_path`, `description`) VALUES
('92082938', 'DrPepper', 2.85, 'Beverage', NULL, NULL),
('92082939', 'Suda', 1.85, 'Beverage', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Region`
--

CREATE TABLE `Region` (
  `region_id` varchar(5) NOT NULL DEFAULT '',
  `region_name` varchar(15) DEFAULT NULL,
  `region_manager` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Region`
--

INSERT INTO `Region` (`region_id`, `region_name`, `region_manager`) VALUES
('29071', 'North Oakland', 'Peter');

-- --------------------------------------------------------

--
-- Table structure for table `Salesperson`
--

CREATE TABLE `Salesperson` (
  `salesperson_id` char(4) NOT NULL DEFAULT '',
  `salesperson_name` varchar(25) DEFAULT NULL,
  `street` varchar(20) DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `zip_code` varchar(5) DEFAULT NULL,
  `workplace` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Salesperson`
--

INSERT INTO `Salesperson` (`salesperson_id`, `salesperson_name`, `street`, `city`, `state`, `zip_code`, `workplace`) VALUES
('9523', 'Er', 'Melwood', 'Pittsburgh', 'PA', '15024', 'Center Store');

-- --------------------------------------------------------

--
-- Table structure for table `Store`
--

CREATE TABLE `Store` (
  `store_id` varchar(5) DEFAULT NULL,
  `store_name` varchar(20) NOT NULL DEFAULT '',
  `region` varchar(15) DEFAULT NULL,
  `store_manager` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Store`
--

INSERT INTO `Store` (`store_id`, `store_name`, `region`, `store_manager`) VALUES
('30201', 'Center Store', 'North Oakland', 'Lin');

-- --------------------------------------------------------

--
-- Table structure for table `Transaction`
--

CREATE TABLE `Transaction` (
  `order_id` char(10) NOT NULL DEFAULT '',
  `cus_id` char(5) DEFAULT NULL,
  `prod_id` char(8) DEFAULT NULL,
  `salesperson` char(4) DEFAULT NULL,
  `quantity` decimal(8,2) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Transaction`
--

INSERT INTO `Transaction` (`order_id`, `cus_id`, `prod_id`, `salesperson`, `quantity`, `price`, `time`, `location`) VALUES
('1000063375', '93021', '92082938', 'Er', 20.00, 2.90, '2015-03-05', 'Center Store'),
('1000063376', '93021', '92082938', 'Er', 13.00, 2.90, '2015-01-22', 'Center Store'),
('1000063377', '93021', '92082938', 'Er', 12.00, 2.90, '2015-01-21', 'Center Store'),
('1000063378', '93022', '92082938', 'Er', 15.00, 2.90, '2015-02-13', 'Center Store'),
('1000063379', '93022', '92082938', 'Er', 70.00, 2.90, '2015-02-25', 'Center Store'),
('1000063380', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063381', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063382', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063383', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063384', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063385', '93022', '92082938', 'Er', 30.00, 2.90, '2015-02-25', 'Center Store'),
('1000063386', '93021', '92082938', 'Er', 20.00, 2.90, '2015-03-05', 'Center Store');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
 ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `Inventory`
--
ALTER TABLE `Inventory`
 ADD PRIMARY KEY (`prod_id`,`store_name`), ADD KEY `store_name` (`store_name`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
 ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `Region`
--
ALTER TABLE `Region`
 ADD PRIMARY KEY (`region_id`), ADD KEY `region_name` (`region_name`);

--
-- Indexes for table `Salesperson`
--
ALTER TABLE `Salesperson`
 ADD PRIMARY KEY (`salesperson_id`), ADD KEY `salesperson_name` (`salesperson_name`), ADD KEY `workplace` (`workplace`);

--
-- Indexes for table `Store`
--
ALTER TABLE `Store`
 ADD PRIMARY KEY (`store_name`), ADD KEY `region` (`region`);

--
-- Indexes for table `Transaction`
--
ALTER TABLE `Transaction`
 ADD PRIMARY KEY (`order_id`), ADD KEY `cus_id` (`cus_id`), ADD KEY `salesperson` (`salesperson`), ADD KEY `prod_id` (`prod_id`), ADD KEY `location` (`location`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Inventory`
--
ALTER TABLE `Inventory`
ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `Product` (`prod_id`),
ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`store_name`) REFERENCES `Store` (`store_name`);

--
-- Constraints for table `Salesperson`
--
ALTER TABLE `Salesperson`
ADD CONSTRAINT `salesperson_ibfk_1` FOREIGN KEY (`workplace`) REFERENCES `Store` (`store_name`);

--
-- Constraints for table `Store`
--
ALTER TABLE `Store`
ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`region`) REFERENCES `Region` (`region_name`);

--
-- Constraints for table `Transaction`
--
ALTER TABLE `Transaction`
ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `Customer` (`cus_id`),
ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`salesperson`) REFERENCES `Salesperson` (`salesperson_name`),
ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`prod_id`) REFERENCES `Product` (`prod_id`),
ADD CONSTRAINT `transaction_ibfk_4` FOREIGN KEY (`location`) REFERENCES `Store` (`store_name`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
