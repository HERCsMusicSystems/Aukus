
var simulated = null;
var selected = null;

var Vessel = function (country) {
	this . position = {x: 0, y: 0, depth: 0, bearing: 0};
	this . speed = {x: 0, y: 0, depth: 0, bearing: 0, index: 0};
	this . speeds = [0, 2, 8, 16, 25, 32, 40];
	this . noise = 0;
	this . noises = [60, 120, 480, 4800, 30000, 190000, 1200000];
	this . TargetBearing = null;
	this . BearingSpeeds = [0, 2 * Math . PI / 180, 4 * Math . PI / 180, 6 * Math . PI / 180, 4 * Math . PI / 180, 2 * Math . PI / 180, 1 * Math . PI / 180];
	this . country = country;
};

Vessel . prototype . move = function (delta) {
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

