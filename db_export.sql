-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.1.38-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für hplcsimulator
CREATE DATABASE IF NOT EXISTS `hplcsimulator` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hplcsimulator`;

-- Exportiere Struktur von Tabelle hplcsimulator.columns
CREATE TABLE IF NOT EXISTS `columns` (
  `pk_column` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `length` int(10) unsigned DEFAULT NULL,
  `inner_diameter` float unsigned DEFAULT NULL,
  `particle_size` float unsigned DEFAULT NULL,
  PRIMARY KEY (`pk_column`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle hplcsimulator.columns: ~2 rows (ungefähr)
/*!40000 ALTER TABLE `columns` DISABLE KEYS */;
INSERT IGNORE INTO `columns` (`pk_column`, `name`, `length`, `inner_diameter`, `particle_size`) VALUES
	(0, 'Agilent Zorbax SB-C18', NULL, NULL, NULL),
	(1, 'Waters Acquity BEH C18', NULL, NULL, NULL);
/*!40000 ALTER TABLE `columns` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle hplcsimulator.compounds
CREATE TABLE IF NOT EXISTS `compounds` (
  `pk_compound` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `molar_volume` float unsigned DEFAULT NULL,
  `molar_mass` float unsigned DEFAULT NULL,
  `density` float unsigned DEFAULT NULL,
  PRIMARY KEY (`pk_compound`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle hplcsimulator.compounds: ~43 rows (ungefähr)
/*!40000 ALTER TABLE `compounds` DISABLE KEYS */;
INSERT IGNORE INTO `compounds` (`pk_compound`, `name`, `molar_volume`, `molar_mass`, `density`) VALUES
	(0, 'n-Benzyl Formamid', 156.1, NULL, NULL),
	(1, 'Benzylalkohol', 125.6, NULL, NULL),
	(2, 'Phenol', 103.4, NULL, NULL),
	(3, '3-Phenylpropanol', 170, NULL, NULL),
	(4, 'Acetophenon', 140.4, NULL, NULL),
	(5, 'Benzonitril', 122.7, NULL, NULL),
	(6, 'p-Chlorophenol', 124.3, NULL, NULL),
	(7, 'Nitrobenzol', 122.7, NULL, NULL),
	(8, 'Methylbenzoat', 151.2, NULL, NULL),
	(9, 'Anisole', 128.1, NULL, NULL),
	(10, 'Benzol', 96, NULL, NULL),
	(11, 'p-Nitrotoluen', 144.9, NULL, NULL),
	(12, 'p-Nitrobenzylchlorid', 165.8, NULL, NULL),
	(13, 'Toluen', 118.2, NULL, NULL),
	(14, 'Benophenon', 206.8, NULL, NULL),
	(15, 'Bromobenzol', 119.3, NULL, NULL),
	(16, 'Naphtalen', 147.6, NULL, NULL),
	(17, 'Ethylbenzol', 140.4, NULL, NULL),
	(18, 'p-Xylene', 140.4, NULL, NULL),
	(19, 'p-Dichlorobenzol', 137.8, NULL, NULL),
	(20, 'Propylbenzol', 162.6, NULL, NULL),
	(21, 'n-Butylbenzol', 184.8, NULL, NULL),
	(22, '2-Acetylfuran', NULL, NULL, NULL),
	(23, 'Acetanalid', NULL, NULL, NULL),
	(24, 'Acetophenol', NULL, NULL, NULL),
	(25, 'Benzophenol', NULL, NULL, NULL),
	(26, 'Butylparaben', NULL, NULL, NULL),
	(27, 'Propiophenol', NULL, NULL, NULL),
	(28, 'Valerophenol', NULL, NULL, NULL),
	(29, 'Acenaphten', NULL, NULL, NULL),
	(30, 'Heptanophenol', NULL, NULL, NULL),
	(31, 'Naphtalen', NULL, NULL, NULL),
	(32, 'Oktanophenol', NULL, NULL, NULL),
	(33, 'Koffein', NULL, NULL, NULL),
	(34, 'Ethylparaben', NULL, NULL, NULL),
	(35, 'Methylparaben', NULL, NULL, NULL),
	(36, 'Propylparaben', NULL, NULL, NULL),
	(37, 'Ibuprofen', NULL, NULL, NULL),
	(38, 'Fenoprofen', NULL, NULL, NULL),
	(39, 'Ketoprofen', NULL, NULL, NULL),
	(40, '3-Nitrophenol', NULL, NULL, NULL),
	(41, '4-Nitrophenol', NULL, NULL, NULL),
	(42, 'Anthracen', NULL, NULL, NULL);
/*!40000 ALTER TABLE `compounds` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle hplcsimulator.globals
CREATE TABLE IF NOT EXISTS `globals` (
  `fk_compound` int(10) unsigned NOT NULL,
  `fk_column` int(10) NOT NULL,
  `fk_solvent` int(10) NOT NULL,
  `kw_slope` double DEFAULT NULL,
  `kw_intercept` double DEFAULT NULL,
  `s_slope` double DEFAULT NULL,
  `s_intercept` double DEFAULT NULL,
  PRIMARY KEY (`fk_compound`,`fk_column`,`fk_solvent`),
  KEY `fk_column` (`fk_column`),
  KEY `fk_solvent` (`fk_solvent`),
  KEY `fk_compound` (`fk_compound`),
  CONSTRAINT `FK_globals_columns` FOREIGN KEY (`fk_column`) REFERENCES `columns` (`pk_column`) ON UPDATE CASCADE,
  CONSTRAINT `FK_globals_compounds` FOREIGN KEY (`fk_compound`) REFERENCES `compounds` (`pk_compound`) ON UPDATE CASCADE,
  CONSTRAINT `FK_globals_solvents` FOREIGN KEY (`fk_solvent`) REFERENCES `solvents` (`pk_solvent`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle hplcsimulator.globals: ~86 rows (ungefähr)
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT IGNORE INTO `globals` (`fk_compound`, `fk_column`, `fk_solvent`, `kw_slope`, `kw_intercept`, `s_slope`, `s_intercept`) VALUES
	(0, 0, 0, -0.003731062, 9.769127502, 0.001962312, -1.950157208),
	(0, 0, 1, -0.00893, 1.54084, 0.007655, -2.693812),
	(1, 0, 0, -0.00364158, 0.870975072, 0.001538701, -1.801193074),
	(1, 0, 1, -0.008879, 1.643379, 0.00751, -2.603915),
	(2, 0, 0, -0.007051397, 1.222652803, 0.004948239, -2.157819856),
	(2, 0, 1, -0.010465, 1.714002, 0.00904, -2.66885),
	(3, 0, 0, -0.005175387, 1.617423196, 0.004245094, -2.711627278),
	(3, 0, 1, -0.012422, 2.682599, 0.010667, -3.544294),
	(4, 0, 0, -0.006113393, 1.615282733, 0.004190421, -2.419171414),
	(4, 0, 1, -0.009257, 2.098172, 0.008684, -2.981032),
	(5, 0, 0, -0.008118482, 1.759520682, 0.006344149, -2.581132813),
	(5, 0, 1, -0.009409, 1.995681, 0.009057, -2.971312),
	(6, 0, 0, -0.009910541, 2.006666967, 0.009176534, -3.110178571),
	(6, 0, 1, -0.015142, 2.752714, 0.013319, -3.575982),
	(7, 0, 0, -0.009433757, 2.074051745, 0.008291834, -2.909075892),
	(7, 0, 1, -0.010864, 2.277843, 0.009471, -2.982885),
	(8, 0, 0, -0.0077323, 2.116364506, 0.006053077, -2.911497882),
	(8, 0, 1, -0.011888, 2.754816, 0.010739, -3.478031),
	(9, 0, 0, -0.008804318, 2.2070705, 0.007554149, -2.941605639),
	(9, 0, 1, -0.011362, 2.587045, 0.009682, -3.103432),
	(10, 0, 0, -0.008529343, 2.208069224, 0.007114051, -2.82653686),
	(10, 0, 1, -0.010915, 2.5743, 0.009507, -3.003558),
	(11, 0, 0, -0.010705359, 2.565390235, 0.009864271, -3.433694873),
	(11, 0, 1, -0.012887, 2.900254, 0.011005, -3.522154),
	(12, 0, 0, -0.012956701, 2.804538425, 0.012986999, -3.866695802),
	(12, 0, 1, -0.014804, 3.063453, 0.013295, -3.802081),
	(13, 0, 0, -0.010041886, 2.738254098, 0.009005662, -3.393491059),
	(13, 0, 1, -0.0131, 3.230992, 0.010959, -3.547073),
	(14, 0, 0, -0.011069419, 3.087847385, 0.010362441, -4.064139779),
	(14, 0, 1, -0.01561, 3.814708, 0.01448, -4.572059),
	(15, 0, 0, 0.011273051, 2.941762836, 0.010618543, -3.651869929),
	(15, 0, 1, -0.015204, 3.539528, 0.013731, -3.937992),
	(16, 0, 0, -0.012795634, 3.296888486, 0.012596045, -4.112896459),
	(16, 0, 1, -0.017658, 3.996277, 0.015853, -4.364601),
	(17, 0, 0, -0.011878845, 3.278713293, 0.01150122, -4.00434081),
	(17, 0, 1, -0.016026, 3.915079, 0.014007, -4.212582),
	(18, 0, 0, -0.011333502, 3.257874421, 0.01022372, -3.911260542),
	(18, 0, 1, -0.015301, 3.89882, 0.012295, -4.091578),
	(19, 0, 0, -0.01247399, 3.351026587, 0.011894773, -4.06721018),
	(19, 0, 1, -0.016725, 4.042718, 0.014898, -4.384667),
	(20, 0, 0, -0.012995521, 3.811104371, 0.012122284, -4.521888293),
	(20, 0, 1, -0.017711, 4.572339, 0.014763, -4.776607),
	(21, 0, 0, -0.013247488, 4.268938682, 0.011228978, -4.916062651),
	(21, 0, 1, -0.019604, 5.195287, 0.015945, -5.293528),
	(22, 1, 0, -0.0089, 0.9454, 0.035, -43238),
	(22, 1, 1, -0.0098, 1.203, 0.023, -3.9235),
	(23, 1, 0, -0.0099, 1.4684, 0.0231, -4.9823),
	(23, 1, 1, -0.0103, 1.612, 0.0071, -3.4149),
	(24, 1, 0, -0.0064, 1.7951, 0.0041, -3.9377),
	(24, 1, 1, -0.0076, 2.0081, 0.0016, -3.308),
	(25, 1, 0, -0.0072, 2.8635, 0.0014, -4.2699),
	(25, 1, 1, -0.0105, 3.33, 0.0034, -4.0948),
	(26, 1, 0, -0.0076, 2.9465, 0.0019, -4.9452),
	(26, 1, 1, -0.0125, 3.5521, 0.0042, -4.3503),
	(27, 1, 0, -0.0062, 2.2074, 0.0016, -3.8887),
	(27, 1, 1, -0.0078, 2.4704, 0.0015, -3.4803),
	(28, 1, 0, -0.0062, 2.8926, -0.0002, -4.0204),
	(28, 1, 1, -0.093, 3.3558, 0.0028, -3.9432),
	(29, 1, 0, -0.0071, 3.1216, -0.0005, -3.7824),
	(29, 1, 1, -0.0126, 3.7099, 0.0057, -3.7767),
	(30, 1, 0, -0.0048, 3.2976, -0.004, -3.7924),
	(30, 1, 1, -0.011, 4.1193, 0.0045, -4.3285),
	(31, 1, 0, -0.0086, 2.8903, 0.0035, -3.989),
	(31, 1, 1, -0.012, 3.2195, 0.0062, -3.6074),
	(32, 1, 0, -0.0037, 3.4099, -0.0063, -3.5985),
	(32, 1, 1, -0.0134, 4.5487, 0.0079, -4.6655),
	(33, 1, 0, -0.015, 1.5608, 0.0699, -9.056),
	(33, 1, 1, -0.0217, 2.0909, 0.04, -6.2387),
	(34, 1, 0, -0.0087, 2.3142, 0.0063, -5.1451),
	(34, 1, 1, 0.0114, 2.6404, 0.0026, -3.892),
	(35, 1, 0, -0.0099, 1.9392, 0.0108, -5.1711),
	(35, 1, 1, -0.0116, 2.1428, 0.0023, -3.5564),
	(36, 1, 0, -0.0079, 2.955, 0.0027, -5.0254),
	(36, 1, 1, -0.0117, 3.12, 0.0022, -4.1243),
	(37, 1, 0, -0.0067, 3.1256, 0.0012, -4.57),
	(37, 1, 1, -0.013, 3.7862, 0.0065, -4.182),
	(38, 1, 0, -0.009, 3.0331, 0.005, -4.8881),
	(38, 1, 1, -0.0149, 3.5478, 0.0085, -4.2122),
	(39, 1, 0, -0.0081, 2.6443, 0.0042, -4.9117),
	(39, 1, 1, -0.0138, 3.1036, 0.0086, -4.2208),
	(40, 1, 0, -0.0113, 1.8435, 0.0107, -4.1159),
	(40, 1, 1, 0.0113, 1.7951, 0.0025, -2.716),
	(41, 1, 0, -0.0125, 1.8175, 0.0149, -4.2298),
	(41, 1, 1, -0.0124, 1.7297, 0.0042, -2.6717),
	(42, 1, 0, -0.006, 3.2735, -0.0038, -3.7446),
	(42, 1, 1, -0.0149, 4.1452, 0.0083, -4.1956);
/*!40000 ALTER TABLE `globals` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle hplcsimulator.solvents
CREATE TABLE IF NOT EXISTS `solvents` (
  `pk_solvent` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `solvent_association` float DEFAULT NULL,
  PRIMARY KEY (`pk_solvent`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle hplcsimulator.solvents: ~2 rows (ungefähr)
/*!40000 ALTER TABLE `solvents` DISABLE KEYS */;
INSERT IGNORE INTO `solvents` (`pk_solvent`, `name`, `solvent_association`) VALUES
	(0, 'Acetonitril', 1.9),
	(1, 'Methanol', 1.9);
/*!40000 ALTER TABLE `solvents` ENABLE KEYS */;


-- Exportiere Datenbank Struktur für mysql
CREATE DATABASE IF NOT EXISTS `mysql` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mysql`;

