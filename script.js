// DECLARAÇÂO DAS VARIAVEIS
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// FUNÇÂO PARA ABRIR A MODAL
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
// QUNADO FOR EDIÇAO
  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
    // SE NÂO CARREGA EM BRANCO
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}
// FUNÇAO DE EDIÇAO
function editItem(index) {

  openModal(true, index)
}

// FUNÇÂO DE DELEÇAO
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD() //atualizar o banco
  loadItens() //carregar novamentos os itens em tela
}

// FUNÇÂO PARA INSERIR ITENS
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// EVENTO DE ONCLICK no botao SALVAR, DENTRO DO MODAL
btnSalvar.onclick = e => {
  
  // VALIDAÇÂO PARA ESPAÇOS VAZIOS
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }
// ATUALIZAR O BANCO, SEJA EDIÇÂO OU EXCLUSÂO
  setItensBD()

  // REMOVER A CLASSE ACTIVE
  modal.classList.remove('active')
  loadItens() //atualizar o grid
  id = undefined
}
// FUNÇÂO QUE VAI SER  EXECUTADA ASSIM QUE A TELA FOR CARREGADA
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

// FUNÇOES PARA PEGAR OS ITENS DO BANCO
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
