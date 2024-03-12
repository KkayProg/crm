const SERVER_URL = 'http://localhost:3000';

// получаем списoк клиентов, которые есть на сервере
async function serverGetStudent() {
    let respons = await fetch(SERVER_URL + '/api/clients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let data = await respons.json()

    return data;
}

let serverData = await serverGetStudent();



// добавление нового клиента на сервер
async function serverAddStudent(obj) {
    const respons = await fetch(SERVER_URL + '/api/clients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
    })

    let data = await respons.json()
    return data
}

// удаление клиента с сервера
async function serverDelStudent(id) {
    const respons = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: 'DELETE',
    })
    let data = await respons.json()
    return data
}

// редактирование клиента на сервере
async function serverShangeStudent(id) {
    const respons = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: 'PATCH',
    })
    let data = await respons.json()
    return data
}


let clientsList = serverData
console.log(clientsList);

function clientFio(client) {
    let fio = client.surname + ' ' + client.name + ' ' + client.lastName
    return fio;
}

//проеобразование формата даты 
function getСorrectDateformat(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy + ' ';
}
function getСorrectDateformatMinutes(date) {
    let $DateColor = document.createElement('div')
    $DateColor.classList.add('hours')
    let hh = date.getHours();
    let mimi = date.getMinutes();
    if (mimi < 10) mimi = '0' + mimi;
    if (hh < 10) hh = '0' + hh;
    $DateColor.textContent = hh + ':' + mimi;
    return $DateColor
}


