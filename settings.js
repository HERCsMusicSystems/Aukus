var ranks = {
	'USA': ['Ensign', 'Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain'],
	'United Kingdom': ['Sub-lieutenant', 'Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain', 'Commodore'],
	Russia: ['Лейтенант', 'Старший лейтенант', 'Капитан-лейтенант', 'Капитан третьего ранга', 'Капитан второго ранга', 'Капитан']
};

var sides = Object . keys (ranks);

var side = localStorage . getItem ('side');
if (! side) localStorage . setItem ('side', side = sides [0]);

var music_on = localStorage . getItem ('music_on');
if (music_on === null) localStorage . setItem ('music_on', music_on = true); else music_on = music_on === 'true';

var effects_on = localStorage . getItem ('effects_on');
if (effects_on === null) localStorage . setItem ('effects_on', effects_on = true); else effects_on = effects_on === 'true';
