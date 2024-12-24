/*
  # Add Initial Minecraft Servers

  1. Changes
    - Adds initial popular Minecraft servers as seed data
    
  2. Data Added
    - Popular Minecraft servers with descriptions
    - Variety of server types (Survival, Creative, Minigames)
*/

INSERT INTO servers (name, address, description)
VALUES 
  (
    'Hypixel',
    'mc.hypixel.net',
    'The largest Minecraft server network featuring original games like SkyBlock, BedWars, and more'
  ),
  (
    'Mineplex',
    'us.mineplex.com',
    'One of the biggest Minecraft networks with custom minigames and unique gameplay experiences'
  ),
  (
    'CubeCraft',
    'play.cubecraft.net',
    'Popular server featuring unique minigames, survival games, and skyblock adventures'
  ),
  (
    'ManaCube',
    'play.manacube.com',
    'Feature-rich server network offering Skyblock, Prison, and creative building experiences'
  ),
  (
    'Purple Prison',
    'purple.wtf',
    'One of the most popular Prison servers with unique features and active community'
  );