// создание строки и запись туда данных
function newClientTr(client) {
    let $clientTr = document.createElement('tr'),
        $IDTd = document.createElement('td'),
        $fioTd = document.createElement('td'),
        $dateCreareTd = document.createElement('td'),
        $lastChangeTd = document.createElement('td'),
        $dateCreareMinutesCreateTd = document.createElement('div'),
        $dateCreareMinutesChangeTd = document.createElement('div'),
        $contactsTd = document.createElement('td'),
        $activityTd = document.createElement('td'),
        $changeTd = document.createElement('button'),
        $deleteTd = document.createElement('button') // 

    $changeTd.classList.add('btn', 'btnChange')
    $changeTd.style.backgroundColor = 'white'
    $changeTd.textContent = 'Изменить'
    $changeTd.style.marginRight = '30px'

    $deleteTd.classList.add('btn', 'btnDelete')
    $deleteTd.style.backgroundColor = 'white'
    $deleteTd.textContent = 'Удалить'

    // нажать на кнопку "удалить" (открытие модального окна)
    $deleteTd.onclick = function () {
        modalDelClient()
    }

    // нажать на кнопку "изменить" (открытие модального окна)
    $changeTd.onclick = function () {
        modalChangeClient()
    }

    $clientTr.style.backgroundColor = 'white'
    $clientTr.style.border = 'none'
    $clientTr.style.borderBottom = '1px solid #C8C5D1'

    // запись данных
    $IDTd.textContent = client.id
    $fioTd.textContent = clientFio(client)
    $lastChangeTd.textContent = getСorrectDateformat(new Date(client.updatedAt))
    $dateCreareTd.textContent = getСorrectDateformat(new Date(client.createdAt))
    $dateCreareMinutesCreateTd = getСorrectDateformatMinutes(new Date(client.createdAt))
    $dateCreareMinutesChangeTd = getСorrectDateformatMinutes(new Date(client.updatedAt))


    $clientTr.append($IDTd)
    $clientTr.append($fioTd)
    $clientTr.append($dateCreareTd)
    $dateCreareTd.append($dateCreareMinutesCreateTd)
    $clientTr.append($lastChangeTd)
    $lastChangeTd.append($dateCreareMinutesChangeTd)
    $clientTr.append($contactsTd)
    $clientTr.append($activityTd)
    $activityTd.append($changeTd)
    $activityTd.append($deleteTd)


    /////////// модальное окно удаления клиента
    const $modalDelete = document.querySelector('#modalDelete');

    function modalDelClient() {
        $modalDelete.style.display = 'block';
        const $modalDeleteActive = document.createElement('div')
        $modalDeleteActive.classList.add('modalDeleteActive')
        const $modalDeleteH1 = document.createElement('h1')
        $modalDeleteH1.textContent = 'Удалить клиента'
        $modalDeleteH1.classList.add('modalDeleteH1')
        const $modalDeleteP = document.createElement('p')
        $modalDeleteP.textContent = 'Вы действительно хотите удалить данного клиента?'
        $modalDeleteP.classList.add('modalDeleteP')
        const $modalDeleteClose = document.createElement('div')
        $modalDeleteClose.classList.add('modalCloseButton')
        const $modalDeleteButton = document.createElement('button')
        $modalDeleteButton.classList.add('btnSave')
        $modalDeleteButton.textContent = 'Удалить'
        const $modalDeleteCancel = document.createElement('p') // конпка отмены
        $modalDeleteCancel.textContent = 'Отмена'
        $modalDeleteCancel.classList.add('modalDeleteCancel')

        $modalDelete.append($modalDeleteActive)
        $modalDeleteActive.append($modalDeleteH1)
        $modalDeleteActive.append($modalDeleteP)
        $modalDeleteActive.append($modalDeleteClose)
        $modalDeleteActive.append($modalDeleteButton)
        $modalDeleteActive.append($modalDeleteCancel)

        // закрыть окно нажав на крестик
        $modalDeleteClose.onclick = function () {
            $modalDelete.style.display = 'none';
        }

        // закрытие окна нажав на "отмена"
        $modalDeleteCancel.onclick = function () {
            $modalDelete.style.display = 'none';
        }

        // закрыть окно нажав мимо него
        window.onclick = function (event) {
            if (event.target == $modalDelete) {
                $modalDelete.style.display = 'none';
            }
        };

        $modalDeleteButton.onclick = async function () {
            await serverDelStudent(client.id)
            $modalDelete.style.display = 'none';
            $clientTr.remove()
        }
    }

    /////////// модальное окно изменения клиента
    const $modalChange = document.querySelector('#modalChange');

    function modalChangeClient() {
        $modalChange.style.display = 'block';
        const $modalChangeActive = document.createElement('div')
        $modalChangeActive.classList.add('modalChangeActive')
        const $modalChangeClose = document.createElement('div') // кнопка крестика
        $modalChangeClose.classList.add('modalCloseButton')
        const $modalChangeTitle = document.createElement('div')
        $modalChangeTitle.classList.add('flex')
        const $modalChangeH1 = document.createElement('h1') // h1 Изменить данные
        $modalChangeH1.textContent = 'Изменить данные'
        $modalChangeH1.classList.add('modalChangeH1')
        let $modalChangePID = document.createElement('p') // ID клиента справа от "Изменить данные"
        $modalChangePID.classList.add('modalChangePID')
        $modalChangePID.textContent = 'ID: ' + client.id // здесь будет передаваться ID клиента
        let $surnameInputAbove = document.createElement('p') // фамилия пометка
        $surnameInputAbove.textContent = 'Фамилия*'
        $surnameInputAbove.classList = 'surnameInputAbove'
        let $surnameInput = document.createElement('input') // фамилия
        $surnameInput.value = client.surname
        $surnameInput.classList.add('modalNameChange')
        let $nameInputAbove = document.createElement('p') // имя пометка
        $nameInputAbove.textContent = 'Имя*'
        $nameInputAbove.classList = 'surnameInputAbove'
        let $nameInput = document.createElement('input') // имя
        $nameInput.value = client.name
        $nameInput.classList.add('modalNameChange')
        let $lastnameInputAbove = document.createElement('p') // отчество поментка
        $lastnameInputAbove.textContent = 'Отчество*'
        $lastnameInputAbove.classList = 'surnameInputAbove'
        let $lastnameInput = document.createElement('input') // отчество 
        $lastnameInput.value = client.lastName
        $lastnameInput.classList.add('modalNameChange')

        const $modalChangeSaveButton = document.createElement('button') // кнопка сохранения
        $modalChangeSaveButton.classList.add('btnSave')
        $modalChangeSaveButton.textContent = 'Сохранить'

        $modalChange.append($modalChangeActive)
        $modalChangeActive.append($modalChangeClose)
        $modalChangeActive.append($modalChangeTitle)
        $modalChangeTitle.append($modalChangeH1)
        $modalChangeTitle.append($modalChangePID)
        $modalChangeActive.append($surnameInputAbove)
        $modalChangeActive.append($surnameInput)
        $modalChangeActive.append($nameInputAbove)
        $modalChangeActive.append($nameInput)
        $modalChangeActive.append($lastnameInputAbove)
        $modalChangeActive.append($lastnameInput)
        $modalChangeActive.append($modalChangeSaveButton)

        // закрыть окно нажав на крестик
        $modalChangeClose.onclick = function () {
            $modalChange.style.display = 'none';
        }

        // закрыть окно нажав мимо него
        window.onclick = function (event) {
            if (event.target == $modalChange) {
                $modalChange.style.display = 'none';
            }
        };

        // ЭТО НЕ РАБОТЕТ :(
        // $modalChangeSaveButton.onclick = async function () {
        //     await serverShangeStudent(client.id)
        //     $modalChange.style.display = 'none';
        //     $clientTr.remove()
        // }
    }

    return $clientTr
}


