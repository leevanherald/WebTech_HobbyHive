

CREATE DATABASE IF NOT EXISTS hobbyhive;
USE hobbyhive;

-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db
-- Generation Time: May 08, 2025 at 02:52 AM
-- Server version: 8.4.5
-- PHP Version: 8.2.27

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

CREATE TABLE `ads` (
  `ad_id` int NOT NULL,
  `ad_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hobby` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vendor_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`ad_id`, `ad_name`, `description`, `hobby`, `vendor_id`) VALUES
(1, 'Summer Sports Sale', 'Get the best deals on all cycling and water sports gear!', NULL, 5),
(2, 'Music Fiesta', 'Exclusive discounts on all musical instruments for a limited time.', NULL, 5),
(3, 'Adventure Awaits', 'Rent camping and trekking gear at affordable prices.', NULL, 5),
(4, 'Board Game Bonanza', 'Special offers on strategy board games. Fun for all ages!', NULL, 5),
(5, 'Sky Watch Night', 'Buy telescopes and stargazing gear this weekend only!', NULL, 5),
(6, 'Fitness Flash Sale', 'Up to 30% off on fitness equipment and yoga gear.', NULL, 5),
(7, 'Photography Fest', 'Rent high-end cameras and accessories at great prices.', NULL, 5),
(8, 'Creative Corner', 'Sketchpads and art supplies now available with discounts.', NULL, 5),
(9, 'Drone Days', 'Fly high with our latest collection of drones on rent.', NULL, 5),
(10, 'Ultimate Hobby Fair', 'Explore products across all hobbies. Best deals for enthusiasts!', NULL, 5),
(11, 'kmkm', 'kmkmkmkmkmk', NULL, 5),
(12, 'Tennis Rackets for free', 'Tennis', NULL, 6),
(13, 'asd', 'asdsa', NULL, 6),
(14, 'Tennis racket 20% off', 'Tennis', NULL, 7),
(15, 'Paints', 'paints for ur hobby', NULL, 7),
(16, 'asda', 'asdas', NULL, 7),
(17, 'asda', 'asdas', NULL, 7),
(18, 'asda', 'asdas', NULL, 7),
(19, 'testing', 'trying', NULL, 7),
(20, 'testing', 'trying', 'Painting', 7),
(21, 'testing', 'trying', 'Painting', 7),
(22, 'testingasf', 'tryingasdas', 'Painting', 7),
(23, '50% discount on cyles', '50% off', 'Cycling', 7);

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `hobby` varchar(255) NOT NULL,
  `region` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `name`, `phone`, `hobby`, `region`, `description`, `image_url`, `created_at`) VALUES
