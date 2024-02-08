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


let clientsList = [serverData]
console.log(clientsList);

function clientFio(client) {
    let fio = client.surname + ' ' + client.name + ' ' + client.lastName
    return fio;
}

// создание строки и запись туда данных
function newClientTr(client) {
    let $clientTr = document.createElement('tr'),
        $IDTd = document.createElement('td'),
        $fioTd = document.createElement('td'),
        $dateCreareTd = document.createElement('td'),
        $lastChangeTd = document.createElement('td'),
        $contactsTd = document.createElement('td'),
        $activityTd = document.createElement('td'),
        $changeTd = document.createElement('button'),
        $deleteTd = document.createElement('button')

    $changeTd.classList.add('btn', 'btnChange')
    $changeTd.style.backgroundColor = 'white'
    $changeTd.textContent = 'Изменить'
    $changeTd.style.marginRight = '30px'

    $deleteTd.classList.add('btn', 'btnDelete')
    $deleteTd.style.backgroundColor = 'white'
    $deleteTd.textContent = 'Удалить'

    $clientTr.style.backgroundColor = 'white'
    $clientTr.style.border = 'none'
    $clientTr.style.borderBottom = '1px solid #C8C5D1'

    // запись данных
    $IDTd.textContent = client.id
    $fioTd.textContent = clientFio(client)
    // $facultyTD.textContent = student.faculty;   createdAt
    $dateCreareTd.textContent = client.createdAt
    // $birthTD.textContent = student.getBirthDateString() + ' (возраст: ' + student.getAge() + ')';
    // $yearsOfStudyTD.textContent = student.studyStart();

    $clientTr.append($IDTd)
    $clientTr.append($fioTd)
    $clientTr.append($dateCreareTd)
    $clientTr.append($lastChangeTd)
    $clientTr.append($contactsTd)
    $clientTr.append($activityTd)
    $activityTd.append($changeTd)
    $activityTd.append($deleteTd)

    return $clientTr;
}


// появление записей в таблице на сайте
let $tbody = document.getElementById('clients__tbody');
$tbody.append(newClientTr(clientsList));


console.log(newClientTr(clientsList));


// modal window
const $modal = document.querySelector('#modal');
const $btn = document.querySelector('#openModal');
// const close = document.querySelector('.close');

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
    $surnameInput.style.width = '390px'
    $surnameInput.style.marginBottom = '32px'
    $surnameInput.style.border = 'none'
    $surnameInput.style.borderBottom = '1px solid grey'
    $surnameInput.style.opacity = '0.5'
    let $nameInput = document.createElement('input') // имя
    $nameInput.placeholder = 'Имя'
    $nameInput.style.width = '390px'
    $nameInput.style.marginBottom = '32px'
    $nameInput.style.border = 'none'
    $nameInput.style.borderBottom = '1px solid grey'
    $nameInput.style.opacity = '0.5'
    let $lastnameInput = document.createElement('input') // отчество 
    $lastnameInput.placeholder = 'Отчество'
    $lastnameInput.style.width = '390px'
    $lastnameInput.style.marginBottom = '32px'
    $lastnameInput.style.border = 'none'
    $lastnameInput.style.borderBottom = '1px solid grey'
    $lastnameInput.style.opacity = '0.5'

    // кнопка сохранения 
    let $modalSaveButton = document.createElement('button')
    $modalSaveButton.textContent = 'Сохранить'
    $modalSaveButton.style.fontSize = '14px'
    $modalSaveButton.style.padding = '12.5px 35px'
    $modalSaveButton.style.backgroundColor = '#9873FF'
    $modalSaveButton.style.border = 'none'
    $modalSaveButton.style.color = 'white'
    $modalSaveButton.style.display = 'block'
    $modalSaveButton.style.margin = '0 auto'


    $modal.append($modalDiv)
    $modalDiv.append($modalTitile)
    $modalDiv.append($surnameInput)
    $modalDiv.append($nameInput)
    $modalDiv.append($lastnameInput)
    $modalDiv.append($modalSaveButton)

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
        // return clientsList
    }
};

console.log(clientsList);

close.onclick = function () {
    $modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == $modal) {
        $modal.style.display = 'none';
    }
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// studentsList.push(new Student(
//   serverDataObj.id,
//   serverDataObj.name,
//   serverDataObj.surname,
//   serverDataObj.lastname,
//   serverDataObj.faculty,
//   new Date(serverDataObj.birthday),
//   serverDataObj.studyStart
// ));
// render();

// await serverGetStudent();