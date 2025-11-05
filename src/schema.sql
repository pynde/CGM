-- Table for game components (based on src/kysely/schema.ts -> GameComponentTable)

CREATE TABLE IF NOT EXISTS game_components (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  style TEXT NULL
);

INSERT INTO game_components (id, name, style) VALUES
('testicomponent1', 'Testi GC 1', '{ "x": 0, "y": 0, "width": 150, "height": 200, "fill": "white"}'),
('testicomponent2', 'Testi GC 2', null);