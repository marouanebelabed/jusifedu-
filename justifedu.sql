-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 03 juin 2025 à 09:56
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `justifedu`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `enseignant_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `code`, `nom`, `description`, `enseignant_id`) VALUES
(1, 'INF201', 'Algorithmique et Structures de Données', 'Fondements des algorithmes et structures de données', 4),
(2, 'INF202', 'Base de Données', 'Introduction aux systèmes de gestion de bases de données', 4),
(3, 'MAT101', 'Mathématiques Discrètes', 'Logique, ensembles, relations et fonctions', 5);

-- --------------------------------------------------------

--
-- Structure de la table `justifications`
--

CREATE TABLE `justifications` (
  `id` int(11) NOT NULL,
  `etudiant_id` int(11) NOT NULL,
  `cours_id` int(11) NOT NULL,
  `date_absence` date NOT NULL,
  `heure_cours` varchar(50) NOT NULL,
  `motif` varchar(100) NOT NULL,
  `details` text DEFAULT NULL,
  `piece_jointe` varchar(255) DEFAULT NULL,
  `statut` enum('en_attente','acceptee','refusee') DEFAULT 'en_attente',
  `date_soumission` datetime DEFAULT current_timestamp(),
  `traite_par` int(11) DEFAULT NULL,
  `date_traitement` datetime DEFAULT NULL,
  `commentaire_traitement` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `justifications`
--

INSERT INTO `justifications` (`id`, `etudiant_id`, `cours_id`, `date_absence`, `heure_cours`, `motif`, `details`, `piece_jointe`, `statut`, `date_soumission`, `traite_par`, `date_traitement`, `commentaire_traitement`) VALUES
(1, 1, 1, '2025-03-15', '8h30-10h30', 'Maladie', 'Fièvre et maux de gorge', NULL, 'acceptee', '2025-06-01 00:12:01', 4, '2025-03-16 10:00:00', NULL),
(2, 2, 1, '2025-03-15', '8h30-10h30', 'Maladie', 'Certificat médical joint', NULL, 'en_attente', '2025-06-01 00:12:01', NULL, NULL, NULL),
(3, 3, 2, '2025-03-16', '14h00-16h00', 'Problème de transport', 'Panne de bus', NULL, 'refusee', '2025-06-01 00:12:01', 4, '2025-03-17 09:30:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `role` enum('etudiant','enseignant','admin') NOT NULL,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `matricule` varchar(20) DEFAULT NULL,
  `niveau` varchar(50) DEFAULT NULL,
  `departement` varchar(50) DEFAULT NULL,
  `modules` text DEFAULT NULL,
  `date_creation` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `role`, `nom`, `email`, `mot_de_passe`, `matricule`, `niveau`, `departement`, `modules`, `date_creation`) VALUES
(1, 'etudiant', 'Mohamed Ali', 'mohamed.ali@edu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '20250001', 'L2 Informatique', NULL, NULL, '2025-06-01 00:11:58'),
(2, 'etudiant', 'Samira Ben Ahmed', 'samira.ahmed@edu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '20250012', 'L2 Informatique', NULL, NULL, '2025-06-01 00:11:58'),
(3, 'etudiant', 'Karim Jlassi', 'karim.jlassi@edu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '20250008', 'L2 Informatique', NULL, NULL, '2025-06-01 00:11:58'),
(4, 'enseignant', 'Prof. Ahmed Ben Salah', 'ahmed.salah@edu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, 'Informatique', 'Algorithmique, Base de Données', '2025-06-01 00:12:01'),
(5, 'enseignant', 'Prof. Leila Trabelsi', 'leila.trabelsi@edu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, 'Mathématiques', 'Algèbre, Analyse', '2025-06-01 00:12:01'),
(6, 'admin', 'Admin JustifEdu', 'admin@justifedu.tn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, NULL, NULL, '2025-06-01 00:12:01');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `enseignant_id` (`enseignant_id`);

--
-- Index pour la table `justifications`
--
ALTER TABLE `justifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etudiant_id` (`etudiant_id`),
  ADD KEY `cours_id` (`cours_id`),
  ADD KEY `traite_par` (`traite_par`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `justifications`
--
ALTER TABLE `justifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`enseignant_id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `justifications`
--
ALTER TABLE `justifications`
  ADD CONSTRAINT `justifications_ibfk_1` FOREIGN KEY (`etudiant_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `justifications_ibfk_2` FOREIGN KEY (`cours_id`) REFERENCES `cours` (`id`),
  ADD CONSTRAINT `justifications_ibfk_3` FOREIGN KEY (`traite_par`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
