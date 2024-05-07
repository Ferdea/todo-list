function createElement(tag, attributes, children, callbacks) {
    const element = document.createElement(tag);

    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            element.setAttribute(key, attributes[key]);
        });
    }

    if (Array.isArray(children)) {
        children.forEach((child) => {
            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    } else if (typeof children === "string") {
        element.appendChild(document.createTextNode(children));
    } else if (children instanceof HTMLElement) {
        element.appendChild(children);
    }

    if (callbacks) {
        for (const eventName in callbacks) {
            element.addEventListener(eventName, callbacks[eventName]);
        }
    }

    return element;
}

class Component {
    constructor() {
    }

  update() {
    this._domNode.innerhtml = '';
    this._domNode = this.render();
  }

    getDomNode() {
        this._domNode = this.render();
        return this._domNode;
    }
}

class Task {
    constructor(text) {
        this.text = text;
    }

    create() {
        return createElement("li", {}, [
            createElement("input", {type: "checkbox"}),
            createElement("label", {}, this.text),
            createElement("button", {}, "🗑️")
        ])
    }
}

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [
                new Task("Сделать домашку"),
                new Task("Сделать практику"),
                new Task("Пойти домой"),
                new Task("Пройти на 112%")
            ]
        };
    }

    render() {
        const stateChildren = [];
        for (let node of this.state) {
            stateChildren.push(node.create())
        }
        return createElement("div", {class: "todo-list"}, [
            createElement("h1", {}, "TODO List"),
            createElement("div", {class: "add-todo"}, [
                createElement("input", {
                        id: "new-todo",
                        type: "text",
                        placeholder: "Задание",
                    },
                    '',
                    {input: this.onAddInputChange.bind(this)}),
                createElement("button", {id: "add-btn"}, "+",
                    {click: this.onAddTask.bind(this)}),
            ]),
            createElement("ul", {id: "todos"}, stateChildren),
        ]);
    }

    onAddTask() {
        const addInputValue = this.state.addInputValue.trim();
        if (addInputValue !== "") {
            this.state.tasks.push(new Task(addInputValue))
        }
    }

    onAddInputChange(event) {
        this.state.addInputValue = event.target.value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(new TodoList().getDomNode());
});
