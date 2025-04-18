-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2025 at 07:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hobbyhive`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE DATABASE IF NOT EXISTS hobbyhive;
USE hobbyhive;

CREATE TABLE `ads` (
  `ad_id` int(11) NOT NULL,
  `ad_name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`ad_id`, `ad_name`, `description`, `vendor_id`) VALUES
(1, 'Summer Sports Sale', 'Get the best deals on all cycling and water sports gear!', 5),
(2, 'Music Fiesta', 'Exclusive discounts on all musical instruments for a limited time.', 5),
(3, 'Adventure Awaits', 'Rent camping and trekking gear at affordable prices.', 5),
(4, 'Board Game Bonanza', 'Special offers on strategy board games. Fun for all ages!', 5),
(5, 'Sky Watch Night', 'Buy telescopes and stargazing gear this weekend only!', 5),
(6, 'Fitness Flash Sale', 'Up to 30% off on fitness equipment and yoga gear.', 5),
(7, 'Photography Fest', 'Rent high-end cameras and accessories at great prices.', 5),
(8, 'Creative Corner', 'Sketchpads and art supplies now available with discounts.', 5),
(9, 'Drone Days', 'Fly high with our latest collection of drones on rent.', 5),
(10, 'Ultimate Hobby Fair', 'Explore products across all hobbies. Best deals for enthusiasts!', 5),
(11, 'kmkm', 'kmkmkmkmkmk', 5),
(12, 'Tennis Rackets for free', 'Tennis', 6),
(13, 'asd', 'asdsa', 6);

-- --------------------------------------------------------

--
-- Table structure for table `hobbies`
--

