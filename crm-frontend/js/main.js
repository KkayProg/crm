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

// 
let $search = document.querySelector('#search')

console.log($search.value);

// modal window
const $modal = document.querySelector('#modal');
const $btn = document.querySelector('#openModal');
// const close = document.querySelector('.close');

// добавить клиента
$btn.addEventListener('click', function () {
    clientModal()
})


// поиск клиента
let $searchInput = document.getElementById('search');

function filter(arr, value) {
    let result = [];
    // Преобразуем искомое значение в нижний регистр
    let searchQuery = value.toLowerCase().trim();

    for (const client of arr) {
        // Собираем полное имя клиента и приводим его к нижнему регистру
        let fullName = `${client.surname} ${client.name} ${client.lastName}`.toLowerCase();

        // Проверяем, содержит ли полное имя искомую строку
        if (fullName.includes(searchQuery)) {
            result.push(client);
        }
    }
    console.log(result);
    return result;
}

let searchTimeout; // Хранит идентификатор таймера
$searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout); // Отменяем предыдущий таймер, если он был установлен
    searchTimeout = setTimeout(function () {
        render(filter(clientsList, $searchInput.value));
    }, 300);
});

let dir = false; // Объявляем переменную dir и инициализируем её значением false

function getSortClientsId(id, dir) {
    const clientsCopy = [...clientsList];
    console.log(clientsCopy);
    return clientsCopy.sort(function (clientA, clientB) {
        if ((!dir ? clientA[id] < clientB[id] : clientA[id] > clientB[id]))
            return -1;
    });
}
// Функция для изменения направления сортировки
function toggleSortDirection() {
    dir = !dir; // Инвертируем текущее значение направления сортировки
    console.log(dir);
}

const $thId = document.getElementById('thId');
$thId.addEventListener('click', function () {
    toggleSortDirection(); // Вызываем функцию для изменения направления сортировки
    render(getSortClientsId('id', dir)); // Передаём новое значение dir в функцию сортировки
    if (dir) {
        $thId.style.backgroundImage = 'url(../img/downArrow.svg)';
    } else {
        $thId.style.backgroundImage = 'url(../img/id.svg)';
    }
});

const $thFio = document.getElementById('thFio');
$thFio.addEventListener('click', function () {
    toggleSortDirection(); // Вызываем функцию для изменения направления сортировки
    render(getSortClientsId('surname', dir)); // Передаём новое значение dir в функцию сортировки
    if (dir) {
        $thFio.style.backgroundImage = 'url(../img/fio.svg)';
    } else {
        $thFio.style.backgroundImage = 'url(../img/downArrowfio.svg)';
    }
});

const $thcreatedAt = document.getElementById('thcreatedAt');
$thcreatedAt.addEventListener('click', function () {
    toggleSortDirection(); // Вызываем функцию для изменения направления сортировки
    render(getSortClientsId('createdAt', dir)); // Передаём новое значение dir в функцию сортировки
    if (dir) {
        $thcreatedAt.style.backgroundImage = 'url(../img/downArrow.svg)';
    } else {
        $thcreatedAt.style.backgroundImage = 'url(../img/id.svg)';
    }
});

