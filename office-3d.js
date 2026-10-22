import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
const host=document.querySelector('#view');
try {
const scene=new THREE.Scene();scene.background=new THREE.Color('#e8eff8');
const camera=new THREE.PerspectiveCamera(42,1,.1,150);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor('#e8eff8');host.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','Interactive office model with front office, three private offices, workbench, shelving, and garage');
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=3;controls.maxDistance=42;controls.maxPolarAngle=Math.PI*.48;controls.autoRotateSpeed=.65;
scene.add(new THREE.HemisphereLight(0xffffff,0x71839a,2.5));const sun=new THREE.DirectionalLight(0xfff2de,3);sun.position.set(-8,18,12);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-18,right:18,top:18,bottom:-18});sun.shadow.bias=-.0003;scene.add(sun);
const mat=(c,props={})=>new THREE.MeshStandardMaterial({color:c,roughness:.75,...props});
const plaster=mat('#e2dfd5'),wood=mat('#b48a50'),dark=mat('#252e36'),floor=mat('#bdbdb4'),white=mat('#f0f1eb'),screen=mat('#162b38',{roughness:.3}),steel=mat('#363e42'),red=mat('#94483b');
function box(w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o;}
function cyl(r,h,x,y,z,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),m);o.position.set(x,y,z);o.castShadow=true;scene.add(o);return o;}
box(10.7,.28,10,-3.05,-.2,0,mat('#c2cbd3'));box(10.5,.08,9.6,-3.05,-.02,0,floor);box(6,.28,5.8,5.35,-.2,1.9,mat('#c2cbd3'));box(6,.08,5.8,5.35,-.02,1.9,floor);
// Three private offices, open front cutaway, and workshop / garage.
box(10.6,2.7,.16,-3,1.35,-4.8,plaster);box(6,2.7,.16,5.3,1.35,-1,plaster);box(.16,2.7,5.8,8.3,1.35,1.9,plaster);
for(let i=0;i<3;i++){
 const x=-6.5+i*3.5;
 box(3.32,.09,3.65,x,.035,-2.85,mat(i===1?'#615b52':'#736758'));
 for(let k=0;k<15;k++)box(3.3,.006,.012,x,.085,-4.58+k*.24,mat('#514e47'));
 box(.15,2.7,3.7,x+1.75,1.35,-2.9,plaster);
 box(.38,2.7,.16,x-1.53,1.35,-1,plaster);box(.38,2.7,.16,x+1.53,1.35,-1,plaster);box(2.7,.28,.16,x,2.56,-1,plaster);
 // Desk with monitor, keyboard, and storage.
 box(1.8,.10,.78,x,.83,-3.75,i===1?dark:wood);for(const dx of [-.78,.78])box(.07,.79,.65,x+dx,.40,-3.75,steel);
 box(.72,.44,.07,x,1.23,-3.98,dark);box(.64,.36,.012,x,1.23,-3.936,screen);box(.07,.18,.06,x,.96,-3.98,steel);box(.37,.025,.2,x,.89,-3.85,steel);box(.5,.025,.18,x,.90,-3.51,mat('#c6ccd0'));
 chair(x,-2.6);box(.65,1.0,.6,x+1.02,.5,-3.85,white);for(let j=0;j<3;j++)box(.35,.024,.015,x+1.02,.23+j*.3,-3.54,steel);
}
function chair(x,z){cyl(.075,.42,x,.24,z,steel);box(.55,.12,.53,x,.51,z,dark);box(.55,.65,.09,x,.86,z+.24,dark);for(let a=0;a<5;a++){const angle=a*Math.PI*2/5;const leg=box(.45,.04,.04,x+Math.cos(angle)*.18,.07,z+Math.sin(angle)*.18,steel);leg.rotation.y=-angle;cyl(.055,.06,x+Math.cos(angle)*.4,.055,z+Math.sin(angle)*.4,dark);}}
// Long wood workbench along the near side.
box(10.4,.16,.9,-2.6,1,3.55,wood);for(const x of [-7.5,-3.6,2.3])box(.22,.94,.83,x,.47,3.55,wood);
for(const x of [-6.8,-5.25,-2.5,-.7]){box(.85,.055,.5,x,1.12,3.52,white);box(.77,.46,.045,x,1.36,3.7,dark);box(.69,.38,.014,x,1.36,3.67,screen);box(.5,.012,.20,x,1.155,3.39,steel);}
chair(-.1,2.1);box(2.4,.9,.10,-6.5,1.7,-.6,dark);
// Red storage shelving between the workbench and garage.
for(const x of [4.35,6.9]){for(const dx of [-1.2,1.2])for(const z of [3.8,4.6])box(.065,2.6,.065,x+dx,1.3,z,steel);for(let j=0;j<4;j++)box(2.48,.065,.86,x,.25+j*.72,4.2,red);}
for(const x of [3.6,4.3,6.8])box(.46,.33,.48,x,.45,4.2,mat('#ab9677'));
// Garage occupies the right end of the workshop, with its door on the end wall.
