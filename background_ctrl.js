var goodLooking = `
Submarine.jpg
Submarine2.jpg
Submarine2.jpg
Submarine2.jpg
Submarine2.jpg
Submarine2.jpg
Submarine2.jpg
virginiaclasssubmarine.jpg
seawolfclasssubmarine.jpg
seawolfclasssubmarine.jpg
seawolfclasssubmarine.jpg
seawolfclasssubmarine.jpg
seawolfclasssubmarine.jpg
seawolfclasssubmarine.jpg
20190218ran8108462_108-e1564710258794.jpg
39623bfdf8bce4cce8fa81648f73a3ff.jpeg
7jhgs6hx-1413177864.jpg
K61 (1).jpg
142357_HMS-Vanguard-hero-new.jpg
577689954321f1c72f8b4f43-2732-1366.jpg
52OELMDLQFA6TM2HUG4THDWVOA.JPG
1200px-К-560_«Северодвинск».jpg
HMS-Vanguard-Major-Refit-behind-Schedule.jpg
victor_iii_class_submarine.jpg
vanguard_class[1].jpg
1280px-hms_gotland_with_uss_ronald_reagan.jpg
ATKHAT2COWOKWJHFPTJC5ODN5A.jpg
BBN4ojo.img.jpeg
US_Navy_040730-N-1234E-002_PCU_Virginia_(SSN_774)_returns_to_the_General_Dynamics_Electric_Boat_shipyard.jpg
typhoon-surfaced.jpg
AAFimt3.img.jpeg
collins2.jpg
Collins.jpg
Kilo-Class_Russian_Submarine_MOD_45165128.jpg
imagesvc.timeincapp.com.jpeg
Ballistic_submarine_base-DIA.jpg
Oscar_class.jpg
Oscar_parade.jpg
Oscar_return.jpg
Oscar_Tomsk.jpg
`;
goodLooking += goodLooking;
var dir = (`
0021-DSC-4350_wqxga.jpg
0029_DSC_4170_wqxga.jpg
1200px-Mmi_S527.jpg
1200px-К-560_«Северодвинск».jpg
1280px-hms_gotland_with_uss_ronald_reagan.jpg
142357_HMS-Vanguard-hero-new.jpg
180699-O-MNZ73-887.jpg
190703-nemstova-russian-sub-fire-tease_uw0knp.jpeg
20132F112F042Fa92Fsubmarine.6ef80.jpg2F950x534__filtersAquality.jpg
20190218ran8108462_108-e1564710258794.jpg
20190218ran8108462_216.jpg
35b2b7911e1d0139bd4c3941dd83b4f0.jpg
39623bfdf8bce4cce8fa81648f73a3ff.jpeg
_46888672_newclip10copy.jpg
52OELMDLQFA6TM2HUG4THDWVOA.JPG
577689954321f1c72f8b4f43-2732-1366.jpg
5ed0fa7b1ec33ccb4b4d02d5aaca09f3.jpg
7jhgs6hx-1413177864.jpg
AAFimt3.img.jpeg
abcsfp63h03pvhmjqj7n.jpg
Alfa-class_submarine.jpg
ATKHAT2COWOKWJHFPTJC5ODN5A.jpg
BBN4ojo.img.jpeg
collins2.jpg
Collins.jpg
HMS-Alliance-Motor-engine-room-looking-forward.jpg
HMS-Vanguard-Major-Refit-behind-Schedule.jpg
imagesvc.timeincapp.com.jpeg
img_1079.jpg
Interior_del_Lembit_(submarine,_1937)_01.jpg
K61 (1).jpg
Kilo-Class_Russian_Submarine_MOD_45165128.jpg
maxresdefault.jpg
nuclear submarine interior control unit.jpg
qn8hua2oig5tb1x8e17e.jpg
shutterstock_347220944_1080.jpg
shutterstock-711005029.jpg
sub1.jpg
Submarine2.jpg
submarine-e1554746185424.jpg
Submarine.jpg
Typhoon-01.jpg
Typhoon-37.jpg
Typhoon-38.jpg
Typhoon-39.jpg
Typhoon-40.jpg
Typhoon-42.jpg
Typhoon-71.jpg
Typhoon-79.jpg
typhoona11.jpg
Typhoon-Class-Submarine3.jpg
Typhoon_class_submarine.jpg
Typhoon_Illustration1900.jpg
typhoon-surfaced.jpg
US_Navy_040730-N-1234E-002_PCU_Virginia_(SSN_774)_returns_to_the_General_Dynamics_Electric_Boat_shipyard.jpg
US_Navy_090112-N-7705S-061_Lt._Cmdr_Brad_Terry,_left,_executive_officer_of_the_Los-Angeles_class_attack_submarine_USS_Boise_(SSN_764),_explains_control_room_operations_to_Republic_of_Korea_Navy_Chief_of_Naval_Operations_Adm._Ju.jpg
vanguard_class[1].jpg
victor_iii_class_submarine.jpg
virginiaclasssubmarine.jpg
seawolfclasssubmarine.jpg
` + goodLooking) . split ('\n');
var other_images = `
Ru_Pr885M_cutaway.jpg
ezJlVLo.jpg
fbwi302dd4y01.jpg
s821Jml.jpg
belgorod.jpg
4i048z8nra201.jpg
Ru_Alfa_cutaway.jpg
papercraft-submarino-typhoon-project-941-akula-D_NQ_NP_867343-MLB27839173523_072018-F.jpg
ccn9969.jpg
BOREI-II_3d.jpg
Typhoon-75.jpg
DPYQt8HW4AA_CmM.jpg
`;
var index;
while ((index = dir . indexOf ('')) >= 0) dir . splice (index, 1);
for (index in dir) dir [index] = "url('images/" + dir [index] + "')";
var backgrounds = dir;
var background = backgrounds [Math . floor (Math . random () * backgrounds . length)];
// console . log (background);
document . body . style . backgroundImage = background;
