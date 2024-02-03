// Получаем ссылки на кнопку и всплывающее окно
let btnPopup = document.querySelector(".popup");
let ticketPopup = document.querySelector(".popup-ticket");
let btnCancel = document.querySelector(".btn-cancel");
import { checkTickets } from "./app";

// Получаем ссылку на элемент для закрытия всплывающего окна
let closePopup = document.querySelector(".closePopup");

// СОЗДАНИЕ ТИКЕТА

// Открываем всплывающее окно при клике на кнопку
btnPopup.addEventListener("click", function () {
  ticketPopup.style.display = "flex";
});

ticketPopup.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameValue = ticketPopup.querySelector(".input-class").value.trim();

  if (nameValue === "") {
    ticketPopup.style.display = "none";
    return;
  }

  // создаем http запрос для отправки данных формы на сервер
  const body = new FormData(ticketPopup);

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:7070?method=createTicket");

  xhr.send(body);

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
