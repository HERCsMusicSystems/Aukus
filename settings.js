
var InheritFrom = function (from, to) {
	if (to === undefined) {to = from; from = function () {to . apply (this, arguments);}}
	from . prototype = Object . create (to . prototype);
	from . prototype . constructor = from;
	return from;
};

var ranks = {
	Australia: ['Sub-Lieutenant', 'Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain (RAN)', 'Commodore'],
	'United Kingdom': ['Sub-Lieutenant', 'Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain', 'Commodore'],
	USA: ['Ensign', 'Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain'],
	Russia: ['Лейтенант', 'Старший лейтенант', 'Капитан-лейтенант', 'Капитан третьего ранга', 'Капитан второго ранга', 'Капитан'],
	Polad: ['Podporucznik', 'Porucznik', 'Kapitan', 'Komandor-Podporucznik', 'Komandor'],
	Germany: ['Leutnant', 'Oberleutnant', 'Kapitän­Leutnant', 'Kapitän'],
	France: ['Enseigne', 'Lieutenant', 'Capitaine']
};

var friends = {
	Australia: ['United Kingdom', USA],
	'United Kingdom': [Australia, USA],
	USA: [Australia, 'United Kingdom']
};

var enemies = {
	Australia: [Russia],
	'United Kingdom': [Russia],
	USA: [Russia],
	Russia: [Australia, 'United Kingdom', USA]
};

var sides = Object . keys (ranks);

var side = localStorage . getItem ('side');
if (! side) localStorage . setItem ('side', side = sides [0]);

var music_on = localStorage . getItem ('music_on');
if (music_on === null) localStorage . setItem ('music_on', music_on = true); else music_on = music_on === 'true';

var effects_on = localStorage . getItem ('effects_on');
if (effects_on === null) localStorage . setItem ('effects_on', effects_on = true); else effects_on = effects_on === 'true';

var commanders = {};
for (var country of sides) {
	commanders [country] = JSON . parse (localStorage . getItem (country) || '{"commanders": {}, "commander": null}');
	if (! localStorage . getItem (country)) localStorage . setItem (country, JSON . stringify (commanders [country]));
}

var LoadJavaScript = function (source, instructions) {
	var script = document . createElement ('script');
	script . src = source;
	script . onload = instructions;
	document . body . appendChild (script);
};

var parameters = document . URL . indexOf ('?') + 1;
parameters = parameters > 0 ? JSON . parse (decodeURI (document . URL . substr (parameters))) : null;
