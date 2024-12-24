/*
  # Add server categories and more servers

  1. Schema Changes
    - Add categories table
    - Add category_id to servers table
    - Add version field to servers table
  
  2. Data
    - Insert server categories
    - Insert more servers with categories
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Add category and version to servers
ALTER TABLE servers 
ADD COLUMN category_id uuid REFERENCES categories(id),
ADD COLUMN version text;

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('PvP 1.8', 'pvp-1-8', 'Classic PvP servers running Minecraft 1.8'),
  ('PvP 1.12+', 'pvp-1-12-plus', 'Modern PvP servers running Minecraft 1.12 and above'),
  ('Anarchy', 'anarchy', 'No rules, pure survival anarchy servers'),
  ('Skyblock', 'skyblock', 'Island survival and economy focused servers'),
  ('Minigames', 'minigames', 'Various minigames and party games'),
  ('Survival', 'survival', 'Traditional survival gameplay'),
  ('Creative', 'creative', 'Creative building servers'),
  ('Modded', 'modded', 'Servers with custom mods and modpacks'),
  ('Roleplay', 'roleplay', 'RPG and roleplay focused servers'),
  ('Prison', 'prison', 'Mining and progression based prison servers');

-- Update existing servers with categories
UPDATE servers SET 
  category_id = (SELECT id FROM categories WHERE slug = 'minigames'),
  version = '1.8-1.20'
WHERE address = 'mc.hypixel.net';

UPDATE servers SET 
  category_id = (SELECT id FROM categories WHERE slug = 'minigames'),
  version = '1.8-1.20'
WHERE address = 'us.mineplex.com';

UPDATE servers SET 
  category_id = (SELECT id FROM categories WHERE slug = 'minigames'),
  version = '1.8-1.20'
WHERE address = 'play.cubecraft.net';

UPDATE servers SET 
  category_id = (SELECT id FROM categories WHERE slug = 'skyblock'),
  version = '1.8-1.20'
WHERE address = 'play.manacube.com';

UPDATE servers SET 
  category_id = (SELECT id FROM categories WHERE slug = 'prison'),
  version = '1.8-1.20'
WHERE address = 'purple.wtf';

-- Insert new servers
INSERT INTO servers (name, address, description, category_id, version) VALUES
  -- PvP 1.8
  ('MCCentral', 'mccentral.org', 'Popular 1.8 PvP server with various game modes', (SELECT id FROM categories WHERE slug = 'pvp-1-8'), '1.8'),
  ('GommeHD', 'gommehd.net', 'German PvP server with BedWars and SkyWars', (SELECT id FROM categories WHERE slug = 'pvp-1-8'), '1.8'),
  
  -- PvP 1.12+
  ('PvP Legacy', 'pvplegacy.net', 'Modern competitive PvP server', (SELECT id FROM categories WHERE slug = 'pvp-1-12-plus'), '1.12-1.20'),
  ('Lunar Network', 'lunar.gg', 'High-quality PvP network with competitive focus', (SELECT id FROM categories WHERE slug = 'pvp-1-12-plus'), '1.12-1.20'),
  
  -- Anarchy
  ('2b2t', '2b2t.org', 'The oldest anarchy server in Minecraft', (SELECT id FROM categories WHERE slug = 'anarchy'), '1.12.2'),
  ('9b9t', '9b9t.com', 'Alternative anarchy server with similar gameplay to 2b2t', (SELECT id FROM categories WHERE slug = 'anarchy'), '1.12.2'),
  
  -- Skyblock
  ('IronMC', 'play.ironmc.net', 'Advanced Skyblock with custom features', (SELECT id FROM categories WHERE slug = 'skyblock'), '1.8-1.20'),
  ('MoxMC', 'moxmc.net', 'Unique Skyblock experience with custom enchants', (SELECT id FROM categories WHERE slug = 'skyblock'), '1.8-1.20'),
  
  -- Survival
  ('Complex Gaming', 'play.complex.games', 'Semi-vanilla survival with land claiming', (SELECT id FROM categories WHERE slug = 'survival'), '1.20'),
  ('Minewind', 'minewind.com', 'Hardcore survival with PvP elements', (SELECT id FROM categories WHERE slug = 'survival'), '1.20'),
  
  -- Creative
  ('MCProHosting Build', 'build.mcprohosting.com', 'Creative building server with WorldEdit', (SELECT id FROM categories WHERE slug = 'creative'), '1.20'),
  ('Creative Fun', 'play.creativefun.net', 'Creative plots with building competitions', (SELECT id FROM categories WHERE slug = 'creative'), '1.20'),
  
  -- Modded
  ('Complex Gaming Modded', 'modded.complex.games', 'Custom modpack server with quests', (SELECT id FROM categories WHERE slug = 'modded'), '1.20'),
  ('Tekxit Network', 'play.tekxit.net', 'Tekkit-based modded survival', (SELECT id FROM categories WHERE slug = 'modded'), '1.12.2'),
  
  -- Roleplay
  ('Grand Theft Minecart', 'gtm.network', 'GTA-inspired Minecraft roleplay', (SELECT id FROM categories WHERE slug = 'roleplay'), '1.12-1.20'),
  ('Medieval Roleplay', 'play.medieval-rp.com', 'Medieval fantasy roleplay server', (SELECT id FROM categories WHERE slug = 'roleplay'), '1.20'),
  
  -- Prison
  ('CosmicPrison', 'cosmicprisons.com', 'Competitive prison server with custom features', (SELECT id FROM categories WHERE slug = 'prison'), '1.8-1.20'),
  ('TheArchon Prison', 'archonhq.net', 'Feature-rich prison server with active economy', (SELECT id FROM categories WHERE slug = 'prison'), '1.8-1.20');