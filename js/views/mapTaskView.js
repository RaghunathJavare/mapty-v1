class mapTaskView {
  _parentEl = document.querySelector('.data__container--1');
  _taskFormEl = document.querySelector('.task-container');
  _userInput = document.querySelector('.input-task');

  getTaskHandlerClick(handler) {
    const userTaskForm = this._parentEl.querySelector('.user-task_form');

    userTaskForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const userTask = userTaskForm.querySelector('.input-task');
      if (!userTask.value) return;

      handler(userTask.value);

      userTask.value = '';

      userTask
        .closest('.task-container')
        .classList.add('hide__task--container');
    });
  }

  showForm() {
    this._taskFormEl.classList.remove('hide__task--container');
    this._userInput.focus();
  }
}

export default new mapTaskView();
