const popup = document.querySelector(".popup-delete");
import { checkTickets } from "./app";
const formChange = document.querySelector(".popup-ticket_change");

document.addEventListener("click", (event) => {
  const target = event.target;
  // // открываем дополнительную информацию
  // if (target.className === 'ticket-name') {

  //     const description = target.querySelector('.description');

  //     if (!description.classList.contains('disable')) {
  //         description.classList.add('disable');
  //         return;
  //     }

  //     description.classList.remove('disable');
  // }

  // удаляем тикет
  if (target.classList.contains("btn_delete")) {
    const parent = target.closest(".list-group-item");

    popup.style.display = "flex";

    // модальное окно
    const btnCancel = popup.querySelector(".btn-cancel");
    btnCancel.addEventListener("click", (e) => {
      e.preventDefault();
      popup.style.display = "none";
      return;
    });

    popup.addEventListener("submit", (e) => {
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

    let nameTicketPopup = formChange.querySelector(".input-class");

    let descriptionTicketPopup = formChange.querySelector(".description-popup");

    const id = parent.querySelector(".ticket").getAttribute("data-ticket-id");

    const nameValue = parent.querySelector(".ticket-name").textContent;
    const descriptionValue = parent.querySelector(".description").textContent;

    nameTicketPopup.value = nameValue;
    descriptionTicketPopup.textContent = descriptionValue;

    formChange.style.display = "flex";

    const hasChanges = () => {
      return (
        nameTicketPopup.value === nameValue &&
        descriptionTicketPopup.textContent === descriptionValue
      );
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();

      formChange.removeEventListener("submit", handleFormSubmit);

      if (hasChanges()) {
        console.log("Изменений нет, закрываем попап");
        formChange.style.display = "none";
        return;
      }

      const body = new FormData(formChange);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", `http://localhost:7070?method=changeTicket&id=${id}`);

      xhr.send(body);
      // обновляем список тикетов
      checkTickets();

      formChange.style.display = "none";
      return;
    };

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

    xhr.open(
      "POST",
      `http://localhost:7070?method=changeStatus&id=${id}&status=${status}`
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send();
    console.log("меняем статус тикета");
    checkTickets();

    return;
  }
});
