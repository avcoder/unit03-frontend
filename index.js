import api from "./api.js";

const root = document.querySelector("#root");
const deleteConfirmed = document.querySelector("#delete-confirmed");
const deleteText = document.querySelector("#delete-text");

function render(data) {
  root.innerHTML = data
    .map(
      (order) => `
        <tr>
        <td>${order.receipt_id}</td>
        <td>${order.name}</td>
            <td>
              <div class="collapsible">
                <input id="collapsible-${
                  order.receipt_id
                }" type="checkbox" name="collapsible" />
                <label for="collapsible-${order.receipt_id}"
                  >${order.order.join(", ")}</label
                >
                <div class="collapsible-body">
                  <ul>
                    ${order.order
                      .map(
                        (o) => `
                        <li>${o}</li>
                        `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </td>
            <td class="${order.isReady ? "text-success" : "text-secondary"}">
                ${order.isReady ? "Ready" : "In Progress"}
            </td>
            <td><button class="btn-warning btn-small">Edit</button></td>
            <td>
              <label data-op="delete" data-id="${
                order.receipt_id
              }" class="paper-btn margin btn-small btn-danger" for="modal-2">
                Delete
            </label>
            </td>
          </tr>
    `
    )
    .join("");
}

async function main() {
  const data = await api.getData();
  render(data);
}

root.addEventListener("click", async (e) => {
  const { op, id } = e.target.dataset;
  if (op === "delete") {
    deleteText.textContent = `${id}`;
  }
});

deleteConfirmed.addEventListener("click", async (e) => {
  const res = await api.deleteByReceiptNo(deleteText.textContent);
  console.log(res);
  window.location.reload();
});

main();
