const api = {
  getData: async () => {
    const res = await fetch("http://localhost:3000/api/order");
    const data = await res.json();
    console.log(data);
    return data;
  },
  deleteByReceiptNo: async (receiptId) => {
    const res = await fetch(`http://localhost:3000/api/order/${receiptId}`, {
      method: "DELETE",
    });

    console.log(res);
  },
};

export default api;
