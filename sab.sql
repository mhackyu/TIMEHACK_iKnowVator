/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 8.0.17 : Database - iknowvator
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`iknowvator` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `iknowvator`;

/*Table structure for table `blacklisted_tokens` */

DROP TABLE IF EXISTS `blacklisted_tokens`;

CREATE TABLE `blacklisted_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text,
  `expires_at` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `blacklisted_tokens` */

insert  into `blacklisted_tokens`(`id`,`token`,`expires_at`,`created_at`) values 
(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InByb3ZpZGVyX2lkIjoiMTAzNzYzNTc0OTUxNDY2NTEzMTIyIiwiZGlzcGxheV9uYW1lIjoiTWFyayBDaHJpc3RpYW4gUGFkZXJlcyIsImF2YXRhciI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqVkd2Xy04d3ZPSkgxdGR0dXlHa1JMdVB3MFBaMkdua2ppZUhBTGdnIn0sImlhdCI6MTU4NDI0MDYzOCwiZXhwIjoxNTg0MjQ0MjM4fQ.ZMVBSyexA9TDH30FjJmUUbfF6yFz6DKb3pbQXjtWF3E','1584244238','2020-03-15 10:54:54'),
(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJwcm92aWRlcl9pZCI6IjEwMzc2MzU3NDk1MTQ2NjUxMzEyMiIsImRpc3BsYXlfbmFtZSI6Ik1hcmsgQ2hyaXN0aWFuIFBhZGVyZXMiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalZHdl8tOHd2T0pIMXRkdHV5R2tSTHVQdzBQWjJHbmtqaWVIQUxnZyIsImNyZWF0ZWRfYXQiOiIyMDIwLTAzLTE1VDAyOjUwOjM4LjAwMFoiLCJsYXN0X2xvZ2luIjpudWxsfSwiaWF0IjoxNTg0MjQwOTAwLCJleHAiOjE1ODQyNDQ1MDB9.cQdJ416m081CGwWXxiJzSx8_efXYzTFcbklsraO3rXM','1584244500','2020-03-15 10:55:04'),
(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJwcm92aWRlcl9pZCI6IjEwMzc2MzU3NDk1MTQ2NjUxMzEyMiIsImRpc3BsYXlfbmFtZSI6Ik1hcmsgQ2hyaXN0aWFuIFBhZGVyZXMiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalZHdl8tOHd2T0pIMXRkdHV5R2tSTHVQdzBQWjJHbmtqaWVIQUxnZyIsImNyZWF0ZWRfYXQiOiIyMDIwLTAzLTE1VDAyOjUwOjM4LjAwMFoiLCJsYXN0X2xvZ2luIjpudWxsfSwiaWF0IjoxNTg0MjQxNDUxLCJleHAiOjE1ODQyNDUwNTF9.kG4aKSiqF0MqtHEEWD4_e7An-5jeVZNRUFiJE9XDU40','1584245051','2020-03-15 11:04:23'),
(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJwcm92aWRlcl9pZCI6IjEwMzc2MzU3NDk1MTQ2NjUxMzEyMiIsImRpc3BsYXlfbmFtZSI6Ik1hcmsgQ2hyaXN0aWFuIFBhZGVyZXMiLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHalZHdl8tOHd2T0pIMXRkdHV5R2tSTHVQdzBQWjJHbmtqaWVIQUxnZyIsImNyZWF0ZWRfYXQiOiIyMDIwLTAzLTE1VDAyOjUwOjM4LjAwMFoiLCJsYXN0X2xvZ2luIjpudWxsfSwiaWF0IjoxNTg0MjQxNDc0LCJleHAiOjE1ODQyNDUwNzR9.kT_BuElcXZlBAqvWcLV8OlJN-Vg9RGJCw51BVykJZAM','1584245074','2020-03-15 11:04:44');

/*Table structure for table `income` */

DROP TABLE IF EXISTS `income`;

CREATE TABLE `income` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `income` */

/*Table structure for table `savings_goals` */

DROP TABLE IF EXISTS `savings_goals`;

CREATE TABLE `savings_goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider_id` varchar(100) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `current_amount` float DEFAULT '0',
  `goal_amount` float DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `savings_goals` */

/*Table structure for table `spending_goals` */

DROP TABLE IF EXISTS `spending_goals`;

CREATE TABLE `spending_goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider_id` varchar(100) DEFAULT NULL,
  `goal_amount` float DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `spending_goals` */

/*Table structure for table `transactions` */

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider_id` varchar(50) DEFAULT NULL,
  `description` text,
  `amount` float DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `transactions` */

insert  into `transactions`(`id`,`provider_id`,`description`,`amount`,`type`,`category`,`date_created`) values 
(26,'103763574951466513122','100 on food',100,'EXPENSE','food','2020-03-15 10:51:17');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider_id` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `avatar` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`provider_id`,`display_name`,`avatar`,`created_at`,`last_login`) values 
(3,'103763574951466513122','Mark Christian Paderes','https://lh3.googleusercontent.com/a-/AOh14GjVGv_-8wvOJH1tdtuyGkRLuPw0PZ2GnkjieHALgg','2020-03-15 10:50:38',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
