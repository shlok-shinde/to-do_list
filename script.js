const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

document.addEventListener("DOMContentLoaded", loadTasks);

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
  const task = taskInput.value;
  const deadline = deadlineInput.value;
  if (task === '' || deadline === '') return;  
  
  const li = document.createElement('li');
  li.innerHTML = `<span class="text">${task}</span>`;
 
  const deadLineSpan = document.createElement('span');
  deadLineSpan.classList.add('deadline');
  deadLineSpan.textContent = `Deadline: ${FormatDeadline(deadline)}`;
  li.appendChild(deadLineSpan);

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
}

function FormatDeadline(deadline) {
  const date = new Date(deadline);
  return date.toLocaleString();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('.text').textContent,
      deadline: li.querySelector('.deadline').textContent.replace('Deadline: ', '').replace(')', ''), 
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="text">${task.text}</span>`;
    if (task.completed) li.classList.add('completed');
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });

    const deadLineSpan = document.createElement('span');
    deadLineSpan.classList.add('deadline');
    deadLineSpan.textContent = `Deadline: ${task.deadline}`;
    li.appendChild(deadLineSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
