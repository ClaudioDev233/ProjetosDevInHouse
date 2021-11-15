
var listaTarefas =[]
var listaTarefas = RecebeDoLocalStorage("Tarefa")


function Carrega(){
 for (let index = 0; index < listaTarefas.length; index++) {
   CriarLinha(listaTarefas[index])
 }
}

function GravaTarefa(){
    var listaTarefasArray = RecebeDoLocalStorage("Tarefa")
    var tarefaInput = document.getElementById("digite").value
    var numeroDeTarefas = 0;
    if(listaTarefasArray != []){
       numeroDeTarefas = listaTarefasArray.length +1
    }
    


    var tarefa = new Object
    tarefa.digitado = tarefaInput;
    tarefa.id = numeroDeTarefas;
    tarefa.status = 1;

    listaTarefasArray.push(tarefa)
    
    
    EnviaProLocalStorage("Tarefa",listaTarefasArray)
    CriarLinha(tarefa)
    LimparInput()
}
function MarcarFeito(id){
    var listaTarefasArray = RecebeDoLocalStorage("Tarefa")
    var elementoClicadoRiscado = document.getElementById(id)
    console.log(listaTarefasArray[id -1])
    if(listaTarefasArray[id -1].status == 1){
        elementoClicadoRiscado.classList.add("riscaTexto")
        listaTarefasArray[id -1].status = 2
    }else{
    listaTarefasArray[id -1].status = 1
    elementoClicadoRiscado.classList.remove("riscaTexto")
    }
    EnviaProLocalStorage("Tarefa",listaTarefasArray)
}

function CriarLinha(tarefa){
    var inicioLista = document.getElementById("lista")
    var criaLinha = document.createElement("li")
    criaLinha.id = tarefa.id
    if(tarefa.status == 1){
    criaLinha.innerHTML = 
    `<label>
        <input type="checkbox" id ="check" onclick="MarcarFeito(${tarefa.id})">
        <span class="texto" > ${tarefa.digitado} </span>
    </label>
    <span class="borracha" data-id=${tarefa.id} onClick ="Apagar(this)">
    <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/45/000000/external-eraser-graphic-design-justicon-lineal-color-justicon.png"/>`
    }else{
        criaLinha.classList.add("riscaTexto")
        criaLinha.innerHTML = 
    `
    <label>
        <input type="checkbox" id ="check" onclick="MarcarFeito(${tarefa.id})" checked>
        <span class="texto"> ${tarefa.digitado} </span>
    </label>
    <span class="borracha" data-id=${tarefa.id} onClick ="Apagar(this)">
    <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/45/000000/external-eraser-graphic-design-justicon-lineal-color-justicon.png"/>`

    }
     
    inicioLista.appendChild(criaLinha)
    
}
function LimparInput(){
    var oQueLimpar = document.getElementById("digite");
    oQueLimpar.value = "";
}

function Apagar(event) {
var atributoLinhaExcluido = parseInt(event.getAttribute("data-id"))
var oQueExclui = document.getElementById(atributoLinhaExcluido)
    var desejaExcluir = confirm("Deseja Excluir?")
    if(desejaExcluir == true){
        oQueExclui.remove()        
    } else{
        console.log("Não Apaga")
    }
  var listaTarefasArray = RecebeDoLocalStorage("Tarefa")
  listaTarefasArray.splice((atributoLinhaExcluido-1), 1)
  EnviaProLocalStorage("Tarefa", listaTarefasArray)  
}

function EnviaProLocalStorage(key,obj){
 localStorage.setItem(key, JSON.stringify(obj))
}

function RecebeDoLocalStorage(key){
    var recebeLocalStorage = localStorage.getItem(key)
    var transformarEmObj = JSON.parse(recebeLocalStorage)
    transformarEmObj = transformarEmObj == null? [] : transformarEmObj
    return transformarEmObj
}

 

