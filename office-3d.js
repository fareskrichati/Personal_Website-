import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
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
box(.12,2.5,3.5,8.19,1.25,1.45,dark);
for(let i=0;i<5;i++)box(.03,.035,3.45,8.11,.3+i*.5,1.45,steel);
for(const z of [-.25,3.15])box(4,.08,.06,6.15,2.65,z,steel);
box(.12,2.2,.9,8.18,1.1,4.1,wood);
box(.14,1.35,.62,8.10,1.45,4.1,white);
const vehicleStart=scene.children.length;
box(2.05,.65,3.95,5.8,.65,-1.9,white);box(1.9,.70,2.3,5.8,1.28,-1.85,white);box(1.62,.05,1.8,5.8,1.66,-1.8,screen);box(1.7,.5,.04,5.8,1.29,-.68,screen);box(1.7,.48,.04,5.8,1.29,-3.02,screen);for(const x of [4.83,6.77]){box(.025,.45,1.8,x,1.28,-1.85,screen);for(const z of [-3.2,-.55]){const w=cyl(.4,.22,x,.4,z,dark);w.rotation.z=Math.PI/2;}}
for(const x of [5.1,6.5])box(.35,.13,.035,x,.73,.10,mat('#f5e7b9'));

const vehicleParts=scene.children.slice(vehicleStart);const vehicle=new THREE.Group();scene.add(vehicle);
for(const part of vehicleParts){scene.remove(part);part.position.x-=5.8;part.position.z+=1.9;vehicle.add(part);}
vehicle.rotation.y=Math.PI/2;vehicle.position.set(5.8,0,1.45);
// Entrance wing: two offices side by side, then two bathrooms and kitchenette.
box(6,.28,10,-11.3,-.2,0,mat('#c2cbd3'));
box(5.8,.09,9.6,-11.3,.03,0,mat('#665e55'));
box(.16,2.7,9.6,-14.3,1.35,0,plaster);
box(6,2.7,.16,-11.3,1.35,-4.8,plaster);
box(6,2.7,.16,-11.3,1.35,4.8,plaster);
box(4.1,2.7,.15,-12.25,1.35,0,plaster);
// Office-to-service partition, with openings into both offices.
for(const z of [-4.15,-.25,4.15])box(.15,2.7,1.25,-10.2,1.35,z,plaster);
box(.15,.3,9.6,-10.2,2.55,0,plaster);
// Front glazing and entrance details, inset within the end wall.
for(const z of [-2.4,2.4]){
 box(.18,1.8,3.1,-14.19,1.65,z,mat('#c3d5da',{transparent:true,opacity:.45}));
 for(const dz of [-1.55,0,1.55])box(.2,1.85,.055,-14.08,1.65,z+dz,white);
 box(.2,.06,3.15,-14.08,2.57,z,white);
}
// Front office with lounge, desk and green rug.
box(2.3,.12,.8,-12.65,.85,3.9,wood);chair(-12.6,2.9);box(.9,.5,.06,-12.65,1.2,4.1,screen);
box(1.7,.03,2,-11.35,.1,1.65,mat('#286349'));box(.65,.4,1,-11.35,.3,1.65,wood);
for(const z of [.6,2.7]){box(.85,.4,.8,-11.35,.35,z,white);box(.85,.65,.15,-11.35,.65,z+(z<2?-.38:.38),white);}
// Adjacent reception office with L-shaped desk and guest chair.
box(2.5,.12,.75,-12.3,.85,-3,wood);box(.75,.12,1.65,-11.4,.85,-2.45,wood);
chair(-12.5,-3.85);chair(-11.8,-1.4);box(.8,.45,.06,-12.1,1.14,-3.1,screen);
// Two bathrooms behind the lounge; passage and kitchen behind reception.
box(2,2.7,.14,-9.25,1.35,0,plaster);box(2,2.7,.14,-9.25,1.35,2.4,plaster);
for(const z of [1.2,3.6]){
 box(.16,2.7,.75,-8.3,1.35,z-.8,plaster);box(.16,.35,1.55,-8.3,2.52,z,plaster);
 box(.45,.65,.35,-9.85,.35,z,white);cyl(.24,.35,-9.5,.22,z,white);
 box(.5,.12,.65,-8.75,.85,z+.65,white);box(.05,.65,.55,-8.45,1.5,z+.65,screen);
 const door=box(.075,2.2,.85,-8.1,1.1,z,dark);door.rotation.y=-.5;
}
box(.65,.9,3,-9,.45,-3,wood);box(.75,.07,3.1,-9,.95,-3,white);
box(.45,.025,.6,-9,1,-2.4,steel);box(.72,1.8,.75,-9,.9,-.95,white);
// Workshop handwash basin at the bathroom wall.
box(.55,.12,.75,-7.9,.85,2.4,white);for(const z of [2.1,2.7])box(.06,.8,.06,-7.65,.4,z,steel);
// Workshop floor seams.
for(let x=-8;x<8;x+=1.2)box(.012,.008,5.5,x,.03,1.9,mat('#a7aaa5'));
function label(text,x,z){const c=document.createElement('canvas');c.width=512;c.height=96;const ctx=c.getContext('2d');ctx.fillStyle='#ffffffed';ctx.fillRect(0,0,512,96);ctx.fillStyle='#1e446b';ctx.font='500 36px sans-serif';ctx.textAlign='center';ctx.fillText(text,256,60);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));sprite.position.set(x,3.25,z);sprite.scale.set(2.8,.525,1);scene.add(sprite);}
label('FRONT OFFICE',-11.3,2);label('OFFICES',-3.1,-3);label('WORKBENCH',-3,3.5);label('GARAGE',6,1.4);
const views={overview:[[19,22,28],[-3,0,0]],front:[[-17,10,15],[-11,0,0]],offices:[[-4,7,8],[-3,1,-2.8]],workbench:[[-5,5,11],[-3,1,2.5]],garage:[[13,7,8],[5.5,.7,1.5]],top:[[-3,35,.01],[-3,0,0]]};
function setView(name){camera.position.fromArray(views[name][0]);controls.target.fromArray(views[name][1]);controls.update();document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===name)));}
setView('overview');document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));document.querySelector('#rotate').onclick=e=>{controls.autoRotate=!controls.autoRotate;e.target.setAttribute('aria-pressed',String(controls.autoRotate));};function zoom(f){const d=camera.position.clone().sub(controls.target);d.setLength(THREE.MathUtils.clamp(d.length()*f,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(d);controls.update();}document.querySelector('#zoom-in').onclick=()=>zoom(.8);document.querySelector('#zoom-out').onclick=()=>zoom(1.25);
renderer.domElement.tabIndex=0;renderer.domElement.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='=')zoom(.8);else if(e.key==='-')zoom(1.25);else if(e.key==='Home')setView('overview');else return;e.preventDefault();});
new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}).observe(host);
let visible=true;new IntersectionObserver(e=>visible=e[0].isIntersecting).observe(host);renderer.setAnimationLoop(()=>{if(visible){controls.update();renderer.render(scene,camera);}});
} catch(e){document.querySelector('#error').hidden=false;console.error(e);}
