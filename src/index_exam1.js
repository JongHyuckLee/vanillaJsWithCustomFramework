const $app = document.querySelector("#app");

let state = {
  items: ["item1", "item2", "item3", "item4"],
};

const render = () => {
  const { items } = state;
  $app.innerHTML = `
    <ui>
        ${items?.map((item) => `<li>${item}</li>`).join("")}
    </ui>
    <button id="append">추가</button>
  `;
  document.querySelector("#append").addEventListener("click", () => {
    setState({ items: [...items, `item${items?.length + 1}`] });
  });
};

const setState = (newState) => {
  state = { ...state, ...newState };
  render();
};

render();