const $thupdatedAt = document.getElementById('thupdatedAt');
$thupdatedAt.addEventListener('click', function () {
    toggleSortDirection(); // Вызываем функцию для изменения направления сортировки
    render(getSortClientsId('updatedAt', dir)); // Передаём новое значение dir в функцию сортировки
    if (dir) {
        $thupdatedAt.style.backgroundImage = 'url(../img/id.svg)';
    } else {
        $thupdatedAt.style.backgroundImage = 'url(../img/downArrow.svg)';
    }
});



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
        modalDelClient($clientTr, client)
    }

    // нажать на кнопку "изменить" (открытие модального окна)
    // изменить клиента
    $changeTd.onclick = function () {
        clientModal($clientTr, client); // Передаем $clientTr
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

    // Проверяем количество контактов
    if (client.contacts.length > 5) {
        // Если контактов больше 5, выводим первые 4 и показываем количество оставшихся контактов
        client.contacts.slice(0, 4).forEach(contact => {
            appendContactIcon(contact, $contactsTd);
        });

        // Создаем элемент, который будет показывать количество оставшихся контактов
        const $remainingContacts = document.createElement('span');
        $remainingContacts.classList.add('remainingContacts');
        $remainingContacts.textContent = `+${client.contacts.length - 4}`;
        $contactsTd.append($remainingContacts);
    } else {
        // Если контактов 5 или меньше, выводим все
        client.contacts.forEach(contact => {
            appendContactIcon(contact, $contactsTd);
        });
    }

    // Добавляем img в DOM
    function appendContactIcon(contact, container) {
        let img = null;
        switch (contact.type) {
            case 'Телефон':
                img = imgPhone.cloneNode(true);
                break;
            case 'email':
                img = imgEmail.cloneNode(true);
                break;
            case 'vk':
                img = imgVK.cloneNode(true);
                break;
            case 'facebook':
                img = imgFacebook.cloneNode(true);
                break;
            default:
                img = imgOther.cloneNode(true);
        }

        // Создаем контейнер для иконки и подсказки
        let iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.style.position = 'relative';
        iconContainer.style.display = 'inline-block';

        // Создаем элемент подсказки
        let tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = `${contact.type}: <a href="#" class="tooltip-link">${contact.value}</a>`;
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%'; // Подсказка будет над иконкой
        tooltip.style.left = '50%'; // Центрирование по горизонтали
        tooltip.style.transform = 'translateX(-50%)'; // Точное центрирование
        tooltip.style.visibility = 'hidden'; // Скрыть до наведения
        tooltip.style.pointerEvents = 'none'; // Позволяет кликать сквозь подсказку

        // Добавляем стили для подсказки (пример)
        tooltip.style.background = 'black';
        tooltip.style.color = 'white';
        tooltip.style.padding = '7px 18px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.fontSize = '12px';

        // Показываем и скрываем подсказку при наведении
        iconContainer.addEventListener('mouseenter', () => {
            tooltip.style.visibility = 'visible';
        });
        iconContainer.addEventListener('mouseleave', () => {
            tooltip.style.visibility = 'hidden';
        });

        iconContainer.appendChild(img);
        iconContainer.appendChild(tooltip);
        container.appendChild(iconContainer);
    }



    $clientTr.append($IDTd, $fioTd, $dateCreareTd, $lastChangeTd, $contactsTd, $activityTd)
    $dateCreareTd.append($dateCreareMinutesCreateTd)
    $lastChangeTd.append($dateCreareMinutesChangeTd)
    $activityTd.append($changeTd, $deleteTd)

    return $clientTr
}

// модальное окно удаления клиента
const $modalDelete = document.querySelector('#modalDelete');

function modalDelClient($clientTr, client) {
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
        if ($clientTr) {
            $clientTr.remove(); // Удаляем $clientTr, если он передан
        }
    }
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

function render(arr) {
    $tbody.innerHTML = ''
    for (const i of arr) {
        $tbody.append(newClientTr(i, $tbody)); // Передаем $tbody в newClientTr
    }
}

let $clienstTable = document.getElementById('clients__thead')
let renderTimeout; // хранениу идентификатора таймера

// Отменяем предыдущий таймер, если он был установлен
clearTimeout(renderTimeout);

// Устанавливаем новый таймер
renderTimeout = setTimeout(function () {
    // $clienstTable.style.display = 'none'
    const $loader = document.querySelector('.loader');
    if ($loader) {
        $loader.style.display = 'none';
        console.log('проверка');
        // $clienstTable.style.display = 'table-header-group'
    }
    render(clientsList); // Убедитесь, что clientsList доступен и содержит данные
}, 500);



