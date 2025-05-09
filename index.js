import api from "./api.js";

const root = document.querySelector("#root");
const deleteConfirmed = document.querySelector("#delete-confirmed");
const deleteText = document.querySelector("#delete-text");
const submitOrder = document.querySelector("#submit-order");
const updateOrder = document.querySelector("#update-order");
const editReceiptId = document.querySelector("#edit-receipt-id");
const isReadySwitch = document.querySelector("#is-ready");
const customerOrder = document.querySelector("#customer-order");
const customerOrder2 = document.querySelector("#customer-order-2");
const nameOnOrder = document.querySelector("#name-on-order");
const nameOnOrder2 = document.querySelector("#name-on-order-2");
const search = document.querySelector("#search");
const alertBox = document.querySelector("#alert");

function render(data = []) {
  console.log("in render, data: ", data);
  root.innerHTML = data
    .map(
      (order) => `
        <tr>
        <td>${order.receiptId}</td>
        <td>${order.name}</td>
            <td>
              <div class="collapsible">
                <input id="collapsible-${
                  order.receiptId
                }" type="checkbox" name="collapsible" />
                <label for="collapsible-${order.receiptId}"
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
            <td>
                <label data-op="edit" data-id="${
                  order.receiptId
                }" class="paper-btn margin btn-small btn-warning" for="modal-3">
                    Edit
                </label>
            </td>
            <td>
              <label data-op="delete" data-id="${
                order.receiptId
              }" class="paper-btn margin btn-small btn-danger" for="modal-2">
                Delete
            </label>
            </td>
          </tr>
    `
    )
    .join("");
}

async function reRender() {
  const data = await api.getData();

  render(data);
}

root.addEventListener("click", async (e) => {
  const { op, id } = e.target.dataset;
  if (op === "delete") {
    deleteText.textContent = `${id}`;
  } else if (op === "edit") {
    // make a call to findOne then populate edit form with results
    // console.log("id: ", id);
    const { receiptId, order, name, isReady } = await api.getOrderById(id);
    editReceiptId.textContent = receiptId;
    // isReadySwitch.checked = isReady;
    nameOnOrder2.value = name;
    customerOrder2.value = order.join("\n");
  }
});

deleteConfirmed.addEventListener("click", async (e) => {
  await api.deleteByReceiptNo(deleteText.textContent);
  e.preventDefault();
  reRender();
});

submitOrder.addEventListener("click", async (e) => {
  e.preventDefault();
  const order = customerOrder.value.split("\n");
  const name = nameOnOrder.value;
  await api.createOrder({ name, order });
  window.location.reload();
});

updateOrder.addEventListener("click", async (e) => {
  e.preventDefault();
  const order = customerOrder2.value.split("\n");
  const name = nameOnOrder2.value;
  const ready = isReadySwitch.checked;
  const receiptId = editReceiptId.textContent;
  console.log("> ", receiptId, name, ready, order);
  await api.updateOrder({ id: receiptId, order, name, isReady: ready });
  window.location.reload();
});

search.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});

reRender();

alertDismissed.addEventListener("click", () => {
  const alertDismissed = document.querySelector("#alert-dismissed");
  alert("hi");
  localStorage.removeItem("alert");
});
