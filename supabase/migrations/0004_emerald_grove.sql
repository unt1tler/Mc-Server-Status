/*
  # Fix voting function parameter ambiguity

  1. Changes
    - Drop existing vote_server function
    - Recreate function with unambiguous parameter names
    - Add proper table aliases for clarity
*/

-- First drop the existing function
DROP FUNCTION IF EXISTS vote_server(uuid, text);

-- Recreate the function with fixed parameter names
CREATE OR REPLACE FUNCTION vote_server(server_id uuid, vote_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete existing vote if any
  DELETE FROM votes v
  WHERE v.user_id = auth.uid()
  AND v.server_id = vote_server.server_id;

  -- Insert new vote
  INSERT INTO votes (user_id, server_id, vote_type)
  VALUES (auth.uid(), vote_server.server_id, vote_server.vote_type);

  -- Update vote counts
  UPDATE servers s
  SET 
    votes_up = (SELECT count(*) FROM votes v WHERE v.server_id = vote_server.server_id AND v.vote_type = 'up'),
    votes_down = (SELECT count(*) FROM votes v WHERE v.server_id = vote_server.server_id AND v.vote_type = 'down'),
    updated_at = now()
  WHERE s.id = vote_server.server_id;
END;
$$;