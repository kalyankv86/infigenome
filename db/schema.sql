-- Infigenome platform schema (MySQL 8)
-- Apply with: mysql infigenome < db/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  status      ENUM('new','contacted','qualified','closed','spam') NOT NULL DEFAULT 'new',
  ip_address  VARCHAR(45)   DEFAULT NULL,
  user_agent  VARCHAR(500)  DEFAULT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_leads_email (email),
  KEY idx_leads_status (status),
  KEY idx_leads_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
