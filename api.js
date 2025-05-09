const api = {
  getData: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  },

  getOrderById: async (id) => {
    const res = await fetch(`http://localhost:3000/api/order/${id}`);
    const data = await res.json();

    return data;
  },

  deleteByReceiptNo: async (receiptId) => {
    const res = await fetch(`http://localhost:3000/api/order/${receiptId}`, {
      method: "DELETE",
    });

    return res;
  },

  createOrder: async ({ name, order }) => {
    const res = await fetch("http://localhost:3000/api/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        order,
      }),
    });

    return res;
  },

  updateOrder: async ({ id, order, name, isReady }) => {
    const res = await fetch(`http://localhost:3000/api/order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        order,
        isReady,
      }),
    });

    return res;
  },

  findData: async (keywords) => {
    // const res = await fetch(`http://localhost:3000/api/search?k=${keywords}`);
    // const data = await res.json();

    return data;
  },

  createUser: async ({ username, password }) => {
    console.log("in createuser");
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { data } = await res.json();
    if (data?.token) {
      localStorage.setItem("token", token);
    }

    window.location.href = "/login.html";
  },

  loginUser: async ({ username, password }) => {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { data } = await res.json();
    if (data?.token) {
      localStorage.setItem("token", token);
    }

    window.location.href = "/index.html";
  },
};

export default api;
