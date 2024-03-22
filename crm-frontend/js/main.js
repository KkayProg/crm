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
async function serverChangeStudent(newData) {
    const respons = await fetch(SERVER_URL + '/api/clients/' + newData.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData), // Передача новых данных клиента в теле запроса
    });
    let data = await respons.json();
    return data;
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

// modal window
const $modal = document.querySelector('#modal');
const $btn = document.querySelector('#openModal');
// const close = document.querySelector('.close');


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
    // изменить клиента
    $changeTd.onclick = function () {
        clientModal(client)
    }
    //добавить клиента
    $btn.onclick = function () {
        clientModal(client = null)
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

    // появление иконок контактов
    const imgPhone = document.createElement("img"),
        imgEmail = document.createElement("img"),
        imgVK = document.createElement("img"),
        imgFacebook = document.createElement("img"),
        imgOther = document.createElement("img");

    // Устанавливаем атрибут src для загрузки SVG файла
    imgPhone.src = "../img/phoneIcon.svg",
        imgEmail.src = "../img/mailIcon.svg",
        imgVK.src = "../img/vkIcon.svg",
        imgFacebook.src = "../img/facebookIcon.svg",
        imgOther.src = "../img/otherIcon.svg"


    // Добавляем img в DOM
    for (const contact of client.contacts) {
        switch (contact.type) {
            case 'Телефон':
                // код, который будет выполнен, если тип контакта - Телефон
                $contactsTd.append(imgPhone)
                break;
            case 'Доп. телефон':
                // код, который будет выполнен, если тип контакта - Доп. телефон
                break;
            case 'email':
                // код, который будет выполнен, если тип контакта - email
                $contactsTd.append(imgEmail)
                break;
            case 'vk':
                // код, который будет выполнен, если тип контакта - vk
                $contactsTd.append(imgVK)
                break;
            case 'facebook':
                // код, который будет выполнен, если тип контакта - facebook
                $contactsTd.append(imgFacebook)
                break;
            default:
                // код, который будет выполнен, если тип контакта не соответствует ни одному из case
        }
    }

    // Добавляем img в DOM
    for (const contact of client.contacts) {
        let img = null;
        switch (contact.type) {
            case 'Телефон':
                img = imgPhone;
                break;
            case 'email':
                img = imgEmail;
                break;
            case 'vk':
                img = imgVK;
                break;
            case 'facebook':
                img = imgFacebook;
                break;
            default:
                img = imgOther;
        }
    }



    $clientTr.append($IDTd, $fioTd, $dateCreareTd, $lastChangeTd, $contactsTd, $activityTd)
    $dateCreareTd.append($dateCreareMinutesCreateTd)
    $lastChangeTd.append($dateCreareMinutesChangeTd)
    $activityTd.append($changeTd, $deleteTd)


    // модальное окно удаления клиента
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
        $modalDeleteActive.append($modalDeleteH1, $modalDeleteP, $modalDeleteClose, $modalDeleteButton, $modalDeleteCancel)

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



    return $clientTr
}

//////////////////////////////////////////////

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
    $tbody.innerHTML = ''
    for (const i of clientsList) {
        $tbody.append(newClientTr(i))
    }
}

render()

