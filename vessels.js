
var Mark48 = function (cable, name, country) {
	if (country === undefined) country = 'USA';
	Vessel . call (this, country);
	this . type = 'torpedo';
	this . name = name;
}; inherit (Mark48, Vessel);

var Harpoon = function (cable, name, country) {};

var Virginia = function (country) {
	if (country === undefined) country = 'USA';
	Vessel . call (this, country);
	this . inventory = {
		'Mark 48': {constructor: Mark48, count: 26},
		Harpoon: {constructor: Harpoon, count: 12, depth: 150}
	}
	this . BuildTubes ({'Mark 48 Long Range': 'Mark 48', 'Mark 48 Fast': 'Mark 48', Harpoon: 'Harpoon'}, 2);
};inherit (Virginia, Vessel);
Virginia . prototype . image = 'Virginia';
Virginia . prototype . info = 'https://en.wikipedia.org/wiki/Virginia-class_submarine';
Virginia . prototype . names = ['SSN-774 Virginia', 'SSN-775 Texas', 'SSN-776 Hawaii', 'SSN-777 North Carolina', 'SSN-778 New Hampshire', 'SSN-779 New Mexico', 'SSN-780 Missouri', 'SSN-781 California', 'SSN-782 Mississippi', 'SSN-783 Minnesota', 'SSN-784 North Dakota', 'SSN-785 John Warner', 'SSN-786 Illinois', 'SSN-787 Washington', 'SSN-788 Colorado', 'SSN-789 Indiana', 'SSN-790 South Dakota', 'SSN-791 Delaware', 'SSN-792 Vermont', 'SSN-793 Oregon', 'SSN-794 Montana', 'SSN-795 Hyman G. Rickover', 'SSN-796 New Jersey', 'SSN-797 Iowa', 'SSN-798 Massachusetts', 'SSN-799 Idaho', 'SSN-800 Arkansas', 'SSN-801 Utah'];

