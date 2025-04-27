import api from "./api.js";

const root = document.querySelector("#root");

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
            <td><form method="DELETE" action="/api/order/${
              order.receipt_id
            }"><button class="btn-danger btn-small">Delete</button></form></td>
          </tr>
    `
    )
    .join("");
}

async function main() {
  const data = await api.getData();
  render(data);
}

main();