// modal window
const $modal = document.querySelector('#modal');
const $btn = document.querySelector('#openModal');
// const close = document.querySelector('.close');


// окно для добавления клиента
$btn.onclick = function () {
    $modal.style.display = 'block';

    // построение модального окна для добавления клиента
    let $modalDiv = document.createElement('div')
    $modalDiv.style.width = '400px'
    $modalDiv.style.minHeight = '450px'
    $modalDiv.style.backgroundColor = 'white'
    $modalDiv.style.position = 'absolute'
    $modalDiv.style.left = '50%'
    $modalDiv.style.top = '50%'
    $modalDiv.style.transform = 'translate(-50%, -50%)'
    $modalDiv.style.padding = '24px 30px'

    let $modalTitile = document.createElement('h2')
    $modalTitile.textContent = 'Новый клиент'
    $modalTitile.style.fontSize = '18px'
    $modalTitile.style.marginBottom = '32px'


    let $surnameInput = document.createElement('input') // фамилия
    $surnameInput.placeholder = 'Фамилия'
    $surnameInput.classList.add('modalName')
    let $nameInput = document.createElement('input') // имя
    $nameInput.placeholder = 'Имя'
    $nameInput.classList.add('modalName')
    let $lastnameInput = document.createElement('input') // отчество 
    $lastnameInput.placeholder = 'Отчество'
    $lastnameInput.classList.add('modalName')

    //
    let $modalCloseButton = document.createElement('div')
    $modalCloseButton.classList.add('modalCloseButton')

    // кнопка сохранения 
    let $modalSaveButton = document.createElement('button')
    $modalSaveButton.textContent = 'Сохранить'
    $modalSaveButton.classList.add('btnSave')

    $modal.append($modalDiv)
    $modalDiv.append($modalTitile)
    $modalDiv.append($surnameInput)
    $modalDiv.append($nameInput)
    $modalDiv.append($lastnameInput)
    $modalDiv.append($modalSaveButton)
    $modalDiv.append($modalCloseButton)

    $modalSaveButton.onclick = async function () {
        let clientServer = {
            name: $nameInput.value,
            surname: $surnameInput.value,
            lastName: $lastnameInput.value,
        };
        let serverDataObj = await serverAddStudent(clientServer);

        clientsList.push(
            serverDataObj.name,
            serverDataObj.surname,
            serverDataObj.lastName
        )
        $modal.style.display = 'none';
        location.reload();
    }

    $modalCloseButton.onclick = function () {
        $modal.style.display = 'none';
    }
};

close.onclick = function () {
    $modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == $modal) {
        $modal.style.display = 'none';
    }
};

// появление записей в таблице на сайте
let $tbody = document.getElementById('clients__tbody');

function render() {
    for (const i of clientsList) {
        $tbody.append(newClientTr(i))
    }
}

render()