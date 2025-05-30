const { observable, action, makeAutoObservable } = mobx;
// Импорт нужных функций из MobX. makeAutoObservable — автоматически делает свойства наблюдаемыми, а методы — действиями.

class TodoStore {
  tasks = []; // Массив задач, каждая — объект { title, done }

  constructor() {
    makeAutoObservable(this); // Делает tasks наблюдаемым, а методы — MobX-экшенами
  }

  addTask(title) {
    // Добавление задачи, если введённый текст не пустой
    if (title.trim()) {
      this.tasks.push({ title, done: false });
    }
  }

  toggleTask(index) {
    // Инвертирует статус выполнения задачи
    this.tasks[index].done = !this.tasks[index].done;
  }

  removeTask(index) {
    // Удаляет задачу по индексу
    this.tasks.splice(index, 1);
  }
}

const store = new TodoStore(); // Создаём экземпляр хранилища

const render = () => {
  // Функция обновления DOM
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Очищаем список

  store.tasks.forEach((task, index) => {
    // Для каждой задачи создаём DOM-элемент
    const li = document.createElement('li');
    li.className = task.done ? 'done' : ''; // Добавляем CSS-класс для зачёркивания выполненных

    li.textContent = task.title; // Название задачи

    li.addEventListener('click', () => {
      store.toggleTask(index); // Клик по задаче меняет её состояние "выполнено"
    });

    const removeBtn = document.createElement('button'); // Кнопка удаления
    removeBtn.textContent = '❌';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Не даём родительскому li сработать
      store.removeTask(index); // Удаляем задачу
    });

    li.appendChild(removeBtn); // Добавляем кнопку в элемент списка
    taskList.appendChild(li);  // Добавляем элемент в DOM
  });
};

mobx.autorun(render); 
// MobX автоматически вызывает render каждый раз, когда изменяется store.tasks

document.getElementById('add-task').addEventListener('click', () => {
  const input = document.getElementById('new-task');
  store.addTask(input.value); // Добавляем новую задачу из поля ввода
  input.value = ''; // Очищаем поле после добавления
});