function clientModal(client = null) {
    // наполнение модального окна 
    console.log(client);

    // окно для добавления клиента
    $modal.style.display = 'block';

    $modal.innerHTML = '';

    // построение модального окна для добавления клиента
    const $modalDiv = document.createElement('div')
    $modalDiv.classList.add('modalAddDiv')
    const $modalDivFio = document.createElement('div')
    $modalDivFio.classList.add('modalDivFio')

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

    // кнопка закрытия модального окна
    let $modalCloseButton = document.createElement('div')
    $modalCloseButton.classList.add('modalCloseButton')

    // кнопка сохранения 
    const $modalSaveButton = document.createElement('button')
    $modalSaveButton.textContent = 'Сохранить'
    $modalSaveButton.classList.add('btnSave')

    // кнопка удалить клиента 
    const $modalDelP = document.createElement('p')
    $modalDelP.textContent = 'Отмена'
    $modalDelP.classList.add('modalDelP')


    let $divOpenContacts = document.createElement('div')
    $divOpenContacts.classList.add('divOpenContacts')
    $divOpenContacts.style.padding = '0'
    // кнопка открытия добавления контактов
    const $btnOpenContacts = document.createElement('div')
    $btnOpenContacts.textContent = 'Добавить контакт'
    $btnOpenContacts.classList.add('btnOpenContacts')

    $modal.append($modalDiv)
    $modalDiv.append($modalDivFio, $divOpenContacts, $modalSaveButton, $modalCloseButton, $modalDelP)
    $modalDivFio.append($modalTitile, $surnameInput, $nameInput, $lastnameInput)
    $divOpenContacts.append($btnOpenContacts)


    // кнопка по добавлению контакта
    $btnOpenContacts.onclick = function () {
        createFormModal($divOpenContacts, $btnOpenContacts)
        $divOpenContacts.style.padding = '25px 30px';
    }

    // закрытие модального окнда добавления клиента через кнопку крестика
    $modalCloseButton.onclick = function () {
        $modal.style.display = 'none';
    }

    // закрытие модального окнда добавления клиента через кнопки отмена
    $modalDelP.onclick = function () {
        $modal.style.display = 'none';
    }

    $modalSaveButton.onclick = async function () {
        createFormModal($divOpenContacts, $btnOpenContacts, contact.type, contact.value)
        let clientServer = {
            name: $nameInput.value,
            surname: $surnameInput.value,
            lastName: $lastnameInput.value,
            contacts: []
        };

        // for (const child of $form.children) {
        //         clientServer.contacts.push({
        //             type: child.querySelector('select').value,
        //             value: child.querySelector('input').value
        //         })
        // }

        // Добавление нового клиента на сервер
        let serverDataObj = await serverAddStudent(clientServer);

        // Получение актуальных данных о клиентах с сервера
        clientsList = await serverGetStudent();

        // Перерисовка таблицы с новыми данными
        render();

        $modal.style.display = 'none';
        // $form.remove(); // Удаление формы из DOM
    }

    if (client) {
        let $modalChangePID = document.createElement('p'); // ID клиента справа от "Изменить данные"
        $modalChangePID.classList.add('modalChangePID');
        $modalTitile.textContent = 'Изменить данные';
        $modalTitile.classList.add('modalChangeH1');
        $modalChangePID.textContent = 'ID: ' + client.id; // здесь будет передаваться ID клиента
        $modalTitile.append($modalChangePID);

        let $surnameInputAbove = document.createElement('p'); // фамилия пометка
        $surnameInputAbove.textContent = 'Фамилия*';
        $surnameInputAbove.classList = 'surnameInputAbove';
        $surnameInput.value = client.surname;
        $surnameInput.classList.add('modalNameChange');

        let $nameInputAbove = document.createElement('p'); // имя пометка
        $nameInputAbove.textContent = 'Имя*';
        $nameInputAbove.classList = 'surnameInputAbove';
        $nameInput.value = client.name;
        $nameInput.classList.add('modalNameChange');

        let $lastnameInputAbove = document.createElement('p'); // отчество пометка
        $lastnameInputAbove.textContent = 'Отчество*';
        $lastnameInputAbove.classList = 'surnameInputAbove';
        $lastnameInput.value = client.lastName;
        $lastnameInput.classList.add('modalNameChange');

        $modalDivFio.insertBefore($surnameInputAbove, $surnameInput)
        $modalDivFio.insertBefore($nameInputAbove, $nameInput)
        $modalDivFio.insertBefore($lastnameInputAbove, $lastnameInput)
        $divOpenContacts.style.padding = '25px 30px';

        // let clientServer = {
        //     name: $nameInput.value,
        //     surname: $surnameInput.value,
        //     lastName: $lastnameInput.value,
        //     contacts: []
        // };

        // for (const child of $form.children) {
        //     clientServer.contacts.push({
        //         type: child.querySelector('select').value,
        //         value: child.querySelector('input').value
        //     })
        // }

        $modalSaveButton.onclick = async function () {
            let clientServer = {
                name: $nameInput.value,
                surname: $surnameInput.value,
                lastName: $lastnameInput.value,
                contacts: []
            };

            // for (const child of $form.children) {
            //         clientServer.contacts.push({
            //             type: child.querySelector('select').value,
            //             value: child.querySelector('input').value
            //         })
            // }

            // Добавление нового клиента на сервер
            let serverDataObj = await serverAddStudent(clientServer);

            // Получение актуальных данных о клиентах с сервера
            clientsList = await serverGetStudent();

            // Перерисовка таблицы с новыми данными
            render();

            $modal.style.display = 'none';
            // $form.remove(); // Удаление формы из DOM
        }

        for (const contact of client.contacts) {
            createFormModal($divOpenContacts, $btnOpenContacts, contact.type, contact.value)
        }
    }
}

