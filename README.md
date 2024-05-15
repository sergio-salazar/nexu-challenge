# nexu-challenge
Backend application for the Nexu Challenge. This application was developed with NodeJS and Express.

## Installation
You must have installed NodeJS. Download and install NodeJS. [https://nodejs.org/en]

### Repository
Clone the repository from Github. [https://github.com/sergio-salazar/nexu-challenge.git]

### `npm install`
Run the command `npm install` in the console to download all the necessary node_modules.

### `npm run dev`
Run the command `npm run dev` in the console, and then you can make requests on [http://localhost:4000].

                              GET    http://localhost:4000/brands
                              GET    http://localhost:4000/brands/:id/models
                              POST   http://localhost:4000/brands
                              POST   http://localhost:4000/brands/:id/models
                              PUT    http://localhost:4000/models/:id
                              GET    http://localhost:4000/models

## Database
For database, I used MySQL. You have to run the next query to create the database with the tables and data.

Volcado de tabla brands
------------------------------------------------------------

DROP TABLE IF EXISTS `brands`;

CREATE TABLE `brands` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;

INSERT INTO `brands` (`id`, `name`)
VALUES
	(1,'Acura'),
	(2,'Audi'),
	(3,'Bentley'),
	(4,'BMW'),
	(5,'Buick'),
	(6,'Toyota'),
	(9,'Mazda');

/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;


Volcado de tabla models
------------------------------------------------------------

DROP TABLE IF EXISTS `models`;

CREATE TABLE `models` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  `average_price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;

INSERT INTO `models` (`id`, `brand_id`, `name`, `average_price`)
VALUES
	(1,1,'ILX',303176),
	(2,1,'MDX',448193),
	(3,1,'NSX',3818225),
	(4,1,'RDX',395753),
	(5,1,'RL',239050),
	(6,9,'Mazda 2',150000),
	(7,9,'Mazda 3',200000);

/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

