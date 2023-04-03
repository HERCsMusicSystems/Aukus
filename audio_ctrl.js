
var CreateAudio = function (file, loop) {
	if (loop === undefined) loop = false;
	var div = document . createElement ('div');
	div . innerHTML = `
		<audio id="${file}_audio" ${loop ? 'loop' : ''} >
			<source src="audio/${file}.wav" type="audio/wav" />
			<source src="audio/${file}.mp3" type="audio/mpeg" />
		</audio>`;
	document . body . appendChild (div);
	return document . getElementById (`${file}_audio`);
};

var audio = {
	ping_sonar: CreateAudio ('ping_sonar'),
	ping_torpedo: CreateAudio ('ping_torpedo'),
	akula: CreateAudio ('akula', true),
	hero: CreateAudio ('07 A Hero Comes Home, song (as used in the film Beowulf)', true),
	beowulf: CreateAudio ('09 I Am Beowulf', true),
	story: CreateAudio ('12 He Has A Story To Tell', true),
	promises: CreateAudio ('13 Full Of Fine Promises', true),
	Beowulf: CreateAudio ('01 Beowulf Main Title'),
	light: CreateAudio ('LetThereBeLight'),
	torpedoLaunch: CreateAudio ('torpedo_launch1'),
	harpoonLaunch: CreateAudio ('harpoon_launch'),
	harpoonHit: CreateAudio ('harpoon_hit'),
	floor: CreateAudio ('floor')
};

var PlayAudio = function (id) {audio [id] . currentTime = 0; audio [id] . play ();};
var PauseAudio = function (id) {audio [id] . pause ();};
var LoopAudio = function (id, loop) {audio [id] . loop = loop;};
