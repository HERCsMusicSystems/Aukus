
var Vessel = function (country) {
	this . position = {x: 0, y: 0, depth: 0, bearing: 0};
	this . speed = {x: 0, y: 0, depth: 0, bearing: 0};
	this . country = country;
};

Vessel . prototype . move = function (delta) {
	var knot = delta / 3600;
	this . position . x += (this . speed . x * Math . cos (this . position . bearing) + this . speed . y * Math . sin (this . position . bearing)) * knot;
	this . position . y += (this . speed . x * Math . sin (this . position . bearing) - this . speed . y * Math . cos (this . position . bearing)) * knot;
};
