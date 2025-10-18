import { characters } from "./data.js";

let isModalOpen = false;
const modal = createModal();

window.addEventListener("click", (e) => {
  if (!isModalOpen) {
    isModalOpen = true;
    modal.style.display = "block";
    modal.style.top = e.pageY + "px";
    modal.style.left = e.pageX + "px";
  } else {
    isModalOpen = false;
    modal.style.display = "none";
  }
});

function createModal() {
  const modal = document.createElement("div");
  const form = document.createElement("form");
  const select = document.createElement("select");
  const button = document.createElement("button");
  button.textContent = "Validate";
  button.type = "submit";
  characters.forEach((character) => {
    const option = document.createElement("option");
    option.value = character.id;
    option.text = character.name;
    select.appendChild(option);
  });
  form.appendChild(select);
  form.appendChild(button);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const coords = e.target.parentElement.getBoundingClientRect();
    const dataForm = new FormData(e.target);
    const characterId = dataForm.get("characterId");
    try {
      const res = await fetch("http://localhost:3000/checkPosition", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          x: coords.x,
          y: coords.y,
          characterId: characterId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    } catch (error) {
      console.log(error);
    }
  });
  modal.appendChild(form);
  modal.style.display = "none";
  modal.style.position = "absolute";
  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.body.appendChild(modal);
  return modal;
}
