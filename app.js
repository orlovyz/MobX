const { observable, action, makeAutoObservable } = mobx;

class TodoStore {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title) {
    if (title.trim()) {
      this.tasks.push({ title, done: false });
    }
  }

  toggleTask(index) {
    this.tasks[index].done = !this.tasks[index].done;
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }
}

const store = new TodoStore();

const render = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  store.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.textContent = task.title;

    li.addEventListener('click', () => {
      store.toggleTask(index);
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.removeTask(index);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
};

mobx.autorun(render);

document.getElementById('add-task').addEventListener('click', () => {
  const input = document.getElementById('new-task');
  store.addTask(input.value);
  input.value = '';
});