-- Exportiere Struktur von Tabelle mysql.user
CREATE TABLE IF NOT EXISTS `user` (
  `Host` char(60) COLLATE utf8_bin NOT NULL DEFAULT '',
  `User` char(80) COLLATE utf8_bin NOT NULL DEFAULT '',
  `Password` char(41) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL DEFAULT '',
  `Select_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Insert_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Update_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Delete_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Drop_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Reload_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Shutdown_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Process_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `File_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Grant_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `References_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Index_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Alter_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Show_db_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Super_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_tmp_table_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Lock_tables_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Execute_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Repl_slave_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Repl_client_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_view_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Show_view_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_routine_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Alter_routine_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_user_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Event_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Trigger_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `Create_tablespace_priv` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `ssl_type` enum('','ANY','X509','SPECIFIED') CHARACTER SET utf8 NOT NULL DEFAULT '',
  `ssl_cipher` blob NOT NULL,
  `x509_issuer` blob NOT NULL,
  `x509_subject` blob NOT NULL,
  `max_questions` int(11) unsigned NOT NULL DEFAULT '0',
  `max_updates` int(11) unsigned NOT NULL DEFAULT '0',
  `max_connections` int(11) unsigned NOT NULL DEFAULT '0',
  `max_user_connections` int(11) NOT NULL DEFAULT '0',
  `plugin` char(64) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `authentication_string` text COLLATE utf8_bin NOT NULL,
  `password_expired` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `is_role` enum('N','Y') CHARACTER SET utf8 NOT NULL DEFAULT 'N',
  `default_role` char(80) COLLATE utf8_bin NOT NULL DEFAULT '',
  `max_statement_time` decimal(12,6) NOT NULL DEFAULT '0.000000',
  PRIMARY KEY (`Host`,`User`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and global privileges';

-- Exportiere Daten aus Tabelle mysql.user: 8 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`Host`, `User`, `Password`, `Select_priv`, `Insert_priv`, `Update_priv`, `Delete_priv`, `Create_priv`, `Drop_priv`, `Reload_priv`, `Shutdown_priv`, `Process_priv`, `File_priv`, `Grant_priv`, `References_priv`, `Index_priv`, `Alter_priv`, `Show_db_priv`, `Super_priv`, `Create_tmp_table_priv`, `Lock_tables_priv`, `Execute_priv`, `Repl_slave_priv`, `Repl_client_priv`, `Create_view_priv`, `Show_view_priv`, `Create_routine_priv`, `Alter_routine_priv`, `Create_user_priv`, `Event_priv`, `Trigger_priv`, `Create_tablespace_priv`, `ssl_type`, `ssl_cipher`, `x509_issuer`, `x509_subject`, `max_questions`, `max_updates`, `max_connections`, `max_user_connections`, `plugin`, `authentication_string`, `password_expired`, `is_role`, `default_role`, `max_statement_time`) VALUES
	('localhost', 'root', '', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('127.0.0.1', 'root', '', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('::1', 'root', '', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('localhost', '', '', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('localhost', 'pma', '', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('0.0.0.0:3306', 'simulator', '*C8CE235484FCB8666786EFEE0E75CE66BC698467', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('localhost', 'simulator', '*C8CE235484FCB8666786EFEE0E75CE66BC698467', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000),
	('%', 'simulator', '*C8CE235484FCB8666786EFEE0E75CE66BC698467', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '', _binary '', _binary '', _binary '', 0, 0, 0, 0, '', '', 'N', 'N', '', 0.000000);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
