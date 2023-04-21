
var Vessel = function (country) {
	this . position = {x: 0, y: 0, depth: 0, bearing: 0};
	this . speed = {x: 0, y: 0, depth: 0, bearing: 0, index: 0};
	this . speeds = [0, 2, 8, 16, 25, 32, 40];
	this . noise = 0;
	this . noises = [60, 120, 480, 4800, 30000, 190000, 1200000];
	this . country = country;
};

Vessel . prototype . move = function (delta) {
	var knot = delta / 3600;
	this . position . x += (this . speed . x * Math . cos (this . position . bearing) + this . speed . y * Math . sin (this . position . bearing)) * knot;
	this . position . y += (this . speed . x * Math . sin (this . position . bearing) - this . speed . y * Math . cos (this . position . bearing)) * knot;
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

