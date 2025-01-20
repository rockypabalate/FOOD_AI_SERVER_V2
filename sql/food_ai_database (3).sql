-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2024 at 07:59 AM
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
-- Database: `food_ai_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `cooking_instructions`
--

CREATE TABLE `cooking_instructions` (
  `id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `step_number` int(11) DEFAULT NULL,
  `instruction` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cooking_instructions`
--

INSERT INTO `cooking_instructions` (`id`, `food_id`, `step_number`, `instruction`) VALUES
(1, 1, 1, 'In a bowl, marinate the chicken in vinegar, soy sauce, garlic, and pepper for at least 30 minutes.'),
(2, 1, 2, 'Heat oil in a pan and sauté onions until translucent.'),
(3, 1, 3, 'Add the marinated chicken (reserve the marinade) and cook until the chicken is browned.'),
(4, 1, 4, 'Pour the reserved marinade into the pan, add bay leaves, and bring to a boil.'),
(5, 1, 5, 'Lower the heat and simmer for 30-40 minutes until the chicken is tender. Stir occasionally.'),
(6, 1, 6, 'Add sugar and salt to taste. Cook for an additional 5 minutes. Serve hot with rice.'),
(7, 2, 1, 'In a pot, heat cooking oil over medium heat and sauté onions, garlic, and ginger until fragrant.'),
(8, 2, 2, 'Add the sliced unripe jackfruit and stir for a few minutes.'),
(9, 2, 3, 'Pour in the coconut milk and bring to a simmer.'),
(10, 2, 4, 'Add fish sauce and green chili peppers. Stir well and let it cook for about 20 minutes until the jackfruit is tender.'),
(11, 2, 5, 'If using shrimp, add them to the pot and cook for another 5 minutes until they turn pink and cooked through.'),
(12, 2, 6, 'Season with salt to taste. Serve hot with steamed rice.'),
(13, 3, 1, 'In a pot, rinse the mung beans and boil them in water until tender, about 30 minutes. Set aside.'),
(14, 3, 2, 'In another pan, heat cooking oil over medium heat. Sauté garlic and onions until fragrant.'),
(15, 3, 3, 'Add the chopped tomatoes and cook until softened. If using pork or shrimp, add them and cook until browned.'),
(16, 3, 4, 'Stir in the boiled mung beans and add fish sauce, salt, and pepper. Mix well and let simmer for 10 minutes.'),
(17, 3, 5, 'Add spinach (or other leafy greens) and cook for an additional 2-3 minutes until wilted.'),
(18, 3, 6, 'Serve hot with steamed rice.'),
(19, 4, 1, 'In a pot, combine vinegar, water, garlic, onion, ginger, and fish sauce. Bring to a boil.'),
(20, 4, 2, 'Add the cleaned fish to the pot, ensuring it is submerged in the liquid.'),
(21, 4, 3, 'Add the sliced eggplant and bitter melon (if using). Season with pepper and salt.'),
(22, 4, 4, 'Cover the pot and simmer for 15-20 minutes until the fish is cooked through and the vegetables are tender.'),
(23, 4, 5, 'Taste the sauce and adjust the seasoning if necessary. Serve hot with steamed rice.'),
(24, 5, 1, 'In a large pot, heat cooking oil over medium heat and sauté garlic and onions until fragrant.'),
(25, 5, 2, 'Add the beef (or goat) and cook until browned on all sides.'),
(26, 5, 3, 'Pour in the tomato sauce and add water. Stir in the liver spread and bay leaves.'),
(27, 5, 4, 'Cover the pot and simmer for about 1 to 1.5 hours, or until the meat is tender.'),
(28, 5, 5, 'Add the diced potatoes, carrots, and bell peppers. Cook for another 20-30 minutes until the vegetables are tender.'),
(29, 5, 6, 'Stir in olives (if using) and season with salt and pepper to taste. Serve hot with steamed rice.'),
(30, 6, 1, 'In a pan, heat some oil and sauté garlic and onion until fragrant.'),
(31, 6, 2, 'Add ground pork and cook until browned, then add chopped shrimp and cook until pink.'),
(32, 6, 3, 'Stir in grated carrots and chopped cabbage, and season with salt and pepper. Cook for a few minutes until vegetables are tender.'),
(33, 6, 4, 'Remove from heat and let the filling cool.'),
(34, 6, 5, 'Place a tablespoon of filling on a lumpia wrapper, fold the sides, and roll tightly. Seal the edge with beaten egg.'),
(35, 6, 6, 'Heat oil in a deep pan and fry the lumpia until golden brown. Drain on paper towels and serve with dipping sauce.'),
(36, 7, 1, 'In a large pot, heat cooking oil over medium heat and sauté garlic and onions until fragrant.'),
(37, 7, 2, 'Add the diced pork and cook until browned.'),
(38, 7, 3, 'Pour in the tomato sauce and add water, bay leaves, salt, and pepper. Bring to a boil.'),
(39, 7, 4, 'Cover the pot and simmer for about 30 minutes until the pork is tender.'),
(40, 7, 5, 'Add the diced potatoes, carrots, and bell pepper. Cook for another 15-20 minutes until the vegetables are tender.'),
(41, 7, 6, 'Stir in the diced pork liver and cook for an additional 5 minutes. Serve hot with rice.'),
(42, 8, 1, 'Soak the rice noodles in water for 30 minutes or until softened, then drain.'),
(43, 8, 2, 'In a large pan, heat cooking oil over medium heat and sauté garlic and onions until fragrant.'),
(44, 8, 3, 'Add the chicken and cook until no longer pink, then add shrimp and cook until they turn pink.'),
(45, 8, 4, 'Stir in carrots and cabbage, cooking until tender.'),
(46, 8, 5, 'Add the soaked rice noodles and soy sauce, mixing well until everything is combined and heated through.'),
(47, 8, 6, 'Season with pepper and garnish with chopped green onions before serving.'),
(48, 9, 1, 'In a large pot, boil water and add the pork pieces. Cook until tender, skimming off any foam that rises to the surface.'),
(49, 9, 2, 'Add onions, tomatoes, and tamarind paste to the pot. Simmer for about 10 minutes.'),
(50, 9, 3, 'Stir in the radish, eggplant, and string beans, cooking for an additional 5-7 minutes.'),
(51, 9, 4, 'Season with fish sauce and salt to taste, and add green chili peppers for spice.'),
(52, 9, 5, 'Finally, add the water spinach (if using) and cook for another 2 minutes. Serve hot with rice.'),
(53, 10, 1, 'Grill the eggplants over an open flame or stovetop until the skin is charred. Allow to cool, then peel and flatten slightly.'),
(54, 10, 2, 'In a pan, heat oil and sauté garlic and onion until fragrant. Add the ground pork (if using) and cook until browned. Season with salt and pepper.'),
(55, 10, 3, 'On a flat surface, place a grilled eggplant and spread a portion of the meat mixture over it.'),
(56, 10, 4, 'Dip the eggplant into the beaten eggs, coating both sides.'),
(57, 10, 5, 'In a pan, heat oil over medium heat and fry the eggplant until golden brown on both sides. Drain on paper towels before serving.'),
(58, 11, 1, 'In a pot, heat oil over medium heat and sauté garlic, onion, and ginger until fragrant.'),
(59, 11, 2, 'Add the chicken pieces and cook until lightly browned.'),
(60, 11, 3, 'Pour in the water and bring to a boil. Reduce heat and let simmer until the chicken is tender.'),
(61, 11, 4, 'Add the green papaya and cook until tender, about 5 minutes.'),
(62, 11, 5, 'Season with fish sauce, salt, and pepper. Finally, stir in the chili leaves and cook for another 2 minutes before serving hot.'),
(63, 12, 1, 'Boil pork belly until tender, then grill until crispy. Once done, chop the pork into small pieces.'),
(64, 12, 2, 'In a pan, heat oil and sauté garlic, onions, and chili peppers. Add chopped pork and liver, and stir-fry.'),
(65, 12, 3, 'Season with soy sauce, calamansi juice, salt, and pepper. Stir well.'),
(66, 12, 4, 'Add mayonnaise and mix until everything is well combined. Cook for another 2 minutes.'),
(67, 12, 5, 'Serve sizzling hot and garnish with chopped onions and chili peppers. Optionally, serve with a side of rice.');

-- --------------------------------------------------------

--
-- Table structure for table `food_images`
--

CREATE TABLE `food_images` (
  `id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_images`
--

INSERT INTO `food_images` (`id`, `food_id`, `image_url`, `caption`) VALUES
(14, 1, '/images/adobong_manok/chicken_2.jpg', NULL),
(15, 1, '/images/adobong_manok/chicken_3.jpg', NULL),
(16, 1, '/images/adobong_manok/chicken_4.jpg', NULL),
(17, 1, '/images/adobong_manok/chicken_5.jpg', NULL),
(18, 1, '/images/adobong_manok/chicken_6.jpg', NULL),
(20, 2, '/images/ginataang_langka/langka_1.jpeg', NULL),
(21, 2, '/images/ginataang_langka/langka_2.jpg', NULL),
(22, 2, '/images/ginataang_langka/langka_3.jpg', NULL),
(23, 2, '/images/ginataang_langka/langka_4.jpg', NULL),
(24, 2, '/images/ginataang_langka/langka_5.jpg', NULL),
(25, 2, '/images/ginataang_langka/langka_6.jpg', NULL),
(26, 3, '/images/ginisang_munggo/munggo_1.jpg', NULL),
(27, 3, '/images/ginisang_munggo/munggo_2.jpg', NULL),
(28, 3, '/images/ginisang_munggo/munggo_3.jpg', NULL),
(29, 3, '/images/ginisang_munggo/munggo_4.jpg', NULL),
(30, 3, '/images/ginisang_munggo/munggo_5.jpg', NULL),
(31, 3, '/images/ginisang_munggo/munggo_6.jpg', NULL),
(32, 4, '/images/isdang_paksiw/paksiw_1.jpg', NULL),
(33, 4, '/images/isdang_paksiw/paksiw_2.png', NULL),
(34, 4, '/images/isdang_paksiw/paksiw_3.jpg', NULL),
(35, 4, '/images/isdang_paksiw/paksiw_4.jpg', NULL),
(36, 4, '/images/isdang_paksiw/paksiw_5.jpg', NULL),
(37, 4, '/images/isdang_paksiw/paksiw_6.jpg', NULL),
(38, 5, '/images/kaldereta/Kaldereta_1.jpg', NULL),
(39, 5, '/images/kaldereta/Kaldereta_2.jpg', NULL),
(40, 5, '/images/kaldereta/Kaldereta_3.jpg', NULL),
(41, 5, '/images/kaldereta/Kaldereta_4.jpg', NULL),
(42, 5, '/images/kaldereta/Kaldereta_5.jpg', NULL),
(43, 5, '/images/kaldereta/Kaldereta_6.jpg', NULL),
(44, 6, '/images/lumpia/lumpia_1.jpg', NULL),
(45, 6, '/images/lumpia/lumpia_2.jpg', NULL),
(46, 6, '/images/lumpia/lumpia_3.jpg', NULL),
(47, 6, '/images/lumpia/lumpia_4.jpg', NULL),
(48, 6, '/images/lumpia/lumpia_5.jpg', NULL),
(49, 6, '/images/lumpia/lumpia_6.jpg', NULL),
(50, 7, '/images/menudo/Menudo_1.png', NULL),
(51, 7, '/images/menudo/Menudo_2.jpg', NULL),
(52, 7, '/images/menudo/Menudo_3.jpg', NULL),
(53, 7, '/images/menudo/Menudo_4.jpg', NULL),
(54, 7, '/images/menudo/Menudo_5.jpg', NULL),
(55, 7, '/images/menudo/Menudo_6.jpg', NULL),
(56, 8, '/images/pancit/pancit_1.jpg', NULL),
(57, 8, '/images/pancit/pancit_2.jpg', NULL),
(58, 8, '/images/pancit/pancit_3.jpg', NULL),
(59, 8, '/images/pancit/pancit_4.jpg', NULL),
(60, 8, '/images/pancit/pancit_5.jpg', NULL),
(61, 8, '/images/pancit/pancit_6.jpg', NULL),
(62, 9, '/images/sinigang_baboy/sinigang_1.jpg', NULL),
(63, 9, '/images/sinigang_baboy/sinigang_2.jpg', NULL),
(64, 9, '/images/sinigang_baboy/sinigang_3.jpg', NULL),
(65, 9, '/images/sinigang_baboy/sinigang_4.jpg', NULL),
(66, 9, '/images/sinigang_baboy/sinigang_5.jpg', NULL),
(67, 9, '/images/sinigang_baboy/sinigang_6.jpg', NULL),
(68, 10, '/images/tortang_talong/talong_1.jpg', NULL),
(69, 10, '/images/tortang_talong/talong_2.jpg', NULL),
(70, 10, '/images/tortang_talong/talong_3.jpg', NULL),
(71, 10, '/images/tortang_talong/talong_4.jpg', NULL),
(72, 10, '/images/tortang_talong/talong_5.jpg', NULL),
(73, 10, '/images/tortang_talong/talong_6.jpg', NULL),
(74, 11, '/images/tinolang_manok/manok_1.jpg', NULL),
(75, 11, '/images/tinolang_manok/manok_2.jpg', NULL),
(76, 11, '/images/tinolang_manok/manok_3.jpeg', NULL),
(77, 11, '/images/tinolang_manok/manok_4.jpg', NULL),
(78, 11, '/images/tinolang_manok/manok_5.jpg', NULL),
(79, 11, '/images/tinolang_manok/manok_6.jpg', NULL),
(80, 12, '/images/pork_sisig/sisig_1.jpg', NULL),
(81, 12, '/images/pork_sisig/sisig_2.jpg', NULL),
(82, 12, '/images/pork_sisig/sisig_3.jpg', NULL),
(83, 12, '/images/pork_sisig/sisig_4.jpg', NULL),
(84, 12, '/images/pork_sisig/sisig_5.jpg', NULL),
(85, 12, '/images/pork_sisig/sisig_6.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `food_information`
--

CREATE TABLE `food_information` (
  `id` int(11) NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `serving_size` varchar(100) DEFAULT NULL,
  `total_cook_time` varchar(100) DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `preparation_tips` text DEFAULT NULL,
  `nutritional_paragraph` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_information`
