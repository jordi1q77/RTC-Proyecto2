import './style.css';
import data from './elements.json';
const categories = ["All"];
let categoria = "All";
let atomicMass = 999999.9999;

const annadirElemento = (ul,element) => {

  const li = document.createElement("li");
  li.classList.add ("element");
  const title = document.createElement("h2");
  title.textContent = element.name;
  title.classList.add("element-name");
  
  const figure = document.createElement("figure");
  const div = document.createElement("div");
  div.classList.add("image-element");
  const img = document.createElement("img");
  img.src = element.image.url;
  img.alt = element.title;

  li.appendChild(title);
  div.appendChild(img);

  const span1 = document.createElement("span");
  span1.textContent = element.symbol;
  span1.classList.add("symbol");
  div.appendChild(span1);
  const span2 = document.createElement("span");
  span2.classList.add("atomic-mass");
  span2.textContent = element.atomic_mass;
  div.appendChild(span2);

  figure.appendChild(div);
    
   /* const summary = document.createElement("p");
    summary.textContent = element.summary;
    figcaption.appendChild(title);
    figcaption.appendChild(summary);
    figure.appendChild(figcaption);*/
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
  console.log("AM: " + searchByAM + "Category: " + searchByCategory);
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
    //&& (valAM >= Number(element.atomic_mass))) 
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
  console.log("hola!!");
  const categorias = document.querySelector("#category");
  const massAtomic = document.querySelector("#inputAM");
  console.log("hola!!");
  categorias.value = "All";
  massAtomic.value = 0;
  pintarAll();
}


// onLoad
pintarAll();
cargarFiltros();
