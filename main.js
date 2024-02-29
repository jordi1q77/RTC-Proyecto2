import './style.css';
/*import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
*/
import data from './elements.json';
const categories = ["All"];
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


const annadirElemento = (ul,element) => {
  const {name, atomic_mass, symbol} = element;
  const {title:title_img, url: url_img} = element.image;
  const li = document.createElement("li");
  li.classList.add ("element");
  const title = document.createElement("h2");
  title.textContent = name;
  title.classList.add("element-name");
  
  const figure = document.createElement("figure");
  const div = document.createElement("div");
  div.classList.add("image-element");
  const img = document.createElement("img");
  img.src = url_img;
  img.alt = title_img;

  li.appendChild(title);
  div.appendChild(img);

  const span1 = document.createElement("span");
  span1.textContent = symbol;
  span1.classList.add("symbol");
  div.appendChild(span1);
  const span2 = document.createElement("span");
  span2.classList.add("atomic-mass");
  span2.textContent = atomic_mass;
  div.appendChild(span2);

  figure.appendChild(div);
    
    li.append(figure);
  ul.append(li);
}
const pintarAll = () => {
  const elements = data.elements;

  const ul = document.querySelector(".elements");
  for (const element of elements) {
  //vemos cuantas categorias exiten
    if (!categories.includes(element.category)){
      categories.push(element.category);
    }
  //pintamos
   annadirElemento(ul,element);
  }
}
const cargarFiltros = () => {
  const filter = document.querySelector(".filter");
  const filterTitle = document.createElement("H1");
  filterTitle.textContent = "Periodic table";
  filter.append(filterTitle);
  const litCategory = document.createElement("label");
  litCategory.textContent = "Categories";
  litCategory.for = "category";
  filter.append(litCategory);
  const selCategory = document.createElement("select");
  selCategory.classList.add("inputFilter");
  selCategory.id = "category";
  selCategory.addEventListener("change",filtrar);
  for (const category of categories) {
    const option = document.createElement("option");
    option.text = category;
    option.name = category;
    selCategory.append(option);
  }
  filter.append(selCategory);


  const litAM = document.createElement("label");
  litAM.textContent = "Maximum atomic mass ";
  litAM.for = "atomicMass";
  filter.append(litAM);
  const inputAM = document.createElement("input");
  inputAM.type = "Number";
  inputAM.id = "inputAM";
  inputAM.addEventListener("keyup",filtrar);
  inputAM.classList.add("inputFilter");
  filter.append(inputAM);

  const btLimpiarFiltros = document.createElement("button");
  btLimpiarFiltros.textContent = "Limpiar Filtros";
  btLimpiarFiltros.addEventListener("click",limpiarFiltros);
  btLimpiarFiltros.classList.add("inputFilter");
  filter.append(btLimpiarFiltros);
}

const filtrar = (event) => {
  const selCategory = document.querySelector("#category");
  const valCategory = selCategory.value;
  const inpAM = document.querySelector("#inputAM");
  const valAM = Number(inpAM.value);
  const ul = document.querySelector(".elements");
  const searchByCategory = valCategory != "All";
  const searchByAM = valAM > 0;
  const elements = data.elements;
  ul.innerHTML = "";
  //console.log("AM: " + searchByAM + "Category: " + searchByCategory);
  if (!searchByAM && !searchByCategory){
    pintarAll();
  }else if (searchByAM && searchByCategory){
    elements.forEach((element) => {
      //console.log(element.atomic_mass);
      if ((valCategory === element.category)
      && (valAM >= Number(element.atomic_mass))) {
        annadirElemento(ul,element);
      } 
    })
  }else if (searchByAM) {
    elements.forEach((element) => {
      if (valAM >= Number(element.atomic_mass)){
        annadirElemento(ul,element);
      }});
  }else{
    elements.forEach((element) => {
      if (valCategory === element.category){
        annadirElemento(ul,element);
      }});
  }
}


const limpiarFiltros = (event) => {
  const categorias = document.querySelector("#category");
  const massAtomic = document.querySelector("#inputAM");
  categorias.value = "All";
  massAtomic.value = 0;
  pintarAll();
}


// onLoad
pintarAll();
cargarFiltros();