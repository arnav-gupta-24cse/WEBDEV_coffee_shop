document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.json")
    .then(res => res.json())
    .then(data => {
      const items = document.querySelectorAll(".menu-item");

      items.forEach(item => {
        const id = item.getAttribute("data-id");
        const desc = data[id] || "Description not available.";

        const dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        dropdown.textContent = desc;

        item.appendChild(dropdown);
      });
    })
    .catch(err => console.error("Error loading menu.json:", err));
});
