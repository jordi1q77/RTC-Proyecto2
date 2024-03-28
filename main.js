import './style.css';
import './tabla.css';
/*import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
*/
import data from './elements.json';
let categoria = "All";
let atomicMass = 999999.9999;
/*const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(4,5,11);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.enablePan= true;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0,1,0);
controls.update();
const groundGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial( { color: 0x555555, side: THREE.DoubleSide} );
const groundMesh = new THREE.Mesh( groundGeometry, groundMaterial );
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0, 25, 0);
scene.add(spotLight);
console.log("ok00");
const loader = new GLTFLoader().setPath('public/free-bread-pack-cs2/source/');
console.log("ok0");
loader.load('bread pack.glb', (gltf) => {
  console.log("ok1");
  const mesh = gltf.scene;
  console.log("ok2");
  mesh.position.set(0,1.05, -1);
  console.log("ok3");
  scene.add(mesh);
  console.log("ok4");
});
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

*/


const pintarTabla= (elements) =>{
  const ul = document.querySelector(".tabla");
  ul.innerHTML = "";
  for (const element of elements) {

    const { symbol, cpk_hex, xpos, ypos} = element;
    const xposNext = xpos + 1;
    const yposNext = ypos + 1;
    const li = document.createElement("li");

    li.classList.add ("tabla-element");
    li.textContent = symbol;
    li.id = symbol;
    li.style.gridColumnStart = xpos;
    li.style.gridRowStart = ypos;
    li.style.backgroundColor = cpk_hex;///TODO no funciona, revisar
    li.style.borderColor = "#".concat(cpk_hex);
    ul.append(li);
  }
}
const seleccionarElementos = (elements) => {
  
  for (const element of elements) {

    const { symbol, cpk_hex, xpos, ypos} = element;
    const htmlElement = document.getElementById(symbol);
    htmlElement.classList.add("tabla-selected");
  }
}

const pintarElementos= (elements) =>{
  const ul = document.querySelector(".elements");
  ul.innerHTML = "";
  for (const element of elements) {

    const {name, atomic_mass, symbol, cpk_hex} = element;
    const {title:title_img, url: url_img} = element.image;
    
    const li = document.createElement("li");
    const title = document.createElement("h2");
    const figure = document.createElement("figure");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    li.classList.add ("element");
    title.textContent = name;
    title.classList.add("element-name");
    
    div.classList.add("image-element");

    img.src = url_img;
    img.alt = title_img;
    span1.textContent = symbol;
    span1.classList.add("symbol");
    span2.classList.add("atomic-mass");
    span2.textContent = atomic_mass;

    span2.style.backgroundColor = cpk_hex;///TODO no funciona, revisar

    li.appendChild(title);
    div.appendChild(img);
    div.appendChild(span1);
    div.appendChild(span2);
    figure.appendChild(div);  
    li.append(figure);
    ul.append(li);
  }
}
const cargarCabeceraFiltro = () =>{
  const filter = document.querySelector(".filter");
  const filterTitle = document.createElement("H1");
  filterTitle.textContent = "Periodic table";
  filter.append(filterTitle);
}
const cargarFiltroCategoria = () => {
  const filter = document.querySelector(".filter");
  const litCategory = document.createElement("label");
  const selCategory = document.createElement("select");

  litCategory.textContent = "Categories";
  litCategory.for = "category";
  selCategory.classList.add("inputFilter");
  selCategory.id = "category";
  selCategory.addEventListener("change",filtrar);
  
  const totalCategories = data.elements.map(element => element.category);
  const categories = [...new Set(totalCategories)];//Quitamos duplicados
  categories.unshift("All");//añadimos al principio la opción de todos

  for (const category of categories) {
    const option = document.createElement("option");
    option.text = category;
    option.name = category;
    selCategory.append(option);
  }

  filter.append(litCategory);
  filter.append(selCategory);
  
}


const cargarFiltroFase = () => {
  const filter = document.querySelector(".filter");
  const litPhase = document.createElement("label");
  const selPhase = document.createElement("select");

  litPhase.textContent = "Phase";
  litPhase.for = "phase";
  selPhase.classList.add("inputFilter");
  selPhase.id = "phase";
  selPhase.addEventListener("change",filtrar);
  
  const totalPhases = data.elements.map(element => element.phase);
  const phases = [...new Set(totalPhases)];//Quitamos duplicados
  phases.unshift("All");//añadimos al principio la opción de todos

  for (const phase of phases) {
    const option = document.createElement("option");
    option.text = phase;
    option.name = phase;
    selPhase.append(option);
  }

  filter.append(litPhase);
  filter.append(selPhase);
  
}

const cargarFiltroAtomicMass = () => {

  const filter = document.querySelector(".filter");
  const litAM = document.createElement("label");
  const inputAM = document.createElement("input");

  litAM.textContent = "Maximum atomic mass ";
  litAM.for = "atomicMass";
  inputAM.type = "Number";
  inputAM.id = "inputAM";
  inputAM.addEventListener("keyup",filtrar);
  inputAM.classList.add("inputFilter");

  filter.append(litAM);
  filter.append(inputAM);
}

const cargarBotonLimpiar = () => {
  const filter = document.querySelector(".filter");
  const btLimpiarFiltros = document.createElement("button");
  btLimpiarFiltros.textContent = "Reset";
  btLimpiarFiltros.addEventListener("click",limpiarFiltros);
  btLimpiarFiltros.classList.add("inputFilter");
  filter.append(btLimpiarFiltros);
}

const filtrar = (event) => {
  const selCategory = document.querySelector("#category");
  const valCategory = selCategory.value;
  const searchByCategory = valCategory != "All";

  const inpAM = document.querySelector("#inputAM");
  const valAM = Number(inpAM.value);
  const searchByAM = valAM > 0;

  const selPhase = document.querySelector("#phase");
  const valPhase= selPhase.value;
  const searchByPhase = valPhase != "All";


  let filteredElements = data.elements;

  if (searchByAM){
    filteredElements = filteredElements.filter(element => valAM >= Number(element.atomic_mass));
  }
  if (searchByCategory){
    filteredElements = filteredElements.filter(element => valCategory === element.category);
  }
  if (searchByPhase){
    filteredElements = filteredElements.filter(element => valPhase === element.phase);
  }
  pintarTabla(data.elements);

  pintarElementos(filteredElements);
  seleccionarElementos(filteredElements);
}


const limpiarFiltros = (event) => {
  const categorias = document.querySelector("#category");
  const massAtomic = document.querySelector("#inputAM");
  const phases = document.querySelector("#phase");

  categorias.value = "All";
  massAtomic.value = 0;
  phases.value = "All";
  
  pintarElementos(data.elements);
}


// onLoad
cargarCabeceraFiltro();
pintarElementos(data.elements);
cargarFiltroCategoria();
cargarFiltroAtomicMass();
cargarFiltroFase();
cargarBotonLimpiar();
pintarTabla(data.elements);
const symbol = document.querySelector(".symbol");
symbol.style.backgroundColor = "white";