(3, 'Leevan ', '1234567899', 'Gym', 'East', 'asdasdadasfasfdfsdfsdfsdfsdfdsfsdf', NULL, '2025-04-18 10:47:08'),
(4, 'Levan', '3425634252', 'tenis', 'North', 'asdasdasdsfgsdsdgsdgsdgdsgsdgdf', NULL, '2025-05-07 20:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `friend_requests`
--

CREATE TABLE `friend_requests` (
  `id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `friend_requests`
--

INSERT INTO `friend_requests` (`id`, `sender_id`, `receiver_id`, `status`, `created_at`) VALUES
(23, 68, 95, 'accepted', '2025-05-07 21:25:57');

-- --------------------------------------------------------

--
-- Table structure for table `hobbies`
--

CREATE TABLE `hobbies` (
  `hobby` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fin` int DEFAULT NULL,
  `func` int DEFAULT NULL,
  `phys` int DEFAULT NULL,
  `psych` int DEFAULT NULL,
  `social` int DEFAULT NULL,
  `sat` int DEFAULT NULL,
  `time` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hobbies`
--

INSERT INTO `hobbies` (`hobby`, `fin`, `func`, `phys`, `psych`, `social`, `sat`, `time`, `description`) VALUES
('Action Figures', 4, 5, 2, 6, 6, 7, 8, 'Collecting and displaying action figures, often from movies, comics, or games.'),
('Barbecuing', 5, 7, 3, 6, 8, 9, 5, 'Grilling and enjoying food outdoors with friends and family.'),
('Basketball', 5, 8, 10, 6, 9, 8, 4, 'Playing a fast-paced team sport involving shooting hoops and teamwork.'),
('Bird Watching', 3, 5, 4, 7, 6, 8, 7, 'Observing birds in their natural habitat, identifying species, and enjoying nature.'),
('Board Games', 3, 6, 1, 7, 8, 8, 6, 'Playing strategic or chance-based games on a board, often with friends or family.'),
('Book Clubs', 3, 6, 2, 7, 8, 8, 7, 'Joining a group to read and discuss books, usually fiction or nonfiction themes.'),
('Casual Walks', 3, 5, 5, 7, 6, 8, 7, 'Taking light walks for relaxation, reflection, or fitness.'),
('Chess', 3, 7, 1, 9, 5, 9, 6, 'Engaging in a strategy game between two opponents with defined rules and tactics.'),
('Choirs', 4, 6, 4, 7, 9, 9, 6, 'Singing in harmony with a group, often performing in concerts or events.'),
('Coins', 3, 4, 1, 7, 4, 6, 9, 'Collecting and studying historical and rare coins from around the world.'),
('Comic Books', 3, 5, 1, 7, 5, 8, 7, 'Reading and collecting illustrated stories, often in series form.'),
('Cooking', 6, 8, 3, 7, 7, 9, 6, 'Preparing meals at home and exploring different cuisines and techniques.'),
('Crossword', 3, 5, 1, 7, 4, 7, 8, 'Solving word puzzles that challenge vocabulary and thinking skills.'),
('Cycling', 5, 7, 8, 6, 7, 9, 6, 'Riding a bicycle for recreation, exercise, or commuting.'),
('Digital Art', 3, 7, 1, 7, 5, 9, 7, 'Creating visual art using digital tools like tablets or software.'),
('Drawing', 2, 6, 1, 7, 5, 8, 6, 'Sketching or illustrating by hand as a form of artistic expression.'),
('Fermenting', 4, 6, 1, 7, 5, 7, 8, 'Producing fermented foods and drinks like yogurt, kombucha, or pickles.'),
('Finance & Business', 7, 9, 2, 8, 5, 8, 7, 'Studying financial markets, investing, and exploring business ventures.'),
('Gardening', 4, 6, 5, 8, 5, 9, 7, 'Cultivating plants, flowers, and vegetables in outdoor or indoor spaces.'),
('Gourmet Cooking', 6, 8, 2, 7, 7, 9, 6, 'Creating refined, high-quality meals that emphasize taste and presentation.'),
('Gymnastics', 5, 8, 10, 7, 8, 9, 4, 'Performing acrobatic routines requiring strength, flexibility, and balance.'),
('Hiking', 5, 7, 9, 8, 7, 9, 5, 'Walking in nature, usually on trails or mountains, for exercise and views.'),
('Language Learning', 4, 7, 1, 9, 6, 9, 7, 'Studying and practicing new languages for travel, communication, or career.'),
('Meditation', 2, 6, 2, 9, 5, 9, 7, 'Practicing mindfulness and breathing exercises for calm and focus.'),
('Online Courses', 5, 8, 1, 8, 5, 9, 7, 'Learning new skills or knowledge through digital classes and platforms.'),
('Painting', 3, 5, 2, 8, 6, 9, 7, 'Applying paint to canvas or surfaces to create visual art.'),
('Pastry Making', 5, 7, 2, 6, 6, 8, 7, 'Baking sweet and savory pastries, often experimenting with recipes.'),
('Photography', 5, 6, 4, 6, 7, 8, 6, 'Capturing images with a camera, creatively or professionally.'),
('Pottery', 4, 6, 4, 7, 6, 8, 6, 'Shaping clay into functional or decorative objects by hand or wheel.'),
('Programming', 6, 9, 2, 8, 5, 8, 7, 'Writing code to build software, apps, or tools for various needs.'),
('Reading', 3, 5, 1, 8, 5, 9, 8, 'Enjoying and analyzing written texts ranging from novels to nonfiction.'),
('Research', 6, 8, 2, 9, 4, 8, 6, 'Investigating topics in depth to generate insights or discoveries.'),
('Robotics', 6, 9, 3, 8, 5, 8, 6, 'Building and experimenting with machines or electronics with automation in mind.'),
('Sculpting', 4, 7, 3, 9, 4, 9, 8, 'Carving and shaping materials like wood or stone into artistic forms.'),
('Spa & Wellness', 5, 7, 3, 8, 7, 9, 7, 'Exploring wellness techniques like spas, relaxation, and body care.'),
('Stamps', 2, 4, 1, 6, 3, 5, 8, 'Collecting postal stamps as historical or artistic artifacts.'),
('Stargazing', 2, 5, 2, 9, 4, 8, 8, 'Observing stars, planets, and celestial events, often with a telescope.'),
('Sudoku', 3, 6, 1, 8, 4, 8, 7, 'Solving logic-based number puzzles for mental challenge and fun.'),
('Tennis', 6, 8, 9, 7, 8, 8, 5, 'Playing a fast-paced racquet sport with skill and agility.'),
('Traveling', 7, 8, 7, 8, 9, 9, 5, 'Exploring new places and cultures through journeys and vacations.'),
('Trivia Quizzes', 4, 6, 1, 8, 6, 8, 7, 'Answering trivia questions and testing knowledge across topics.'),
('Video Editing', 5, 8, 2, 7, 7, 8, 7, 'Editing and enhancing video clips to produce creative content.'),
('Video Games', 4, 7, 2, 6, 7, 9, 7, 'Playing interactive digital games on consoles, PCs, or mobile devices.'),
('Vintage Items', 4, 5, 1, 6, 5, 7, 8, 'Collecting or appreciating antique or retro items of historical value.'),
('Volunteering', 4, 7, 4, 7, 9, 9, 6, 'Offering time and skills to help others or contribute to causes.'),
('Web Design', 5, 8, 2, 7, 6, 8, 7, 'Designing attractive and functional layouts for websites and apps.'),
('Yoga', 3, 7, 6, 9, 6, 9, 7, 'Practicing poses and stretches to improve flexibility and inner peace.');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int NOT NULL,
  `product_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_hobby` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `rentorbuy` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int DEFAULT NULL
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
(11, 'wfwef', 'Tennis', 5, '', 342),
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
(31, 'reterte', 'rterter', 6, 'rent', 0),
(32, 'Tennis', 'tennis', 7, 'rent', 200),
(33, 'Tennis Racket', 'Tennis', 7, 'rent', 200),
(34, 'asdas', 'Painting', 7, 'rent', 2345),
(35, 'fdfgdfgdfgfd', 'Painting', 7, 'rent', 3435),
(36, 'fdfgdfgdfgfd', 'Painting', 7, 'rent', 3435),
(37, 'fdfgdfgdfgfd', 'Drawing', 7, 'rent', 3435),
(38, 'DSLR CAMERA', 'Photography', 7, 'buy', 5000),
(39, 'Canvas', 'Drawing', 7, 'buy', 50000);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('0-_cDCr-Ou9Qgt9E-wl090ihm60MlMDs', 1747256451, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T21:00:51.303Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('0Hfcq0xx677mh7f-jSlrrx6T9VU2bEKq', 1747115095, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:44:55.231Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('0U3vBIEfpCmjs2Uj55rVBdaC_RS_VzWN', 1747118032, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:33:52.048Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('2mgu47rGa67zvVHR1MOFQvY6nXUCltOp', 1747113813, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:23:33.417Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('3KRZi6uiVmb1E1YSkogOR3RLJ7XqxP_A', 1747118319, '{\"cookie\":{\"originalMaxAge\":604799998,\"expires\":\"2025-05-13T06:38:38.869Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('7JVE1TBa2JFiwzUgG4xOPT7P8f6jC_6E', 1747118033, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:33:52.610Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('E5VFKuYa3y1iVLQ6Ddk-uC_flvMhOD9w', 1747258123, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T21:28:42.796Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('ECCR8ya3V6ImsROkVvyAJ0P7yK0DrR9H', 1747122295, '{\"cookie\":{\"originalMaxAge\":604799999,\"expires\":\"2025-05-13T07:44:54.883Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('GhmPx_XpaM1KOcRln-k4d-lvlA4CShyE', 1747113814, '{\"cookie\":{\"originalMaxAge\":604799988,\"expires\":\"2025-05-13T05:23:33.623Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('GrwQeHvFFsTITJE85bITnnd-bRzxHTRf', 1747102177, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T02:09:37.069Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('JPu-zVp6FMto52Oi04Eko8wkIFOyn0de', 1747260678, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T22:11:17.578Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('MwZ40OlLPnQIN5omzFK3gdwSYCHBuEx0', 1747256475, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T21:01:14.942Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('NSySylwxJA05jtKonP1NnOVxFrr7QYt_', 1747113810, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:23:30.409Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('NTMTSHHv0id6vqpTK3jD4z4puKpOzaYY', 1747115058, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:44:18.236Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('NVtpoRv61jAUHrYbg3CiP38jQXzXjKDE', 1747258356, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T21:32:35.721Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('O06yrlrrKtnVbKG7ddt6MsAdJfKvxbVk', 1747122297, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T07:44:56.641Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('Pybtbq3oz2o80z-T-EjDh0Hr1uiS8qP6', 1747115025, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:43:45.146Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('PzHU0qPzwT4Q73BHcWWCDTGa_BZysgTK', 1747118033, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:33:52.714Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('QuNFtKZ5yswMhs2N-Unr_KM81iqTAWm2', 1747252158, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T19:49:17.885Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":88,\"email\":\"leevanherald5@gmail.com\",\"name\":\"leevan\"}}'),
('TK3VeVIh9gmHAWUJQInWWvL7Pg3YCABX', 1747122297, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T07:44:56.654Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('XKFNW8RBhKPirrO6Bx8kYNKE_ves1oDg', 1747118319, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:38:38.925Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('_Y40YmvYrDLCFipZlk7IzNYL1EMqbnOp', 1747254738, '{\"cookie\":{\"originalMaxAge\":604799999,\"expires\":\"2025-05-14T20:32:18.486Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('ck3suul-_ZuV85Ys-GKVHo3tGxN3uxm7', 1747258124, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T21:28:43.520Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('eVe6WilJg_SwOkc00Oud69xPT8D3rh3T', 1747118033, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:33:52.752Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('frKk6cnCM_DwI8ebK4Iq_aXSLIgPfcWf', 1747115075, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:44:34.959Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('iRKd1RkdmyKbwJaNx7f6q_XvVIc1WSde', 1747254422, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T20:27:01.639Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('kH1BlQtiHgTKF0lg5HtgACqCBgk1KhWj', 1747118033, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:33:52.610Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('l0puudHI6BBa5gEGdLPFcSGk0N3HFQRo', 1747117974, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T06:32:53.822Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('lljiP6cW8PhOJRaj-f8SbQWVejXgYx5y', 1747122297, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T07:44:56.640Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('mqJpZA1bowW6iNABvswBKf3jk4eyBmKb', 1747117040, '{\"cookie\":{\"originalMaxAge\":604799999,\"expires\":\"2025-05-13T06:17:20.467Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":95,\"email\":\"ashish123@gmail.com\",\"name\":\"Ashish Muley\"}}'),
('nwoyOHlK_1LIw548zP05T4Uxvwkd4ALg', 1747122297, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T07:44:56.655Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('w4Kinkj-djKlqgpC2McakNxRtQ2z9kQL', 1747247207, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T18:26:46.696Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('wXZcDvhKQPGp6x9PfrPBjcO9bhNsS7DJ', 1747122297, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T07:44:56.596Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}'),
('xPxd_sQuM6sEjunk4JnlAtfwTzZXBWp0', 1747113813, '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-13T05:23:33.417Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `profile_photo` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `current_status` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `followers` int DEFAULT NULL,
  `age_group` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `education` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
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
(88, 'leevan', NULL, '1994-06-25', 'leevanherald5@gmail.com', '', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'High School', 'leevan'),
(89, 'ashish', NULL, '2004-08-23', 'ashish@gmail.com', '8997989989', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'Undergraduate', '123456'),
(90, 'user1', NULL, NULL, 'user1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, '123456'),
(91, 'Abheerav Patankar', 'ritika.jpg', '2004-08-23', 'abheerav@gmail.com', '8997989989', 'Pune', 'Maharashtra', 'India', 'Male', 'Student', 0, '19-35', 'Undergraduate', 'abheerav'),
(92, 'leevan', NULL, '1996-01-01', 'leevanherald10@gmail.com', '', 'Bangalore', 'Bihar', 'India', 'Male', NULL, 0, '19-35', 'Graduate', 'leevan'),
(93, 'Leevvan', NULL, '1995-10-01', 'leevanherald11@gmail.com', '', 'Chennai', 'Assam', 'India', 'Female', NULL, 0, '19-35', 'Graduate', 'leevan'),
(94, 'Leevan Herald', NULL, '1996-10-02', 'leevanherald12@gmail.com', '', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'High School', 'leevan'),
(95, 'Ashish Muley', NULL, '1996-01-01', 'ashish123@gmail.com', '', 'Pune', 'Maharashtra', 'India', 'Male', NULL, 0, '19-35', 'High School', 'leevan'),
(96, 'leevan', NULL, '1996-10-02', 'leevanherald20@gmail.com', '', 'Kochi', 'Kerala', 'India', 'Male', NULL, 0, '19-35', 'Graduate', 'leevan'),
(97, 'leevan herald', NULL, '1998-07-07', 'leevanherald21@gmail.com', '', 'Coimbatore', 'Kerala', 'India', 'Male', NULL, 0, '19-35', 'Graduate', 'leevan'),
(98, 'Leevan', NULL, '2008-06-06', 'leevan@gmail.com', '', 'Chennai', 'Tamil Nadu', 'India', 'Male', NULL, 0, '0-19', 'Undergraduate', 'leevan'),
(99, 'Leevan Herald', NULL, '2025-05-01', 'leevan.herald21@gmail.com', '', 'Boston', 'Sikkim', 'USA', 'Male', NULL, 0, '0-19', 'Undergraduate', 'leevan'),
(100, 'Leevan Herald', NULL, '2025-05-15', 'leevan.herald22@gmail.com', '', 'Bangalore', 'Assam', 'UK', 'Male', NULL, 0, '0-19', 'Graduate', 'leevan');

-- --------------------------------------------------------

--
-- Table structure for table `user_hobbies`
--

CREATE TABLE `user_hobbies` (
  `id` int NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hobby` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `experience` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hobby_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_hobbies`
--

INSERT INTO `user_hobbies` (`id`, `email`, `hobby`, `description`, `experience`, `hobby_id`) VALUES
(67, 'aarav.sharma@example.com', 'Basketball', 'Plays in a local club', '5 years', 3),
(68, 'aarav.sharma@example.com', 'Photography', 'Enjoys capturing landscapes', '3 years', 28),
(69, 'priya.verma@example.com', 'Painting', 'Works with watercolors and acrylics', '4 years', 26),
(70, 'priya.verma@example.com', 'Book Clubs', 'Discusses literature with peers', '5 years', 6),
(71, 'rohan.iyer@example.com', 'Programming', 'Develops web and mobile apps', '8 years', 30),
(72, 'rohan.iyer@example.com', 'Chess', 'Plays online tournaments', '6 years', 8),
(73, 'ananya.nair@example.com', 'Yoga', 'Practices morning yoga', '7 years', 47),
(74, 'ananya.nair@example.com', 'Meditation', 'Daily mindfulness routine', '5 years', 24),
(75, 'siddharth.kapoor@example.com', 'Gardening', 'Grows organic vegetables', '6 years', 19),
(76, 'siddharth.kapoor@example.com', 'Crossword', 'Enjoys solving daily puzzles', '4 years', 13),
(77, 'neha.patil@example.com', 'Tennis', 'Plays at district level', '4 years', 39),
(78, 'neha.patil@example.com', 'Drawing', 'Sketching portraits in free time', '3 years', 16),
(79, 'vikram.singh@example.com', 'Cycling', 'Enjoys long rides on weekends', '6 years', 14),
(80, 'vikram.singh@example.com', 'Sudoku', 'Loves solving logic puzzles', '5 years', 38),
(81, 'sneha.das@example.com', 'Photography', 'Captures moments professionally', '3 years', 28),
(82, 'sneha.das@example.com', 'Video Games', 'Plays RPG and strategy games', '5 years', 43),
(83, 'rahul.joshi@example.com', 'Hiking', 'Explores mountain trails', '7 years', 22),
(84, 'rahul.joshi@example.com', 'Programming', 'Works on open-source projects', '6 years', 30),
(85, 'kavya.menon@example.com', 'Reading', 'Fiction and non-fiction enthusiast', '8 years', 31),
(86, 'kavya.menon@example.com', 'Pastry Making', 'Loves baking desserts', '5 years', 27),
(87, 'arjun.reddy@example.com', 'Robotics', 'Builds small automation projects', '4 years', 33),
(88, 'arjun.reddy@example.com', 'Stargazing', 'Enjoys astronomical events', '5 years', 37),
(89, 'meera.gupta@example.com', 'Traveling', 'Loves exploring new cultures', '6 years', 40),
(90, 'meera.gupta@example.com', 'Finance & Business', 'Passionate about investment', '3 years', 18),
(91, 'aditya.das@example.com', 'Video Games', 'Enjoys esports tournaments', '8 years', 43),
(92, 'aditya.das@example.com', 'Web Design', 'Creates UI/UX designs', '5 years', 46),
(93, 'pooja.rao@example.com', 'Yoga', 'Practices meditation daily', '7 years', 47),
(94, 'pooja.rao@example.com', 'Cooking', 'Experiments with world cuisines', '5 years', 12),
(95, 'amit.saxena@example.com', 'Trekking', 'Explores Himalayan trails', '6 years', NULL),
(96, 'amit.saxena@example.com', 'Choirs', 'Sings in a local choir', '4 years', 9),
(97, 'tanya.bhatt@example.com', 'Sculpting', 'Works with clay and stone', '5 years', 34),
(98, 'tanya.bhatt@example.com', 'Chess', 'Enjoys strategic board games', '4 years', 8),
(99, 'rajiv.nair@example.com', 'Gardening', 'Grows flowers and herbs', '9 years', 19),
(100, 'rajiv.nair@example.com', 'Photography', 'Loves nature photography', '6 years', 28),
(101, 'swati.kulkarni@example.com', 'Tennis', 'Plays in amateur leagues', '4 years', 39),
(102, 'swati.kulkarni@example.com', 'Gaming', 'Loves multiplayer games', '5 years', NULL),
(103, 'kabir.malhotra@example.com', 'Gymnastics', 'Practices calisthenics', '5 years', 21),
(104, 'kabir.malhotra@example.com', 'Cooking', 'Enjoys gourmet cooking', '6 years', 12),
(105, 'deepika.sen@example.com', 'Drawing', 'Sketches portraits and landscapes', '8 years', 16),
(106, 'deepika.sen@example.com', 'Finance & Business', 'Interested in stock trading', '6 years', 18),
(107, 'manish.tiwari@example.com', 'Online Courses', 'Always learning new skills', '5 years', 25),
(108, 'manish.tiwari@example.com', 'Cycling', 'Rides to work daily', '4 years', 14),
(109, 'simran.kaur@example.com', 'Volunteering', 'Helps at NGOs and charities', '6 years', 45),
(110, 'simran.kaur@example.com', 'Book Clubs', 'Loves literary discussions', '5 years', 6),
(111, 'aniket.sen@example.com', 'Robotics', 'Builds AI-driven bots', '7 years', 33),
(112, 'aniket.sen@example.com', 'Chess', 'Enjoys strategy and planning', '6 years', 8),
(113, 'ritika.sharma@example.com', 'Meditation', 'Practices mindfulness daily', '7 years', 24),
(114, 'ritika.sharma@example.com', 'Sudoku', 'Solves puzzles regularly', '5 years', 38),
(115, 'ashish@example.com', 'Hiking', 'I love going on weekend hikes a lot', 'Beginner (1-2 years)', 22),
(116, 'ashish@example.com', 'Chess', 'Only a casual player', 'Beginner (1-2 years)', 8),
(117, 'ashish@example.com', 'Drawing', 'Very much into drawing. I like pencil drawing best.', 'Intermediate (3-5 years)', 16),
(118, 'leevanherald5@gmail.com', 'Programming', 'Crazy', 'Beginner', 30),
(119, 'ashish@gmail.com', 'Painting', NULL, NULL, 26),
(120, 'ashish@gmail.com', 'Drawing', NULL, NULL, 16),
(121, 'ashish@gmail.com', 'Hiking', NULL, NULL, 22),
(122, 'user1@gmail.com', 'Vintage Items', NULL, NULL, 44),
(123, 'user1@gmail.com', 'Comic Books', NULL, NULL, 11),
(124, 'leevanherald5@gmail.com', 'Chess', 'Good', 'Intermediate', 8),
(125, 'leevanherald5@gmail.com', 'Drawing', 'Amazing', 'Expert', 16),
(126, 'leevanherald5@gmail.com', 'Tennis', 'Amaazing', 'Beginner', 39),
(127, 'leevanherald5@gmail.com', 'Pottery', 'Good', 'Advanced', 29),
(128, 'leevanherald5@gmail.com', 'Choirs', 'Learnt to Sing', 'Intermediate', 9),
(129, 'leevanherald12@gmail.com', 'Fermenting', 'asdasd', 'Advanced', 17),
(130, 'leevanherald12@gmail.com', 'Sculpting', 'asdasd', 'Intermediate', 34),
(131, 'ashish123@gmail.com', 'Drawing', 'Good Experience', 'Intermediate', 16),
(132, 'ashish123@gmail.com', 'Pastry Making', 'Good Experience', 'Intermediate', 27),
(133, 'ashish123@gmail.com', 'Stamps', 'Good Experience', 'Advanced', 36),
(134, 'ashish123@gmail.com', 'Bird Watching', 'Good Experience', 'Beginner', 4),
(135, 'ashish123@gmail.com', 'Video Games', 'Good Experience', 'Beginner', 43),
(136, 'ashish123@gmail.com', 'Tennis', 'Good Experience', 'Beginner', 39),
(137, 'leevanherald21@gmail.com', 'Drawing', 'Sjsjsj', 'Beginner', 16),
(138, 'leevanherald21@gmail.com', 'Tennis', 'Ajjsjs', 'Beginner', 39),
(139, 'leevan@gmail.com', 'Drawing', 'Amazing', 'Beginner', NULL),
(140, 'leevan@gmail.com', 'Online Courses', 'Amazing', 'Intermediate', NULL),
(141, 'leevan@gmail.com', 'Fermenting', 'Amazing', 'Advanced', NULL),
(142, 'leevan@gmail.com', 'Web Design', 'Amazing', 'Beginner', NULL),
(143, 'leevan@gmail.com', 'Gardening', 'Amazing', 'Intermediate', NULL),
(144, 'leevan@gmail.com', 'Cooking', 'Amazing', 'Intermediate', NULL),
(145, 'leevan@gmail.com', 'Stamps', 'Amazing', 'Beginner', NULL),
(146, 'leevan@gmail.com', 'Yoga', 'Amazing', 'Beginner', NULL),
(147, 'leevan@gmail.com', 'Sudoku', 'Amazing', 'Intermediate', NULL),
(148, 'leevan.herald21@gmail.com', 'Drawing', 'asdas', 'Intermediate', NULL),
(149, 'leevan.herald21@gmail.com', 'Pastry Making', 'asdas', 'Intermediate', NULL),
(150, 'leevan.herald22@gmail.com', 'Drawing', 'asdasdasd', 'Advanced', NULL),
(151, 'leevan.herald22@gmail.com', 'Pastry Making', 'asd', 'Advanced', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_recommendations`
--

CREATE TABLE `user_recommendations` (
  `user_id` int NOT NULL,
  `recommended_user_id` int NOT NULL,
  `score` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `vendor_id` int NOT NULL,
  `vendor_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vendor_email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vendor_pass` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `vendor_phone` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL
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
(6, 'leevan', 'leevan@gmail.com', 'leevan', NULL),
(7, 'ashish', 'ashish123@gmail.com', 'leevan', NULL),
(8, 'Ashish', 'ashish12@gmail.com', 'leevan', NULL),
(9, 'Ashish', 'ashish1@gmail.com', 'leevan', NULL);

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
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

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
-- Indexes for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  ADD PRIMARY KEY (`user_id`,`recommended_user_id`),
  ADD KEY `recommended_user_id` (`recommended_user_id`);

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
  MODIFY `ad_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `user_hobbies`
--
ALTER TABLE `user_hobbies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `vendor_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `ads_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`);

--
-- Constraints for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD CONSTRAINT `friend_requests_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friend_requests_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

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

--
-- Constraints for table `user_recommendations`
--
ALTER TABLE `user_recommendations`
  ADD CONSTRAINT `user_recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_recommendations_ibfk_2` FOREIGN KEY (`recommended_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db
-- Generation Time: May 08, 2025 at 02:54 AM
-- Server version: 8.4.5
-- PHP Version: 8.2.27

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

-- --------------------------------------------------------

--
-- Table structure for table `chats_table`
--

CREATE TABLE `chats_table` (
  `id` int NOT NULL,
  `from_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `to_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
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
(10, '88', '65', 'hi', '2025-04-11 10:17:13'),
(11, '88', '71', 'hi  how you doing?', '2025-04-13 17:51:14'),
(12, '71', '88', 'good, what about you?', '2025-04-13 17:51:21'),
(13, '88', '87', 'Hi Ashish how u doing?', '2025-04-14 11:04:51'),
(14, '87', '88', 'Good brotha', '2025-04-14 11:05:02'),
(15, '88', '87', 'Good to know.', '2025-04-14 11:05:32'),
(16, '95', '88', 'hi', '2025-04-18 10:37:51'),
(17, '88', '95', 'nothing much how are you doing?', '2025-04-18 10:38:11'),
(18, '95', '95', 'hello how are you doing?', '2025-04-18 17:19:24'),
(19, '95', '95', 'Im good', '2025-04-18 17:19:29'),
(20, '95', '88', 'hi bro', '2025-04-19 04:00:30'),
(21, '95', '88', 'I am 95', '2025-04-19 09:02:07'),
(22, '88', '95', 'I am 88', '2025-04-19 09:02:28'),
(23, '95', '88', 'Hii Leevan', '2025-04-19 20:38:09'),
(24, '95', '88', 'sup', '2025-05-07 19:28:31'),
(25, '95', '95', 'nice', '2025-05-07 19:29:12'),
(26, '88', '95', 'i am 95', '2025-05-07 20:56:56'),
(27, '88', '95', 'no sorry, im 88', '2025-05-07 20:57:04'),
(28, '95', '68', 'hi, how you doing?', '2025-05-07 21:26:19'),
(29, '68', '95', 'im good, what about you?', '2025-05-07 21:26:37'),
(30, '68', '95', 'want to play chess?', '2025-05-07 21:26:49'),
(31, '95', '68', 'sure. join you in a bit', '2025-05-07 21:27:07');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
