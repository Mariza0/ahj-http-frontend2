/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/tickets.js
// создание тестовых тикетов при загрузке страницы
const container = document.querySelector(".list-group");
let description;
let nameValue;
function createTickets(json) {
  // проверяем что элемент не существует на формк
  const elementWithId = document.querySelector(`[data-ticket-id="${json.id}"]`);
  //console.log(elementWithId,'elementWithId')
  let description;
  let nameValue;

  // если такой элемент есть, то смотрим есть ли детальное описание. если есть проверяем актуальность
  if (elementWithId) {
    description = elementWithId.querySelector('.description_add');
    if (description) {
      const descriptionActual = json.description;
      if (description.textContent !== descriptionActual) {
        description.textContent = descriptionActual;
      }
    }
    nameValue = elementWithId.querySelector(".ticket-name");
    if (nameValue.textContent !== json.name) {
      nameValue.textContent = json.name;
    }
    description = '';
    nameValue = '';
    return;
  }

  // иначе добавляем новый тикет в список
  let newEl = document.createElement("DIV");
  newEl.className = "ticket";
  newEl.setAttribute("data-ticket-id", json.id);
  // newEl.setAttribute('data-ticket-description', json.description);

  // статус
  let newStatus = document.createElement("input");
  newStatus.type = "checkbox";
  newStatus.checked = json.statusTicket;
  newStatus.style.marginRight = `20px`;
  newStatus.className = "ticket-status ml-3";

  //краткое описание  и детальное
  let newName = document.createElement("div");
  newName.className = "ticket-name";
  newName.style.marginRight = `20px`;
  newName.textContent = json.name;

  // let description = document.createElement("div");
  // description.className = "description disable";
  // description.textContent = json.description;

  // newName.appendChild(description);

  // дата создания
  let newDate = document.createElement("div");
  newDate.className = "ticket-cteate_date";
  newDate.style.marginRight = `20px`;
  // Функция для форматирования чисел с добавлением нуля перед однозначными числами
  // function formatNumber(num) {
  //     return num < 10 ? `0${num}` : num;
  //   }
  //   // Получение текущей даты и времени
  //   const currentDate = new Date();
  //   const day = formatNumber(currentDate.getDate());
  //   const month = formatNumber(currentDate.getMonth() + 1); // Месяцы в JavaScript начинаются с 0
  //   const year = currentDate.getFullYear();
  //   // Форматирование в строку в формате "день-месяц-год"
  //   const formattedDate = `${day}-${month}-${year}`;
  newDate.textContent = json.creationDate;

  //кнопки
  let newDiv = document.createElement("div");
  newDiv.className = "d-grid gap-2 d-md-flex justify-content-md-end";
  let newBtn = document.createElement("button");
  newBtn.className = "btn btn_change btn-outline-success";
  newBtn.textContent = "change";
  let secondBtn = document.createElement("button");
  secondBtn.className = "btn btn_delete btn-outline-danger";
  secondBtn.textContent = "delete";
  newDiv.appendChild(newDate);
  newDiv.appendChild(newBtn);
  newDiv.appendChild(secondBtn);
  newEl.appendChild(newStatus);
  newEl.appendChild(newName);
  // newEl.appendChild(description);

  let newLi = document.createElement("li");
  newLi.className = "list-group-item";
  newLi.appendChild(newEl);
  newLi.appendChild(newDiv);
  container.appendChild(newLi);
}

// создание первых тестовых тикетов
const data = [{
  "name": "замена картриджа в принтере к201",
  "description": "амена на принтере hp-sm001.",
  "creationDate": "2023-12-30",
  "id": "6e8ad17e-f1c7-4332-8323-fc77897c1fbc",
  "statusTicket": true
}, {
  "name": "переустановка windows pk-Petya к310",
  "description": "доступ к компьютеру после 15-00",
  "creationDate": "2024-01-30",
  "id": "ae16412d-1557-411b-ab0e-bc19fef136b1",
  "statusTicket": false
}, {
  "name": "установить обновление кв-ххх",
  "description": "критическое обновление для windows. \nНе забыть сделать бэкапы",
  "creationDate": "2024-01-20",
  "id": "e749d5d8-8e88-47ad-bf6f-2b3a255df0df",
  "statusTicket": false
}];

// for (let i=0; i< data.length; i++) {
//   createTickets(data[i]);
// };
;// CONCATENATED MODULE: ./src/js/popup.js
// Получаем ссылки на кнопку и всплывающее окно
let btnPopup = document.querySelector(".popup");
let ticketPopup = document.querySelector(".popup-ticket");
let btnCancel = document.querySelector(".btn-cancel");


// Получаем ссылку на элемент для закрытия всплывающего окна
let closePopup = document.querySelector(".closePopup");

// СОЗДАНИЕ ТИКЕТА

// Открываем всплывающее окно при клике на кнопку
btnPopup.addEventListener("click", function () {
  ticketPopup.style.display = "flex";
});
ticketPopup.addEventListener("submit", e => {
  e.preventDefault();

  // создаем http запрос для отправки данных формы на сервер
  const body = new FormData(ticketPopup);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:7070?method=createTicket");
  xhr.send(body);
  ticketPopup.reset();

  // обновляем список тикетов
  console.log("отриосвываем тикеты");
  checkTickets();
  ticketPopup.style.display = "none";
  return;
});

// Закрываем всплывающее окно при клике на крестик
closePopup.addEventListener("click", function (event) {
  event.preventDefault();
  ticketPopup.style.display = "none";
});

// Закрываем окно при отмене
btnCancel.addEventListener("click", function (event) {
  event.preventDefault();
  ticketPopup.style.display = "none";
});