function createFormModal(divOpenContacts, btnOpenContacts, type = null, value = null) {
    // форма по добавлению контактов
    const $form = document.createElement('form'); // Создаем новую форму
    $form.id = 'form__change';
    $form.classList.add('form__change')

    $form.style.display = 'block'
    const $styleInput = document.createElement('div')
    $styleInput.classList.add('styleInput')
    // Создаем выпадающий список
    const select = document.createElement('select');
    select.classList.add('modalSelect')
    select.id = 'contact';
    select.name = 'contact';

    // Создаем опции для выпадающего списка
    const options = ['Телефон', 'Доп. телефон', 'email', 'vk', 'facebook'];
    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue[0].toUpperCase() + optionValue.slice(1); // Первая буква в верхнем регистре
        if (optionValue === type) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    // Создаем текстовое поле
    const inputText = document.createElement('input');
    inputText.classList.add('modalInput')
    inputText.type = 'text';
    inputText.name = 'context';
    inputText.placeholder = 'Введите данные контакта'
    inputText.value = value;

    //
    const $inputCloseBtn = document.createElement('button')
    $inputCloseBtn.classList.add('inputCloseBtn')

    // Создаем кнопку отправки
    // const submitButton = $modalSaveButton;
    // submitButton.type = 'submit';

    // Добавляем элементы в форму
    $form.appendChild($styleInput);
    $styleInput.appendChild(select);
    $styleInput.appendChild(inputText);
    $styleInput.append($inputCloseBtn);
    divOpenContacts.append($form, btnOpenContacts);

    // Удалить инпут из формы
    $inputCloseBtn.onclick = function (event) {
        event.preventDefault()
        $styleInput.remove();
        // Проверяем, остался ли только один ребенок в форме
        if ($form.children.length === 0) {
            $form.remove();
        }
    };

    // $modalSaveButton.onclick = async function () {
    //     let clientServer = {
    //         name: $nameInput.value,
    //         surname: $surnameInput.value,
    //         lastName: $lastnameInput.value,
    //         contacts: []
    //     };

    //     for (const child of $form.children) {
    //         clientServer.contacts.push({
    //             type: child.querySelector('select').value,
    //             value: child.querySelector('input').value
    //         })
    //     }

    //     // Добавление нового клиента на сервер
    //     let serverDataObj = await serverAddStudent(clientServer);

    //     // Получение актуальных данных о клиентах с сервера
    //     clientsList = await serverGetStudent();

    //     // Перерисовка таблицы с новыми данными
    //     render();

    //     $modal.style.display = 'none';
    //     $form.remove(); // Удаление формы из DOM
    // }
}