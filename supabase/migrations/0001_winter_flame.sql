/*
  # Initial Schema Setup

  1. Tables
    - `servers`: Stores Minecraft server information
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `description` (text)
      - `votes_up` (integer)
      - `votes_down` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `votes`: Tracks user votes on servers
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `server_id` (uuid, references servers)
      - `vote_type` (text, either 'up' or 'down')
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Public can view servers
    - Only admins can add servers
    - Users can only vote once per server
    - Users can view their own votes
*/

-- Create servers table
CREATE TABLE servers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  description text NOT NULL,
  votes_up integer DEFAULT 0,
  votes_down integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create votes table
CREATE TABLE votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  server_id uuid REFERENCES servers NOT NULL,
  vote_type text CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, server_id)
);

-- Create voting function
CREATE OR REPLACE FUNCTION vote_server(server_id uuid, vote_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete existing vote if any
  DELETE FROM votes
  WHERE user_id = auth.uid()
  AND server_id = vote_server.server_id;

  -- Insert new vote
  INSERT INTO votes (user_id, server_id, vote_type)
  VALUES (auth.uid(), vote_server.server_id, vote_server.vote_type);

  -- Update vote counts
  UPDATE servers
  SET 
    votes_up = (SELECT count(*) FROM votes WHERE server_id = vote_server.server_id AND vote_type = 'up'),
    votes_down = (SELECT count(*) FROM votes WHERE server_id = vote_server.server_id AND vote_type = 'down'),
    updated_at = now()
  WHERE id = vote_server.server_id;
END;
$$;

-- Enable RLS
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Policies for servers table
CREATE POLICY "Anyone can view servers"
  ON servers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert servers"
  ON servers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for votes table
CREATE POLICY "Users can view their own votes"
  ON votes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can vote once per server"
  ON votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);