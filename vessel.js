
var simulated = null;
var selected = null;
var simulation = [];
var scaling = 1;
var thermoclines = [{depth: 160, attenuation: 0.01}, {depth: 320, attenuation: 0.01}, {depth: 600, attenuation: 0.001}, {depth : 1200, attenuation: 0.001}];
var Floor = function (position) {return 3000;};

var Tube = function (vessel, settings, speed) {
	if (speed === undefined) speed = 0.05;
	this . flooded = 0;
	this . flood = speed;
	this . command = null; // flood, dry, fire, empty
	this . torpedo = null;
	this . torpedoes = {};
	this . vessel = vessel;
	for (var ind in settings) this . torpedoes [ind] = settings [ind];
	this . display_element = null;
};

Tube . prototype . load = function (selector) {
	if (this . torpedo !== null) return null;
	var SubSelector = this . torpedoes [selector];
	var constructor = this . vessel . inventory [SubSelector] . constructor;
	var inv = this . vessel . inventory [SubSelector];
	if (inv . count < 1) return null; inv . count --;
	this . torpedo = new constructor (null, 'sputnik', this . country);
	return this . torpedo;
};

Tube . prototype . empty = function () {
	this . torpedo = null;
	this . flooded = 0;
};

var Vessel = function (country) {
	this . type = 'submarine'; // can also be surface, torpedo, missile or convoy
	this . class = 'Aukus SSN';
	this . position = {x: 0, y: 0, depth: 0, bearing: 0};
	this . speed = {x: 0, y: 0, depth: 0, bearing: 0, index: 0};
	this . speeds = [0, 2, 8, 16, 25, 32, 40];
	this . noise = 0;
	this . noises = [60, 120, 480, 4800, 30000, 190000, 1200000];
	this . TargetBearing = null;
	this . BearingSpeeds = [0, 2 * Math . PI / 180, 4 * Math . PI / 180, 6 * Math . PI / 180, 4 * Math . PI / 180, 2 * Math . PI / 180, 1 * Math . PI / 180];
	this . trail = {trail: [], delta: 24, length: 15, initial: 24};
	this . tubes = [];
	this . inventory = {};
	this . silo = {};
	this . country = country;
	this . name = '';
};

Vessel . prototype . image = 'Default';
Vessel . prototype . info = 'https://en.wikipedia.org/wiki/Warship';

Vessel . prototype . BuildTubes = function (settings, amount, speed) {
	this . tubes = [];
	for (var ind = 0; ind < amount; ind ++) this . tubes . push (new Tube (this, settings, speed));
};

Vessel . prototype . move = function (delta) {
	this . trail . delta -= delta;
	if (this . trail . delta < 0) {
		this . trail . trail . push ({x: this . position . x, y: this . position . y});
		this . trail . delta = this . trail . initial;
		while (this . trail . trail . length > this . trail . length) this . trail . trail . shift ();
	}
	var knot = delta / 3600;
	this . position . x += (this . speed . x * Math . cos (this . position . bearing) + this . speed . y * Math . sin (this . position . bearing)) * knot;
	this . position . y += (this . speed . x * Math . sin (this . position . bearing) - this . speed . y * Math . cos (this . position . bearing)) * knot;
	if (this . TargetBearing != null) {
		if (Math . abs (this . TargetBearing - this . position . bearing) < this . BearingSpeeds [this . speed . index]) {
			this . position . bearing = this . TargetBearing;
			this . TargetBearing = null;
		} else {
			if (this . position . bearing < this . TargetBearing) this . position . bearing += this . BearingSpeeds [this . speed. index];
			else this . position . bearing -= this . BearingSpeeds [this . speed . index];
		}
	}
};

Vessel . prototype . SetTargetBearing = function (bearing) {
	if (this . speed . x === 0 || this . speed . index === 0) this . setSpeed ('slow');
	this . TargetBearing = bearing;
	if (this . TargetBearing < 0) this . TargetBearing += Math . PI + Math . PI;
	if (this . TargetBearing > Math . PI + this . position . bearing) this . position . bearing += Math . PI + Math . PI;
	if (this . TargetBearing + Math . PI < this . position . bearing) this . position . bearing -= Math . PI + Math . PI;
};

Vessel . prototype . setSpeed = function (index) {
	switch (index) {
	case 'stop': index = 0; break;
	case 'slow': index = 1; break;
	case 'one quarter': case '1/4': case 'quarter': index = 2; break;
	case 'half': case '1/2': index = 3; break;
	case 'three quarters': case '3/4': index = 4; break;
	case 'full': index = 5; break;
	case 'flank': index = 6; break;
	default: break;
	}
	if (index < 0) index = 0; if (index > 6) index = 6; this . speed . x = this . speeds [index]; this . speed . index = index;
	this . noise = this . noises [index];
};

