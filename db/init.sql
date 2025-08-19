-- Database initialization script for Docker
-- This file is automatically executed when the PostgreSQL container starts

-- Create the database if it doesn't exist
SELECT 'CREATE DATABASE ardent_pos'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ardent_pos')\gexec

-- Connect to the database
\c ardent_pos;

-- Run the main schema
\i /docker-entrypoint-initdb.d/schema.sql
