import Component from "../../core/Component";

export default class Items extends Component {
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }
  setUp() {
    this.$state = { isFilter: 0, items: ["item1", "item2"] };
  }
  template() {
    const { items } = this.$state;
    return `
      <ui>
        ${items
          .map(
            (item, key) => `
            <li>
                ${item}
                <button class="deleteBtn" data-index="${key}">삭제</button>
            </li>
            `
          )
          .join("")}
      </ui>
      <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    this.addEvent("click", ".addBtn", ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items?.length + 1}`] });
    });
    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const items = [...this.$state.items];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