--

INSERT INTO `food_information` (`id`, `food_name`, `description`, `serving_size`, `total_cook_time`, `difficulty`, `category`, `views`, `likes`, `preparation_tips`, `nutritional_paragraph`, `author`) VALUES
(1, 'Adobong Manok', 'Adobong Manok is a quintessential Filipino dish that showcases the rich culinary heritage of the Philippines. This savory chicken stew is marinated in a flavorful combination of vinegar, soy sauce, garlic, and a blend of spices, creating a perfect balance of tangy and salty flavors. The marinated chicken is then simmered to tender perfection, allowing it to absorb the aromatic seasonings while developing a rich, dark sauce that coats each piece. Often enhanced with onions and bay leaves, this dish is typically served over steamed rice, making it a comforting meal enjoyed by families across the archipelago. Its simplicity and depth of flavor make Adobong Manok a beloved staple in Filipino households, often prepared for gatherings and special occasions, celebrating the warmth and vibrancy of Filipino cuisine.', '4 servings', NULL, NULL, NULL, 1, 2, NULL, NULL, NULL),
(2, 'Ginataang Langka', 'Ginataang Langka is a traditional Filipino dish made with unripe jackfruit simmered in coconut milk with a medley of spices. This comforting and creamy dish is often enhanced with shrimp or meat, offering a rich blend of flavors. The jackfruit absorbs the coconut milk, resulting in a tender texture and a delightful balance of sweetness and savory notes. Commonly enjoyed with rice, Ginataang Langka is not only a favorite among locals but also a representation of the Philippines\' vibrant culinary culture, showcasing the versatility of ingredients available in the region.', '4 servings', NULL, NULL, NULL, 0, 1, NULL, NULL, NULL),
(3, 'Ginisang Munggo', 'Ginisang Munggo is a traditional Filipino dish made with mung beans sautéed with garlic, onions, and tomatoes, often enriched with meat or seafood. This hearty and nutritious dish is typically served with rice and is popular for its simple preparation and wholesome flavors. The mung beans are cooked until tender, absorbing the savory aromas from the sautéed ingredients. Often garnished with leafy greens like spinach or bitter melon, Ginisang Munggo is not only delicious but also a staple in Filipino households, representing comfort food at its finest.', '4 servings', NULL, NULL, NULL, 2, 2, NULL, NULL, NULL),
(4, 'Isdang Paksiw', 'Isdang Paksiw is a traditional Filipino dish that features fish simmered in vinegar, garlic, and various spices. This dish showcases the unique balance of sourness and umami flavors, making it a popular choice in Filipino cuisine. The fish is often cooked with vegetables like eggplant and bitter melon, absorbing the tangy sauce while retaining its tender texture. Served over steamed rice, Isdang Paksiw is not only delicious but also a comforting meal that reflects the simplicity and depth of flavors in Filipino cooking.', '4 servings', NULL, NULL, NULL, 2, 0, NULL, NULL, NULL),
(5, 'Kaldereta', 'Kaldereta is a classic Filipino stew that features tender meat, usually beef or goat, braised in a rich tomato sauce with a blend of spices and vegetables. Traditionally prepared for special occasions, this hearty dish is known for its savory flavor, enhanced by the addition of liver spread, olives, and bell peppers. Kaldereta is often served with rice, making it a favorite among Filipino families and a staple in celebratory feasts, showcasing the depth and richness of Filipino cuisine.', '6 servings', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL),
(6, 'Lumpia', 'Lumpia is a popular Filipino spring roll, characterized by its thin, crispy wrapper filled with a savory mixture of vegetables, meat, and spices. Often served as an appetizer or snack, Lumpia comes in various versions, including fresh and fried. The filling usually consists of ground pork, shrimp, and vegetables such as carrots and cabbage, seasoned to perfection. Lumpia is typically served with a sweet and sour dipping sauce, making it a delightful treat enjoyed by many.', '10 pieces', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL),
(7, 'Menudo', 'Menudo is a traditional Filipino stew made from diced pork, liver, and vegetables simmered in a rich tomato sauce. This hearty dish is often served during special occasions and family gatherings. The combination of meat, potatoes, carrots, and bell peppers creates a flavorful meal that embodies the essence of Filipino comfort food. Menudo is typically served with rice, making it a filling and satisfying dish loved by many.', '6 servings', NULL, NULL, NULL, 0, 2, NULL, NULL, NULL),
(8, 'Pancit', 'Pancit is a beloved Filipino noodle dish that comes in various regional styles. This stir-fried dish is made with rice noodles and a combination of meat, vegetables, and soy sauce, often served during celebrations and special occasions as a symbol of long life and good fortune. The dish is versatile, allowing for various ingredients such as shrimp, chicken, and vegetables, making it a flavorful and colorful meal that represents the vibrant Filipino culture.', '4 servings', NULL, NULL, NULL, 0, 2, NULL, NULL, NULL),
(9, 'Sinigang na Baboy', 'Sinigang na Baboy is a traditional Filipino sour soup made with pork, vegetables, and a variety of souring agents, most commonly tamarind. This comforting dish is known for its savory and tangy flavor profile, offering a delightful contrast to the rich taste of the pork. Often enjoyed with rice, Sinigang is a favorite during rainy days and family gatherings, showcasing the depth of Filipino culinary traditions.', '6 servings', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL),
(10, 'Tortang Talong', 'Tortang Talong is a popular Filipino eggplant dish where grilled eggplants are dipped in an egg mixture and then pan-fried until golden brown. This dish is often served as a main course or side dish, featuring a savory filling that can include ground meat or vegetables. The smoky flavor of the grilled eggplant combined with the rich egg coating makes Tortang Talong a delightful and satisfying meal that represents the simplicity and richness of Filipino cuisine.', '4 servings', NULL, NULL, NULL, 0, 2, NULL, NULL, NULL),
(11, 'Tinolang Manok', 'Tinolang Manok is a traditional Filipino chicken soup that is light yet flavorful, characterized by its clear broth infused with ginger, onion, and garlic. It typically includes chicken pieces and vegetables such as green papaya and chili leaves, creating a comforting and nutritious dish. Often served during special occasions or simply as a home-cooked meal, Tinolang Manok is cherished for its ability to nourish both the body and soul, highlighting the essence of Filipino hospitality.', '4 servings', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL),
(12, 'Sisig Pork', 'Sisig Pork is a famous Filipino dish made from chopped grilled pork, seasoned with a mix of tangy calamansi juice, soy sauce, and spices, then served sizzling on a hot plate. This savory and crispy dish often includes parts of the pig such as the ears and face, giving it a unique texture and flavor. Traditionally served with rice and often garnished with onions and chili peppers, Sisig Pork is beloved for its bold flavors and is a staple in Filipino cuisine.', '4 servings', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `food_likes`
--

CREATE TABLE `food_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `food_id` int(11) DEFAULT NULL,
  `liked_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_likes`
--

INSERT INTO `food_likes` (`id`, `user_id`, `food_id`, `liked_at`) VALUES
(1, 2, 3, '2024-12-17 10:05:29'),
(2, 2, 1, '2024-12-17 10:06:53'),
(3, 2, 8, '2024-12-17 10:09:06'),
(4, 2, 7, '2024-12-17 10:11:25'),
(5, 2, 10, '2024-12-17 10:13:07'),
(6, 2, 2, '2024-12-17 10:15:15');

--
-- Triggers `food_likes`
--
DELIMITER $$
CREATE TRIGGER `decrement_food_likes` AFTER DELETE ON `food_likes` FOR EACH ROW BEGIN
    UPDATE food_information
    SET likes = likes - 1
    WHERE id = OLD.food_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `food_views`
--

CREATE TABLE `food_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `food_id` int(11) DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_views`
--

INSERT INTO `food_views` (`id`, `user_id`, `food_id`, `viewed_at`) VALUES
(1, 2, 3, '2024-12-17 09:49:15'),
(2, 2, 4, '2024-12-17 10:07:43');

--
-- Triggers `food_views`
--
DELIMITER $$
CREATE TRIGGER `increment_food_views` AFTER INSERT ON `food_views` FOR EACH ROW BEGIN
    UPDATE food_information
    SET views = views + 1
    WHERE id = NEW.food_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `nutritional_content`
--

CREATE TABLE `nutritional_content` (
  `id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `nutrient_name` varchar(100) DEFAULT NULL,
  `amount` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nutritional_content`
--

INSERT INTO `nutritional_content` (`id`, `food_id`, `nutrient_name`, `amount`) VALUES
(1, 1, 'Calories', '350 kcal'),
(2, 1, 'Protein', '25g'),
(3, 1, 'Fat', '20g'),
(4, 1, 'Carbohydrates', '10g'),
(5, 1, 'Sodium', '700mg'),
(6, 2, 'Calories', '300 kcal'),
(7, 2, 'Protein', '15g'),
(8, 2, 'Fat', '20g'),
(9, 2, 'Carbohydrates', '25g'),
(10, 2, 'Sodium', '600mg'),
(11, 3, 'Calories', '250 kcal'),
(12, 3, 'Protein', '18g'),
(13, 3, 'Fat', '10g'),
(14, 3, 'Carbohydrates', '30g'),
(15, 3, 'Sodium', '700mg'),
(16, 4, 'Calories', '300 kcal'),
(17, 4, 'Protein', '30g'),
(18, 4, 'Fat', '10g'),
(19, 4, 'Carbohydrates', '12g'),
(20, 4, 'Sodium', '800mg'),
(21, 5, 'Calories', '500 kcal'),
(22, 5, 'Protein', '40g'),
(23, 5, 'Fat', '30g'),
(24, 5, 'Carbohydrates', '20g'),
(25, 5, 'Sodium', '800mg'),
(26, 6, 'Calories', '250 kcal per serving (2 pieces)'),
(27, 6, 'Protein', '15g'),
(28, 6, 'Fat', '15g'),
(29, 6, 'Carbohydrates', '20g'),
(30, 6, 'Sodium', '600mg'),
(31, 7, 'Calories', '450 kcal'),
(32, 7, 'Protein', '30g'),
(33, 7, 'Fat', '25g'),
(34, 7, 'Carbohydrates', '35g'),
(35, 7, 'Sodium', '800mg'),
(36, 8, 'Calories', '350 kcal'),
(37, 8, 'Protein', '25g'),
(38, 8, 'Fat', '10g'),
(39, 8, 'Carbohydrates', '50g'),
(40, 8, 'Sodium', '800mg'),
(41, 9, 'Calories', '400 kcal'),
(42, 9, 'Protein', '30g'),
(43, 9, 'Fat', '20g'),
(44, 9, 'Carbohydrates', '15g'),
(45, 9, 'Sodium', '700mg'),
(46, 10, 'Calories', '250 kcal'),
(47, 10, 'Protein', '12g'),
(48, 10, 'Fat', '20g'),
(49, 10, 'Carbohydrates', '10g'),
(50, 10, 'Sodium', '300mg'),
(51, 11, 'Calories', '350 kcal'),
(52, 11, 'Protein', '28g'),
(53, 11, 'Fat', '15g'),
(54, 11, 'Carbohydrates', '10g'),
(55, 11, 'Sodium', '700mg'),
(56, 12, 'Calories', '450 kcal'),
(57, 12, 'Protein', '25g'),
(58, 12, 'Fat', '35g'),
(59, 12, 'Carbohydrates', '5g'),
(60, 12, 'Sodium', '900mg');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `quantity` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`id`, `food_id`, `ingredient_name`, `quantity`) VALUES
(1, 1, 'Chicken', '1 kg, cut into pieces'),
(2, 1, 'Vinegar', '1 cup'),
(3, 1, 'Soy sauce', '1/2 cup'),
(4, 1, 'Garlic', '6 cloves, minced'),
(5, 1, 'Onion', '1 medium, sliced'),
(6, 1, 'Bay leaves', '2 pieces'),
(7, 1, 'Black pepper', '1 teaspoon'),
(8, 1, 'Sugar', '1 tablespoon'),
(9, 1, 'Cooking oil', '2 tablespoons'),
(10, 1, 'Salt', 'to taste'),
(11, 2, 'Unripe jackfruit', '500 grams, sliced'),
(12, 2, 'Coconut milk', '2 cups'),
(13, 2, 'Shrimp', '200 grams, peeled and deveined (optional)'),
(14, 2, 'Onion', '1 medium, sliced'),
(15, 2, 'Garlic', '4 cloves, minced'),
(16, 2, 'Ginger', '1-inch piece, minced'),
(17, 2, 'Green chili peppers', '2 pieces, sliced'),
(18, 2, 'Fish sauce', '2 tablespoons'),
(19, 2, 'Salt', 'to taste'),
(20, 2, 'Cooking oil', '1 tablespoon'),
(21, 3, 'Mung beans', '1 cup'),
(22, 3, 'Water', '4 cups'),
(23, 3, 'Pork (or shrimp)', '200 grams, diced (optional)'),
(24, 3, 'Onion', '1 medium, chopped'),
(25, 3, 'Garlic', '4 cloves, minced'),
(26, 3, 'Tomato', '1 medium, chopped'),
(27, 3, 'Spinach', '2 cups, washed (or other leafy greens)'),
(28, 3, 'Fish sauce', '2 tablespoons'),
(29, 3, 'Salt', 'to taste'),
(30, 3, 'Pepper', 'to taste'),
(31, 3, 'Cooking oil', '1 tablespoon'),
(32, 4, 'Fish (such as bangus or tilapia)', '1 kg, cleaned and gutted'),
(33, 4, 'Vinegar', '1 cup'),
(34, 4, 'Garlic', '6 cloves, minced'),
(35, 4, 'Onion', '1 medium, sliced'),
(36, 4, 'Ginger', '1-inch piece, sliced'),
(37, 4, 'Eggplant', '1 medium, sliced'),
(38, 4, 'Bitter melon', '1 piece, sliced (optional)'),
(39, 4, 'Fish sauce', '2 tablespoons'),
(40, 4, 'Pepper', '1 teaspoon'),
(41, 4, 'Salt', 'to taste'),
(42, 4, 'Water', '1 cup'),
(43, 5, 'Beef (or goat)', '1 kg, cut into cubes'),
(44, 5, 'Tomato sauce', '2 cups'),
(45, 5, 'Liver spread', '1/2 cup'),
(46, 5, 'Potatoes', '2 medium, diced'),
(47, 5, 'Carrots', '2 medium, sliced'),
(48, 5, 'Bell peppers', '1 red and 1 green, sliced'),
(49, 5, 'Onion', '1 medium, chopped'),
(50, 5, 'Garlic', '4 cloves, minced'),
(51, 5, 'Bay leaves', '2 pieces'),
(52, 5, 'Olives', '1/4 cup, pitted (optional)'),
(53, 5, 'Cooking oil', '2 tablespoons'),
(54, 5, 'Salt', 'to taste'),
(55, 5, 'Pepper', 'to taste'),
(56, 5, 'Water', '2 cups'),
(57, 6, 'Lumpia wrappers', '20 pieces'),
(58, 6, 'Ground pork', '500 grams'),
(59, 6, 'Shrimp', '200 grams, chopped'),
(60, 6, 'Carrot', '1 medium, grated'),
(61, 6, 'Cabbage', '1 cup, finely chopped'),
(62, 6, 'Onion', '1 medium, chopped'),
(63, 6, 'Garlic', '3 cloves, minced'),
(64, 6, 'Egg', '1, beaten (for sealing)'),
(65, 6, 'Salt', 'to taste'),
(66, 6, 'Pepper', 'to taste'),
(67, 6, 'Cooking oil', 'for frying'),
(68, 7, 'Pork (shoulder or belly)', '500 grams, diced'),
(69, 7, 'Pork liver', '250 grams, diced'),
(70, 7, 'Tomato sauce', '1 cup'),
(71, 7, 'Potatoes', '2 medium, diced'),
(72, 7, 'Carrots', '2 medium, diced'),
(73, 7, 'Bell pepper', '1 red, diced'),
(74, 7, 'Onion', '1 medium, chopped'),
(75, 7, 'Garlic', '4 cloves, minced'),
(76, 7, 'Bay leaves', '2 pieces'),
(77, 7, 'Cooking oil', '2 tablespoons'),
(78, 7, 'Salt', 'to taste'),
(79, 7, 'Pepper', 'to taste'),
(80, 7, 'Water', '2 cups'),
(81, 8, 'Rice noodles', '250 grams'),
(82, 8, 'Shrimp', '200 grams, peeled and deveined'),
(83, 8, 'Chicken', '150 grams, sliced'),
(84, 8, 'Carrots', '1 medium, julienned'),
(85, 8, 'Cabbage', '2 cups, shredded'),
(86, 8, 'Onion', '1 medium, chopped'),
(87, 8, 'Garlic', '3 cloves, minced'),
(88, 8, 'Soy sauce', '4 tablespoons'),
(89, 8, 'Cooking oil', '2 tablespoons'),
(90, 8, 'Pepper', 'to taste'),
(91, 8, 'Green onions', 'for garnish'),
(92, 9, 'Pork (belly or ribs)', '1 kg, cut into pieces'),
(93, 9, 'Tamarind paste', '1/2 cup (or fresh tamarind if available)'),
(94, 9, 'Water', '8 cups'),
(95, 9, 'Radish (labanos)', '1 medium, sliced'),
(96, 9, 'Eggplant', '1 medium, sliced'),
(97, 9, 'String beans (sitaw)', '200 grams, cut into 2-inch pieces'),
(98, 9, 'Tomatoes', '2 medium, quartered'),
(99, 9, 'Onion', '1 medium, quartered'),
(100, 9, 'Green chili peppers', '2 pieces'),
(101, 9, 'Fish sauce', '2 tablespoons'),
(102, 9, 'Salt', 'to taste'),
(103, 9, 'Water spinach (kangkong)', '1 bunch, washed and trimmed (optional)'),
(104, 10, 'Eggplants', '4 medium-sized, grilled and peeled'),
(105, 10, 'Eggs', '4, beaten'),
(106, 10, 'Ground pork', '200 grams (optional)'),
(107, 10, 'Onion', '1 medium, chopped'),
(108, 10, 'Garlic', '3 cloves, minced'),
(109, 10, 'Salt', 'to taste'),
(110, 10, 'Pepper', 'to taste'),
(111, 10, 'Cooking oil', 'for frying'),
(112, 11, 'Chicken', '1 kg, cut into pieces'),
(113, 11, 'Water', '6 cups'),
(114, 11, 'Ginger', '2 inches, sliced'),
(115, 11, 'Garlic', '4 cloves, minced'),
(116, 11, 'Onion', '1 medium, chopped'),
(117, 11, 'Green papaya', '1 small, peeled and sliced'),
(118, 11, 'Chili leaves (or spinach)', '1 cup'),
(119, 11, 'Fish sauce', '2 tablespoons'),
(120, 11, 'Salt', 'to taste'),
(121, 11, 'Pepper', 'to taste'),
(122, 11, 'Cooking oil', '1 tablespoon'),
(123, 12, 'Pork belly', '500 grams, grilled and chopped'),
(124, 12, 'Pork liver', '100 grams, finely chopped'),
(125, 12, 'Onion', '1 medium, finely chopped'),
(126, 12, 'Garlic', '3 cloves, minced'),
(127, 12, 'Chili peppers', '2 pieces, chopped'),
(128, 12, 'Calamansi juice', '3 tablespoons'),
(129, 12, 'Soy sauce', '2 tablespoons'),
(130, 12, 'Mayonnaise', '2 tablespoons'),
(131, 12, 'Salt', 'to taste'),
(132, 12, 'Pepper', 'to taste'),
(133, 12, 'Cooking oil', 'for frying');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_image` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `favorite_recipe` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `dietary_preference` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `created_at`, `profile_image`, `bio`, `favorite_recipe`, `address`, `dietary_preference`, `role`) VALUES
(1, 'dev@gmail.com', '$2a$10$b2rF.RtX/4fH5TXYc8JNS.HRy6GQ81//qVVEHAgUvRM95qPH47TUG', 'Rocky', '2024-10-11 00:31:00', '/profile_images/1731832610094-1000005641.jpg', 'none', 'none', 'Carmen', 'none', 'Student'),
(2, 'bossrock@gmail.com', '$2a$10$gClDdaOeyHGMMaeC9xzyru1Fa3DX/Vs7OdHEi9RiX29BsNFs5wlNm', 'Rocky', '2024-12-16 04:29:55', '/profile_images/1734399724130-player.png', 'hello', 'adobo', 'Carmen', 'hello', 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `user_cooking_instructions`
--

CREATE TABLE `user_cooking_instructions` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `instruction` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_nutritional_content`
--

CREATE TABLE `user_nutritional_content` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `nutrient_name` varchar(100) NOT NULL,
  `amount` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_recipes`
--

CREATE TABLE `user_recipes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `servings` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_recipe_images`
--

CREATE TABLE `user_recipe_images` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_recipe_ingredients`
--

CREATE TABLE `user_recipe_ingredients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `quantity` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_foods`
--

CREATE TABLE `user_saved_foods` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `food_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_saved_foods`
--

INSERT INTO `user_saved_foods` (`id`, `user_id`, `food_id`, `created_at`) VALUES
(3, 1, 1, '2024-12-02 02:22:58'),
(4, 1, 3, '2024-12-09 12:36:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cooking_instructions`
--
ALTER TABLE `cooking_instructions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `food_images`
--
ALTER TABLE `food_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `food_information`
--
ALTER TABLE `food_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_likes` (`likes`),
  ADD KEY `idx_views` (`views`);

--
-- Indexes for table `food_likes`
--
ALTER TABLE `food_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `food_views`
--
ALTER TABLE `food_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `nutritional_content`
--
ALTER TABLE `nutritional_content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_cooking_instructions`
--
ALTER TABLE `user_cooking_instructions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `user_nutritional_content`
--
ALTER TABLE `user_nutritional_content`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `user_recipes`
--
ALTER TABLE `user_recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_recipe_images`
--
ALTER TABLE `user_recipe_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `user_recipe_ingredients`
--
ALTER TABLE `user_recipe_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `user_saved_foods`
--
ALTER TABLE `user_saved_foods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `food_id` (`food_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cooking_instructions`
--
ALTER TABLE `cooking_instructions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `food_images`
--
ALTER TABLE `food_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `food_information`
--
ALTER TABLE `food_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `food_likes`
--
ALTER TABLE `food_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `food_views`
--
ALTER TABLE `food_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `nutritional_content`
--
ALTER TABLE `nutritional_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_cooking_instructions`
--
ALTER TABLE `user_cooking_instructions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_nutritional_content`
--
ALTER TABLE `user_nutritional_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_recipes`
--
ALTER TABLE `user_recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_recipe_images`
--
ALTER TABLE `user_recipe_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_recipe_ingredients`
--
ALTER TABLE `user_recipe_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_saved_foods`
--
ALTER TABLE `user_saved_foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cooking_instructions`
--
ALTER TABLE `cooking_instructions`
  ADD CONSTRAINT `cooking_instructions_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `food_images`
--
ALTER TABLE `food_images`
  ADD CONSTRAINT `food_images_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `food_likes`
--
ALTER TABLE `food_likes`
  ADD CONSTRAINT `food_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `food_likes_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `food_views`
--
ALTER TABLE `food_views`
  ADD CONSTRAINT `food_views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `food_views_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `nutritional_content`
--
ALTER TABLE `nutritional_content`
  ADD CONSTRAINT `nutritional_content_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_cooking_instructions`
--
ALTER TABLE `user_cooking_instructions`
  ADD CONSTRAINT `user_cooking_instructions_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `user_recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_nutritional_content`
--
ALTER TABLE `user_nutritional_content`
  ADD CONSTRAINT `user_nutritional_content_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `user_recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_recipes`
--
ALTER TABLE `user_recipes`
  ADD CONSTRAINT `user_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_recipe_images`
--
ALTER TABLE `user_recipe_images`
  ADD CONSTRAINT `user_recipe_images_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `user_recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_recipe_ingredients`
--
ALTER TABLE `user_recipe_ingredients`
  ADD CONSTRAINT `user_recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `user_recipes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_saved_foods`
--
ALTER TABLE `user_saved_foods`
  ADD CONSTRAINT `user_saved_foods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_saved_foods_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food_information` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
