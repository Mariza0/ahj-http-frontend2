import "./tickets";
import "./popup";
import { createTickets } from "./tickets";
import "./form";
let isFirstLoad = true;

// запрашиваем сервер на наличие новых тикетов
export function checkTickets() {
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
