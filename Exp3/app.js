// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderTasks();
        this.updateStats();
        this.attachEventListeners();
    }

    // Load tasks from localStorage
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Add new task
    addTask(text) {
        if (text.trim() === '') {
            alert('Please enter a task!');
            return;
        }

        const task = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    // Delete task
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Edit task
    editTask(id, newText) {
        if (newText.trim() === '') {
            alert('Task cannot be empty!');
            return false;
        }

        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.text = newText.trim();
            this.saveTasks();
            this.renderTasks();
            return true;
        }
        return false;
    }

    // Clear completed tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(task => task.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Clear all tasks
    clearAll() {
        if (this.tasks.length === 0) {
            alert('No tasks to clear!');
            return;
        }

        if (confirm('Are you sure you want to delete all tasks?')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Filter tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    // Render tasks
    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <div class="empty-state-text">No tasks found</div>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <input type="text" class="task-edit-input" value="${this.escapeHtml(task.text)}">
                <div class="task-actions">
                    <button class="task-btn btn-edit">Edit</button>
                    <button class="task-btn btn-save">Save</button>
                    <button class="task-btn btn-cancel">Cancel</button>
                    <button class="task-btn btn-delete">Delete</button>
                </div>
            </li>
        `).join('');
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(task => !task.completed).length;
        const completed = this.tasks.filter(task => task.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Attach event listeners
    attachEventListeners() {
        // Add task
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            const input = document.getElementById('taskInput');
            this.addTask(input.value);
            input.value = '';
        });

        // Add task on Enter key
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask(e.target.value);
                e.target.value = '';
            }
        });

        // Task list event delegation
        document.getElementById('taskList').addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.id);

            // Toggle completion
            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(taskId);
            }

            // Delete task
            if (e.target.classList.contains('btn-delete')) {
                if (confirm('Are you sure you want to delete this task?')) {
                    this.deleteTask(taskId);
                }
            }

            // Edit task
            if (e.target.classList.contains('btn-edit')) {
                this.enterEditMode(taskItem);
            }

            // Save edited task
            if (e.target.classList.contains('btn-save')) {
                const input = taskItem.querySelector('.task-edit-input');
                if (this.editTask(taskId, input.value)) {
                    this.exitEditMode(taskItem);
                }
            }

            // Cancel edit
            if (e.target.classList.contains('btn-cancel')) {
                this.exitEditMode(taskItem);
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTasks();
            });
        });

        // Clear completed
        document.getElementById('clearCompletedBtn').addEventListener('click', () => {
            this.clearCompleted();
        });

        // Clear all
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAll();
        });
    }

    // Enter edit mode
    enterEditMode(taskItem) {
        const textSpan = taskItem.querySelector('.task-text');
        const editInput = taskItem.querySelector('.task-edit-input');
        const editBtn = taskItem.querySelector('.btn-edit');
        const saveBtn = taskItem.querySelector('.btn-save');
        const cancelBtn = taskItem.querySelector('.btn-cancel');

        textSpan.classList.add('editing');
        editInput.classList.add('active');
        editBtn.style.display = 'none';
        saveBtn.classList.add('active');
        cancelBtn.classList.add('active');
        editInput.focus();
        editInput.select();
    }

    // Exit edit mode
    exitEditMode(taskItem) {
        const textSpan = taskItem.querySelector('.task-text');
        const editInput = taskItem.querySelector('.task-edit-input');
        const editBtn = taskItem.querySelector('.btn-edit');
        const saveBtn = taskItem.querySelector('.btn-save');
        const cancelBtn = taskItem.querySelector('.btn-cancel');

        textSpan.classList.remove('editing');
        editInput.classList.remove('active');
        editBtn.style.display = '';
        saveBtn.classList.remove('active');
        cancelBtn.classList.remove('active');
        
        // Reset input value to current task text
        editInput.value = textSpan.textContent;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