Vessel . prototype . DrawTrail = function (ctx, mile) {
	ctx . strokeStyle = 'white';
	ctx . lineWidth = 2;
	for (var tr of this . trail . trail) {ctx . beginPath (); ctx . arc (tr . x * mile, tr . y * mile, 1, 0, 6.28); ctx . stroke ();}
};

Vessel . prototype . DrawSimulated = function (ctx, LosAngeles) {
	var scc = scaling * 110 * 128 / 1852;
	var p = this . position;
	var mile = 128 * scaling;
	var x = p . x * mile, y = p . y * mile;
	this . DrawTrail (ctx, mile);
	if (scc < 24) {
		var alpha = Math . cos (p . bearing) * 12, beta = Math . sin (p . bearing) * 12;
		ctx . save ();
		ctx . lineCap = 'round'; ctx . lineWidth = 4; ctx . strokeStyle = 'lime';
		ctx . beginPath (); ctx . moveTo (x - alpha, y - beta); ctx . lineTo (x + alpha, y + beta); ctx . stroke ();
		ctx . restore ();
	} else {
		scc /= LosAngeles . width;
		ctx . save ();
		ctx . scale (scc, scc); ctx . translate (x / scc, y / scc); ctx . rotate (p . bearing); ctx . translate (LosAngeles . width * -0.5, LosAngeles . height * -0.5); ctx . drawImage (LosAngeles, 0, 0);
		ctx . restore ();
	}
};

Vessel . prototype . draw = function (ctx, detected) {
	if (this === simulated) return;
	ctx . save ();
	var status = 'unknown';
	if (detected) {ctx . fillStyle = 'white'; status = 'unknown';}
	else {
		ctx . fillStyle = ctx . strokeStyle = 'yellow'; status = 'neutral';
		if (friends [simulated . country] . includes (this . country)) {ctx . fillStyle = 'lime'; status = 'friend';}
		if (enemies [simulated . country] . includes (this . country)) {ctx . fillStyle = 'red'; status = 'enemy';}
	}
	mile = 128 * scaling;
	var x = this . position . x * mile, y = this . position . y * mile;
	switch (this . type) {
	case 'submarine':
		this . DrawTrail (ctx, mile);
		ctx . lineCap = 'square';
		ctx . lineWidth = this === selected ? 3 : 2;
		ctx . beginPath (); ctx . arc (x, y, 2, 0, Math . PI * 2); ctx . fill ();
		ctx . strokeStyle = ctx . fillStyle;
		switch (status) {
		case 'enemy': ctx . moveTo (x + 8, y); ctx . lineTo (x, y + 8); ctx . lineTo (x - 8, y); break;
		case 'friend': ctx . moveTo (x + 8, y); ctx . arc (x, y, 8, 0, Math . PI); break;
		default: ctx . moveTo (x + 8, y); ctx . lineTo (x + 8, y + 8); ctx . lineTo (x - 8, y + 8); ctx . lineTo (x - 8, y); break;
		}
		ctx . stroke ();
		break;
	case 'surface':
		this . DrawTrail (ctx, mile);
		ctx . lineCap = 'square';
		ctx . lineWidth = this === selected ? 3 : 2;
		ctx . beginPath (); ctx . arc (x, y, 2, 0, Math . PI * 2); ctx . fill ();
		ctx . strokeStyle = ctx . fillStyle;
		switch (status) {
		case 'enemy': ctx . moveTo (x, y - 8); ctx . lineTo (x + 8, y); ctx . lineTo (x, y + 8); ctx . lineTo (x - 8, y); ctx . closePath (); break;
		case 'friend': ctx . moveTo (x + 8, y); ctx . arc (x, y, 8, 0, Math . PI * 2); break;
		default: ctx . moveTo (x + 8, y - 8); ctx . lineTo (x + 8, y + 8); ctx . lineTo (x - 8, y + 8); ctx . lineTo (x - 8, y - 8); ctx . closePath (); break;
		}
		ctx . stroke ();
		break;
	case 'torpedo':
		this . Drawtrail (ctx, mile);
		break;
	default: break;
	}
	ctx . restore ();
};

var DrawAll = function (ctx) {
	for (var vessel of simulation) vessel . draw (ctx);
};