CREATE TABLE `hobbies` (
  `hobby` varchar(100) NOT NULL,
  `fin` int(11) DEFAULT NULL,
  `func` int(11) DEFAULT NULL,
  `phys` int(11) DEFAULT NULL,
  `psych` int(11) DEFAULT NULL,
  `social` int(11) DEFAULT NULL,
  `sat` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hobbies`
--

INSERT INTO `hobbies` (`hobby`, `fin`, `func`, `phys`, `psych`, `social`, `sat`, `time`) VALUES
('Action Figures', 4, 5, 2, 6, 6, 7, 8),
('Barbecuing', 5, 7, 3, 6, 8, 9, 5),
('Basketball', 5, 8, 10, 6, 9, 8, 4),
('Bird Watching', 3, 5, 4, 7, 6, 8, 7),
('Board Games', 3, 6, 1, 7, 8, 8, 6),
('Book Clubs', 3, 6, 2, 7, 8, 8, 7),
('Casual Walks', 3, 5, 5, 7, 6, 8, 7),
('Chess', 3, 7, 1, 9, 5, 9, 6),
('Choirs', 4, 6, 4, 7, 9, 9, 6),
('Coins', 3, 4, 1, 7, 4, 6, 9),
('Comic Books', 3, 5, 1, 7, 5, 8, 7),
('Cooking', 6, 8, 3, 7, 7, 9, 6),
('Crossword', 3, 5, 1, 7, 4, 7, 8),
('Cycling', 5, 7, 8, 6, 7, 9, 6),
('Digital Art', 3, 7, 1, 7, 5, 9, 7),
('Drawing', 2, 6, 1, 7, 5, 8, 6),
('Fermenting', 4, 6, 1, 7, 5, 7, 8),
('Finance & Business', 7, 9, 2, 8, 5, 8, 7),
('Gardening', 4, 6, 5, 8, 5, 9, 7),
('Gourmet Cooking', 6, 8, 2, 7, 7, 9, 6),
('Gymnastics', 5, 8, 10, 7, 8, 9, 4),
('Hiking', 5, 7, 9, 8, 7, 9, 5),
('Language Learning', 4, 7, 1, 9, 6, 9, 7),
('Meditation', 2, 6, 2, 9, 5, 9, 7),
('Online Courses', 5, 8, 1, 8, 5, 9, 7),
('Painting', 3, 5, 2, 8, 6, 9, 7),
('Pastry Making', 5, 7, 2, 6, 6, 8, 7),
('Photography', 5, 6, 4, 6, 7, 8, 6),
('Pottery', 4, 6, 4, 7, 6, 8, 6),
('Programming', 6, 9, 2, 8, 5, 8, 7),
('Reading', 3, 5, 1, 8, 5, 9, 8),
('Research', 6, 8, 2, 9, 4, 8, 6),
('Robotics', 6, 9, 3, 8, 5, 8, 6),
('Sculpting', 4, 7, 3, 9, 4, 9, 8),
('Spa & Wellness', 5, 7, 3, 8, 7, 9, 7),
('Stamps', 2, 4, 1, 6, 3, 5, 8),
('Stargazing', 2, 5, 2, 9, 4, 8, 8),
('Sudoku', 3, 6, 1, 8, 4, 8, 7),
('Tennis', 6, 8, 9, 7, 8, 8, 5),
('Traveling', 7, 8, 7, 8, 9, 9, 5),
('Trivia Quizzes', 4, 6, 1, 8, 6, 8, 7),
('Video Editing', 5, 8, 2, 7, 7, 8, 7),
('Video Games', 4, 7, 2, 6, 7, 9, 7),
('Vintage Items', 4, 5, 1, 6, 5, 7, 8),
('Volunteering', 4, 7, 4, 7, 9, 9, 6),
('Web Design', 5, 8, 2, 7, 6, 8, 7),
('Yoga', 3, 7, 6, 9, 6, 9, 7);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `product_hobby` varchar(100) DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `rentorbuy` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_hobby`, `vendor_id`, `rentorbuy`, `price`) VALUES
(1, 'Mountain Bike', 'Cycling', 5, 'rent', 500),
(2, 'Guitar', 'Music', 5, 'buy', 1500),
(3, 'Kayak', 'Water Sports', 5, 'rent', 1200),
(4, 'Telescope', 'Astronomy', 5, 'buy', 2500),
(5, 'Chess Set', 'Board Games', 5, 'buy', 300),
(6, 'Camping Tent', 'Camping', 5, 'rent', 800),
(7, 'Sketch Pad', 'Drawing', 5, 'buy', 200),
(8, 'Yoga Mat', 'Fitness', 5, 'buy', 100),
(9, 'DSLR Camera', 'Photography', 5, 'rent', 2200),
(10, 'RC Drone', 'Electronics', 5, 'rent', 1800),
(11, 'wfwef', 'fwefw', 5, '', 342),
(12, 'wfwef', 'fwefw', 5, '', 342),
(13, 'wfwef', 'fwefw', 5, '', 342),
(14, 'wfwef', 'fwefw', 5, '', 342),
(15, 'wfwef', 'fwefw', 5, '', 342),
(16, 'wfwef', 'fwefw', 5, '', 342),
(17, 'wfwef', 'fwefw', 5, '', 342),
(18, 'wfwefewe', 'fwefw', 5, '', 342),
(19, 'wfwefewe', 'fwefw', 5, '', 342),
(20, 'wfwefewe', 'fwefw', 5, '', 342),
(21, 'wfwefewe', 'fwefw', 5, '', 342),
(22, 'hello', 'fewf', 5, 'rent', 111),
(23, 'hello', 'fewf', 5, 'rent', 111),
(24, 'hello', 'fewf', 5, 'rent', 111),
(25, 'hello', 'fewf', 5, 'rent', 111),
(26, 'hello', 'fewf', 5, 'rent', 111),
(27, 'hello', 'fewf', 5, 'rent', 111),
(28, 'Testing', 'Tennis', 6, 'buy', 2345),
(29, 'asdas', 'asdas', 6, 'rent', 0),
(30, 'none', 'asjdklasjd', 6, 'buy', 234),
(31, 'reterte', 'rterter', 6, 'rent', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(10) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2xjfDwr0vb7En_XF0tP8z3fLmnOhetoK', 1744912807, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-04-17T18:00:07.424Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('JFA0meUKHFs2Sah2ivLpYuYaB8Y7_cCO', 1744947080, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-04-18T03:31:19.823Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('LOeU4sHlsmsU4hJ0ZhD_eX8Vx_2MKYQF', 1744952563, '{\"cookie\":{\"originalMaxAge\":604795774,\"expires\":\"2025-04-18T05:02:43.155Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":88,\"email\":\"leevanherald5@gmail.com\",\"name\":\"leevan\"}}'),
('b6kM-TKRpNiYSPA79G_-DDV2-jhRIeri', 1744912725, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-04-17T17:58:45.290Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('dBJu8LnSX53FWcp5Ta3kCZyGXMUeQYnA', 1744912807, '{\"cookie\":{\"originalMaxAge\":604799980,\"expires\":\"2025-04-17T18:00:07.389Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"email\":\"ashish@example.com\"}}'),
('wRsMAvArBv_URGvc1bRKkdND_Cd8OynQ', 1744912807, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-04-17T18:00:07.416Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `profile_photo` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `current_status` varchar(100) DEFAULT NULL,
  `followers` int(11) DEFAULT NULL,
  `age_group` varchar(100) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `profile_photo`, `dob`, `email`, `phone`, `city`, `state`, `country`, `gender`, `current_status`, `followers`, `age_group`, `education`, `password`) VALUES
(63, 'Aarav Sharma', 'aarav.jpg', '1995-07-14', 'aarav.sharma@example.com', '+91 9876543210', 'Mumbai', 'Maharashtra', 'India', 'Male', 'Employed', 250, '19-35', 'Graduate', 'hashed_password1'),
(64, 'Priya Verma', 'priya.jpg', '2001-02-20', 'priya.verma@example.com', '+91 8765432109', 'Delhi', 'Delhi', 'India', 'Female', 'Student', 75, '19-35', 'Undergraduate', 'hashed_password2'),
(65, 'Rohan Iyer', 'rohan.jpg', '1980-12-05', 'rohan.iyer@example.com', '+91 7654321098', 'Bangalore', 'Karnataka', 'India', 'Male', 'Self-Employed', 400, '36-50', 'Graduate', 'hashed_password3'),
(66, 'Ananya Nair', 'ananya.jpg', '1990-06-30', 'ananya.nair@example.com', '+91 6543210987', 'Chennai', 'Tamil Nadu', 'India', 'Female', 'Working', 550, '19-35', 'Graduate', 'hashed_password4'),
(67, 'Siddharth Kapoor', 'sid.jpg', '1975-03-18', 'siddharth.kapoor@example.com', '+91 5432109876', 'Kolkata', 'West Bengal', 'India', 'Male', 'Retired', 120, '51+', 'Retired', 'hashed_password5'),
(68, 'Neha Patil', 'neha.jpg', '1998-09-25', 'neha.patil@example.com', '+91 4321098765', 'Pune', 'Maharashtra', 'India', 'Female', 'Employed', 80, '19-35', 'Graduate', 'hashed_password6'),
(69, 'Vikram Singh', 'vikram.jpg', '1985-11-12', 'vikram.singh@example.com', '+91 3210987654', 'Jaipur', 'Rajasthan', 'India', 'Male', 'Business Owner', 600, '36-50', 'Graduate', 'hashed_password7'),
(70, 'Sneha Das', 'sneha.jpg', '2003-05-22', 'sneha.das@example.com', '+91 2109876543', 'Bhopal', 'Madhya Pradesh', 'India', 'Female', 'Student', 40, '0-18', 'High School', 'hashed_password8'),
(71, 'Rahul Joshi', 'rahul.jpg', '1993-08-17', 'rahul.joshi@example.com', '+91 1098765432', 'Ahmedabad', 'Gujarat', 'India', 'Male', 'Employed', 320, '19-35', 'Graduate', 'hashed_password9'),
(72, 'Kavya Menon', 'kavya.jpg', '1970-01-05', 'kavya.menon@example.com', '+91 9988776655', 'Kochi', 'Kerala', 'India', 'Female', 'Retired', 90, '51+', 'Retired', 'hashed_password10'),
(73, 'Arjun Reddy', 'arjun.jpg', '1988-03-21', 'arjun.reddy@example.com', '+91 9876123450', 'Hyderabad', 'Telangana', 'India', 'Male', 'Working', 150, '36-50', 'Graduate', 'hashed_password11'),
(74, 'Meera Gupta', 'meera.jpg', '1996-11-10', 'meera.gupta@example.com', '+91 8765432098', 'Lucknow', 'Uttar Pradesh', 'India', 'Female', 'Employed', 220, '19-35', 'Graduate', 'hashed_password12'),
(75, 'Aditya Das', 'aditya.jpg', '1978-09-30', 'aditya.das@example.com', '+91 7654321987', 'Chandigarh', 'Punjab', 'India', 'Male', 'Self-Employed', 470, '36-50', 'Graduate', 'hashed_password13'),
(76, 'Pooja Rao', 'pooja.jpg', '1994-06-28', 'pooja.rao@example.com', '+91 6543219876', 'Indore', 'Madhya Pradesh', 'India', 'Female', 'Working', 330, '19-35', 'Graduate', 'hashed_password14'),
(77, 'Amit Saxena', 'amit.jpg', '1983-04-19', 'amit.saxena@example.com', '+91 5432198765', 'Patna', 'Bihar', 'India', 'Male', 'Employed', 510, '36-50', 'Graduate', 'hashed_password15'),
(78, 'Tanya Bhatt', 'tanya.jpg', '2000-08-15', 'tanya.bhatt@example.com', '+91 4321987654', 'Surat', 'Gujarat', 'India', 'Female', 'Student', 60, '19-35', 'Undergraduate', 'hashed_password16'),
(79, 'Rajiv Nair', 'rajiv.jpg', '1965-12-10', 'rajiv.nair@example.com', '+91 3219876543', 'Nagpur', 'Maharashtra', 'India', 'Male', 'Retired', 140, '51+', 'Retired', 'hashed_password17'),
(80, 'Swati Kulkarni', 'swati.jpg', '1999-01-25', 'swati.kulkarni@example.com', '+91 2109876432', 'Coimbatore', 'Tamil Nadu', 'India', 'Female', 'Student', 85, '19-35', 'Undergraduate', 'hashed_password18'),
(81, 'Kabir Malhotra', 'kabir.jpg', '1989-07-14', 'kabir.malhotra@example.com', '+91 1098765321', 'Visakhapatnam', 'Andhra Pradesh', 'India', 'Male', 'Business Owner', 560, '36-50', 'Graduate', 'hashed_password19'),
(82, 'Deepika Sen', 'deepika.jpg', '1976-05-03', 'deepika.sen@example.com', '+91 9987654321', 'Guwahati', 'Assam', 'India', 'Female', 'Retired', 130, '51+', 'Retired', 'hashed_password20'),
(83, 'Manish Tiwari', 'manish.jpg', '1997-11-07', 'manish.tiwari@example.com', '+91 8765432123', 'Hyderabad', 'Telangana', 'India', 'Male', 'Employed', 275, '19-35', 'Graduate', 'hashed_password21'),
(84, 'Simran Kaur', 'simran.jpg', '2002-03-12', 'simran.kaur@example.com', '+91 7654321234', 'Chandigarh', 'Punjab', 'India', 'Female', 'Student', 55, '19-35', 'Undergraduate', 'hashed_password22'),
(85, 'Aniket Sen', 'aniket.jpg', '1992-08-22', 'aniket.sen@example.com', '+91 6543212345', 'Bangalore', 'Karnataka', 'India', 'Male', 'Employed', 375, '19-35', 'Graduate', 'hashed_password23'),
(86, 'Ritika Sharma', 'ritika.jpg', '1991-04-29', 'ritika.sharma@example.com', '+91 5432123456', 'Mumbai', 'Maharashtra', 'India', 'Female', 'Working', 420, '19-35', 'Graduate', 'hashed_password24'),
(87, 'Ashish Muley', NULL, '2004-08-23', 'ashish@example.com', '9284748393', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'Undergraduate', '123456'),
(88, 'leevan', NULL, '1999-03-03', 'leevanherald5@gmail.com', '2343423423', 'Chennai', 'Gujarat', 'India', 'Male', NULL, 0, '19-35', 'Undergraduate', 'leevan'),
(89, 'ashish', NULL, '2004-08-23', 'ashish@gmail.com', '8997989989', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'Undergraduate', '123456'),
(90, 'user1', NULL, NULL, 'user1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '123456');

-- --------------------------------------------------------

--
-- Table structure for table `user_hobbies`
--

CREATE TABLE `user_hobbies` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hobby` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_hobbies`
--

INSERT INTO `user_hobbies` (`id`, `email`, `hobby`, `description`, `experience`) VALUES
(67, 'aarav.sharma@example.com', 'Basketball', 'Plays in a local club', '5 years'),
(68, 'aarav.sharma@example.com', 'Photography', 'Enjoys capturing landscapes', '3 years'),
(69, 'priya.verma@example.com', 'Painting', 'Works with watercolors and acrylics', '4 years'),
(70, 'priya.verma@example.com', 'Book Clubs', 'Discusses literature with peers', '5 years'),
(71, 'rohan.iyer@example.com', 'Programming', 'Develops web and mobile apps', '8 years'),
(72, 'rohan.iyer@example.com', 'Chess', 'Plays online tournaments', '6 years'),
(73, 'ananya.nair@example.com', 'Yoga', 'Practices morning yoga', '7 years'),
(74, 'ananya.nair@example.com', 'Meditation', 'Daily mindfulness routine', '5 years'),
(75, 'siddharth.kapoor@example.com', 'Gardening', 'Grows organic vegetables', '6 years'),
(76, 'siddharth.kapoor@example.com', 'Crossword', 'Enjoys solving daily puzzles', '4 years'),
(77, 'neha.patil@example.com', 'Tennis', 'Plays at district level', '4 years'),
(78, 'neha.patil@example.com', 'Drawing', 'Sketching portraits in free time', '3 years'),
(79, 'vikram.singh@example.com', 'Cycling', 'Enjoys long rides on weekends', '6 years'),
(80, 'vikram.singh@example.com', 'Sudoku', 'Loves solving logic puzzles', '5 years'),
(81, 'sneha.das@example.com', 'Photography', 'Captures moments professionally', '3 years'),
(82, 'sneha.das@example.com', 'Video Games', 'Plays RPG and strategy games', '5 years'),
(83, 'rahul.joshi@example.com', 'Hiking', 'Explores mountain trails', '7 years'),
(84, 'rahul.joshi@example.com', 'Programming', 'Works on open-source projects', '6 years'),
(85, 'kavya.menon@example.com', 'Reading', 'Fiction and non-fiction enthusiast', '8 years'),
(86, 'kavya.menon@example.com', 'Pastry Making', 'Loves baking desserts', '5 years'),
(87, 'arjun.reddy@example.com', 'Robotics', 'Builds small automation projects', '4 years'),
(88, 'arjun.reddy@example.com', 'Stargazing', 'Enjoys astronomical events', '5 years'),
(89, 'meera.gupta@example.com', 'Traveling', 'Loves exploring new cultures', '6 years'),
(90, 'meera.gupta@example.com', 'Finance & Business', 'Passionate about investment', '3 years'),
(91, 'aditya.das@example.com', 'Video Games', 'Enjoys esports tournaments', '8 years'),
(92, 'aditya.das@example.com', 'Web Design', 'Creates UI/UX designs', '5 years'),
(93, 'pooja.rao@example.com', 'Yoga', 'Practices meditation daily', '7 years'),
(94, 'pooja.rao@example.com', 'Cooking', 'Experiments with world cuisines', '5 years'),
(95, 'amit.saxena@example.com', 'Trekking', 'Explores Himalayan trails', '6 years'),
(96, 'amit.saxena@example.com', 'Choirs', 'Sings in a local choir', '4 years'),
(97, 'tanya.bhatt@example.com', 'Sculpting', 'Works with clay and stone', '5 years'),
(98, 'tanya.bhatt@example.com', 'Chess', 'Enjoys strategic board games', '4 years'),
(99, 'rajiv.nair@example.com', 'Gardening', 'Grows flowers and herbs', '9 years'),
(100, 'rajiv.nair@example.com', 'Photography', 'Loves nature photography', '6 years'),
(101, 'swati.kulkarni@example.com', 'Tennis', 'Plays in amateur leagues', '4 years'),
(102, 'swati.kulkarni@example.com', 'Gaming', 'Loves multiplayer games', '5 years'),
(103, 'kabir.malhotra@example.com', 'Gymnastics', 'Practices calisthenics', '5 years'),
(104, 'kabir.malhotra@example.com', 'Cooking', 'Enjoys gourmet cooking', '6 years'),
(105, 'deepika.sen@example.com', 'Drawing', 'Sketches portraits and landscapes', '8 years'),
(106, 'deepika.sen@example.com', 'Finance & Business', 'Interested in stock trading', '6 years'),
(107, 'manish.tiwari@example.com', 'Online Courses', 'Always learning new skills', '5 years'),
(108, 'manish.tiwari@example.com', 'Cycling', 'Rides to work daily', '4 years'),
(109, 'simran.kaur@example.com', 'Volunteering', 'Helps at NGOs and charities', '6 years'),
(110, 'simran.kaur@example.com', 'Book Clubs', 'Loves literary discussions', '5 years'),
(111, 'aniket.sen@example.com', 'Robotics', 'Builds AI-driven bots', '7 years'),
(112, 'aniket.sen@example.com', 'Chess', 'Enjoys strategy and planning', '6 years'),
(113, 'ritika.sharma@example.com', 'Meditation', 'Practices mindfulness daily', '7 years'),
(114, 'ritika.sharma@example.com', 'Sudoku', 'Solves puzzles regularly', '5 years'),
(115, 'ashish@example.com', 'Hiking', 'I love going on weekend hikes a lot', 'Beginner (1-2 years)'),
(116, 'ashish@example.com', 'Chess', 'Only a casual player', 'Beginner (1-2 years)'),
(117, 'ashish@example.com', 'Drawing', 'Very much into drawing. I like pencil drawing best.', 'Intermediate (3-5 years)'),
(118, 'leevanherald5@gmail.com', 'Programming', NULL, NULL),
(119, 'ashish@gmail.com', 'Painting', NULL, NULL),
(120, 'ashish@gmail.com', 'Drawing', NULL, NULL),
(121, 'ashish@gmail.com', 'Hiking', NULL, NULL),
(122, 'user1@gmail.com', 'Vintage Items', NULL, NULL),
(123, 'user1@gmail.com', 'Comic Books', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int(11) NOT NULL,
  `vendor_name` varchar(100) DEFAULT NULL,
  `vendor_email` varchar(100) DEFAULT NULL,
  `vendor_pass` varchar(100) DEFAULT NULL,
  `vendor_phone` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`vendor_id`, `vendor_name`, `vendor_email`, `vendor_pass`, `vendor_phone`) VALUES
(1, 'fewf', 'fewfwe@fwfwef', 'ewfw', NULL),
(2, 'fewf', 'fewfwe@fwfweee', 'ewfw', NULL),
(3, 'fewf', 'fewfwe@fwfweeedw', 'ewfw', NULL),
(4, 'fewf', 'fewfwe@fwfweeedwhb', 'ewfw', NULL),
(5, 'user', 'user@gmail.com', 'user123', NULL),
(6, 'leevan', 'leevan@gmail.com', 'leevan', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`ad_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `hobbies`
--
ALTER TABLE `hobbies`
  ADD PRIMARY KEY (`hobby`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `user_hobbies`
--
ALTER TABLE `user_hobbies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `ad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `user_hobbies`
--
ALTER TABLE `user_hobbies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `ads_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`);

--
-- Constraints for table `user_hobbies`
--
ALTER TABLE `user_hobbies`
  ADD CONSTRAINT `user_hobbies_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2025 at 07:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hobbyhivechat`
--
CREATE DATABASE IF NOT EXISTS hobbyhivechat;
USE hobbyhivechat;
-- --------------------------------------------------------

--
-- Table structure for table `chats_table`
--

CREATE TABLE `chats_table` (
  `id` int(11) NOT NULL,
  `from_id` varchar(255) NOT NULL,
  `to_id` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date_time_stamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats_table`
--

INSERT INTO `chats_table` (`id`, `from_id`, `to_id`, `message`, `date_time_stamp`) VALUES
(1, '88', '65', 'hi', '2025-04-11 09:44:49'),
(2, '88', '65', 'hi', '2025-04-11 09:45:02'),
(3, '88', '65', 'HI', '2025-04-11 09:53:59'),
(4, '88', '65', 'TESTING', '2025-04-11 09:54:03'),
(5, '88', '65', 'hi', '2025-04-11 09:55:37'),
(6, '88', '65', 'hi', '2025-04-11 09:58:31'),
(7, '88', '65', 'hello', '2025-04-11 09:59:22'),
(8, '88', '65', 'hi', '2025-04-11 10:00:40'),
(9, '65', '88', 'hi', '2025-04-11 10:02:36'),
(10, '88', '65', 'hi', '2025-04-11 10:17:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats_table`
--
ALTER TABLE `chats_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats_table`
--
ALTER TABLE `chats_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