function clientModal($clientTr, client = null) {
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
    $surnameInput.placeholder = 'Фамилия*'
    $surnameInput.classList.add('modalName')
    $surnameInput.required = true
    let $nameInput = document.createElement('input') // имя
    $nameInput.placeholder = 'Имя*'
    $nameInput.classList.add('modalName')
    $nameInput.required = true
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
    $divOpenContacts.style.padding = '0 30px'
    // кнопка открытия добавления контактов
    const $btnOpenContacts = document.createElement('div')
    $btnOpenContacts.textContent = 'Добавить контакт'
    $btnOpenContacts.classList.add('btnOpenContacts')

    $modal.append($modalDiv)
    $modalDiv.append($modalDivFio, $divOpenContacts, $modalSaveButton, $modalCloseButton, $modalDelP)
    $modalDivFio.append($modalTitile, $surnameInput, $nameInput, $lastnameInput)
    $divOpenContacts.append($btnOpenContacts)

    // кнопка по добавлению контакта
    $btnOpenContacts.addEventListener('click', function () {
        console.log($divOpenContacts.childNodes.length);
        if ($divOpenContacts.childNodes.length >= 11) {
            $btnOpenContacts.style.display = 'none'
            const $errorMessageNum = document.createElement('p');
            $errorMessageNum.classList.add('errorMessageNum');
            $errorMessageNum.textContent = 'Ошибка: недопустимое количество контактов';
            $modalDiv.insertBefore($errorMessageNum, $modalSaveButton);
        } else {
            createFormModal($divOpenContacts, $btnOpenContacts)
            $divOpenContacts.style.padding = '25px 30px';
        }
    })

    // закрытие модального окнда добавления клиента через кнопку крестика
    $modalCloseButton.addEventListener('click', function () {
        $modal.style.display = 'none';
    })

    // закрытие модального окнда добавления клиента через кнопки отмена
    $modalDelP.addEventListener('click', function () {
        $modal.style.display = 'none';
    })

    $modalSaveButton.addEventListener('click', async function () {
        let clientServer = {
            name: $nameInput.value,
            surname: $surnameInput.value,
            lastName: $lastnameInput.value,
            contacts: []
        };

        for (const child of $modalDiv.querySelectorAll('.styleInput')) {
            if (child.querySelector('input').value !== '' && $surnameInput.value !== '' && $nameInput.value !== '') {
                clientServer.contacts.push({
                    type: child.querySelector('select').value,
                    value: child.querySelector('input').value
                })
            } else {
                // Проверяем, существует ли уже сообщение об ошибке
                let existingErrorMessage = document.querySelector('.errorMessage');
                if (!existingErrorMessage) {
                    const $errorMessage = document.createElement('p');
                    $errorMessage.classList.add('errorMessage');
                    $errorMessage.textContent = 'Ошибка: заполнены не все обязательные поля';
                    $modalDiv.insertBefore($errorMessage, $modalSaveButton);
                }
                return;
            }
        }

        if (client) {
            // Редактирование существующего клиента на сервере
            const newData = {
                id: client.id,
                name: clientServer.name,
                surname: clientServer.surname,
                lastName: clientServer.lastName,
                contacts: clientServer.contacts
            };
            await serverChangeStudent(newData);
        } else {
            // Добавление нового клиента на сервер
            await serverAddStudent(clientServer);
        }
        // Получение актуальных данных о клиентах с сервера
        clientsList = await serverGetStudent();

        // Перерисовка таблицы с новыми данными
        render(clientsList);
        $modal.style.display = 'none';
    });


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
        $lastnameInputAbove.textContent = 'Отчество';
        $lastnameInputAbove.classList = 'surnameInputAbove';
        $lastnameInput.value = client.lastName;
        $lastnameInput.classList.add('modalNameChange');

        $modalDivFio.insertBefore($surnameInputAbove, $surnameInput)
        $modalDivFio.insertBefore($nameInputAbove, $nameInput)
        $modalDivFio.insertBefore($lastnameInputAbove, $lastnameInput)
        $divOpenContacts.style.padding = '25px 30px';

        $modalDelP.textContent = 'Удалить клиента';
        $modalDelP.addEventListener('click', function () {
            modalDelClient($clientTr, client)
            // $modal.style.display = 'none';
        })

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
}