// Закрываем всплывающее окно при клике вне него
ticketPopup.addEventListener("click", function (event) {
  if (event.target == ticketPopup) {
    ticketPopup.style.display = "none";
  }
});
;// CONCATENATED MODULE: ./src/js/form.js
const popup = document.querySelector(".popup-delete");

const docListening = event => {
  const target = event.target;

  // УДАЛЯЕМ ТИКЕТ
  if (target.classList.contains("btn_delete")) {
    const parent = target.closest(".list-group-item");
    popup.style.display = "flex";

    // модальное окно
    const btnCancel = popup.querySelector(".btn-cancel");
    btnCancel.addEventListener("click", e => {
      e.preventDefault();
      popup.style.display = "none";
      return;
    });
    popup.addEventListener("submit", e => {
      e.preventDefault();
      const id = parent.querySelector(".ticket").getAttribute("data-ticket-id");

      //удаляем на сервере
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `http://localhost:7070?method=deleteTicket&id=${id}`);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send();

      //удаляем в браузере
      parent.remove();
      popup.style.display = "none";
      return;
    });
  }

  // ИЗМЕНЯЕМ ТИКЕТ
  if (target.classList.contains("btn_change")) {
    console.log("нажимаем на кнопку изменить");
    const parent = target.closest(".list-group-item");
    console.log(parent, "parent");
    let formChange = document.querySelector(".popup-ticket_change");
    const btnCancel = formChange.querySelector(".btn-cancel");
    // Закрываем окно при отмене
    btnCancel.addEventListener("click", function (event) {
      event.preventDefault();
      formChange.style.display = "none";
    });

    // Закрываем всплывающее окно при клике вне него
    formChange.addEventListener("click", function (event) {
      if (event.target == formChange) {
        formChange.style.display = "none";
      }
    });
    const closePopup = formChange.querySelector(".closePopup");

    // Закрываем всплывающее окно при клике на крестик
    closePopup.addEventListener("click", function (event) {
      event.preventDefault();
      formChange.style.display = "none";
    });
    formChange.style.display = "flex";
    const id = parent.querySelector(".ticket").getAttribute("data-ticket-id");
    let nameTicketPopup = formChange.querySelector(".input-class");
    // берем значение краткого отписания
    nameTicketPopup.value = parent.querySelector(".ticket-name").textContent;
    console.log(nameTicketPopup, 'nameTicketPopup');

    // получаем значение детального описания с сервера
    let description;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:7070?method=getDescription&id=${id}`);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          description = xhr.responseText;
          console.log('description', description);

          // устанавливаем значение детального отписания в попапе
          let descriptionTicketPopup = formChange.querySelector(".description-popup");
          descriptionTicketPopup.value = description;
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send();
    console.log('description', description);
    const handleFormSubmit = event => {
      event.preventDefault();
      console.log(nameTicketPopup.value);
      console.log(parent.querySelector(".ticket-name").textContent);
      if (nameTicketPopup.value !== parent.querySelector(".ticket-name").textContent || description !== formChange.querySelector(".description-popup").value) {
        const body = new FormData(formChange);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:7070?method=changeTicket&id=${id}`);
        xhr.send(body);
        console.log('отправляем форму на сервер');

        // обновляем список тикетов
        console.log('обновляем список тикетов');
        checkTickets();
      }
      formChange.style.display = "none";
      formChange.removeEventListener("submit", handleFormSubmit);
    };

    // если отправляем форму на сервер
    formChange.addEventListener("submit", handleFormSubmit);
  }

  // ПОЛУЧАЕМ Description
  if (target.className === "ticket" || target.className === "ticket-name") {
    const parent = target.closest(".list-group-item");
    const id = parent.querySelector(".ticket").getAttribute("data-ticket-id");
    const descElement = parent.querySelector(".description_add");
    if (descElement) {
      descElement.remove();
      return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:7070?method=getDescription&id=${id}`);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const description = xhr.responseText;
          let elementDescription = document.createElement("div");
          elementDescription.className = "description_add";
          elementDescription.textContent = description;
          const ticket = parent.querySelector(".ticket-name");
          ticket.appendChild(elementDescription);
        } catch (e) {
          console.error(e);
        }
      }
    });
    xhr.send();
  }

  //  МЕНЯЕМ СТАТУС

  if (target.classList.contains("ticket-status")) {
    // отправляем смену статуса на сервер

    const xhr = new XMLHttpRequest();
    const parent = target.closest(".list-group-item");
    const id = parent.querySelector(".ticket").getAttribute("data-ticket-id");
    const status = parent.querySelector(".ticket-status").checked;
    console.log(status, "value");
    xhr.open("POST", `http://localhost:7070?method=changeStatus&id=${id}&status=${status}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    console.log("меняем статус тикета");
    checkTickets();
    return;
  }
};
document.addEventListener("click", docListening);
;// CONCATENATED MODULE: ./src/js/app.js




let isFirstLoad = true;

// запрашиваем сервер на наличие новых тикетов
function checkTickets() {
  console.log("запрос на сервер");
  const xhr = new XMLHttpRequest();
  if (isFirstLoad) {
    const loadingIndicator = document.querySelector(".loading-indicator");
    loadingIndicator.style.display = "flex";
  }
  xhr.open("GET", "http://localhost:7070?method=allTickets");
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        // Скрыть индикатор загрузки
        if (isFirstLoad) {
          const loadingIndicator = document.querySelector(".loading-indicator");
          loadingIndicator.style.display = "none";
          isFirstLoad = false; // Устанавливаем флаг как false после первой загрузки
        }

        const data = JSON.parse(xhr.responseText);

        // отрисовываем тикеты
        createFormTickets(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
}
setInterval(checkTickets, 5000);

// передача тикетов на форму в браузер

function createFormTickets(jsonMassive) {
  for (const item of jsonMassive) {
    createTickets(item);
  }
}
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;