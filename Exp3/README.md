# Experiment 3 - Interactive To-Do List Application

## Aim
Create an application to implement an interactive To-Do List using the concepts of JavaScript, demonstrating DOM manipulation, event handling, local state management, and data persistence.

## Method
1. **HTML Structure**: Created semantic HTML with input field, task list, filters, and statistics display
2. **CSS Styling**: Implemented modern, responsive design with animations and hover effects
3. **JavaScript Implementation**:
   - Created `TaskManager` class to manage all task operations
   - Implemented CRUD operations (Create, Read, Update, Delete)
   - Used `localStorage` for data persistence
   - Event delegation for efficient event handling
   - Real-time statistics updates
4. **Features Implemented**:
   - Add new tasks
   - Edit existing tasks
   - Delete tasks
   - Toggle task completion
   - Filter tasks (All/Active/Completed)
   - Clear completed tasks
   - Clear all tasks
   - Persistent storage

## Key Features

### Core Functionality
- ✅ **Add Tasks**: Add new tasks via button or Enter key
- ✏️ **Edit Tasks**: In-place editing with save/cancel options
- ✔️ **Toggle Completion**: Mark tasks as complete/incomplete
- 🗑️ **Delete Tasks**: Remove individual tasks with confirmation
- 🔍 **Filter Tasks**: View all, active, or completed tasks
- 📊 **Statistics**: Real-time count of total, active, and completed tasks
- 💾 **Persistence**: Tasks saved to localStorage and persist across sessions

### User Experience
- Smooth animations for task additions
- Hover effects on task items
- Visual feedback for completed tasks (strikethrough, different background)
- Empty state messaging
- Confirmation dialogs for destructive actions
- Keyboard support (Enter to add tasks)
- Responsive design for all screen sizes

## Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Custom styling, animations, flexbox, gradients
- **JavaScript (ES6+)**:
  - Classes
  - Arrow functions
  - Template literals
  - Array methods (filter, map, find)
  - localStorage API
  - DOM manipulation
  - Event delegation

## How to Run
1. Open `index.html` in a web browser
2. Start adding tasks by typing in the input field
3. Use the filter buttons to view different task categories
4. Edit, complete, or delete tasks as needed
5. Tasks are automatically saved and will persist even after closing the browser

## Code Structure

### TaskManager Class
- `constructor()`: Initializes tasks from localStorage
- `addTask(text)`: Adds a new task
- `deleteTask(id)`: Removes a task
- `toggleTask(id)`: Toggles task completion status
- `editTask(id, newText)`: Updates task text
- `clearCompleted()`: Removes all completed tasks
- `clearAll()`: Removes all tasks
- `getFilteredTasks()`: Returns filtered task list based on current filter
- `renderTasks()`: Updates the DOM with current tasks
- `updateStats()`: Updates task statistics
- `saveTasks()`: Saves tasks to localStorage
- `loadTasks()`: Loads tasks from localStorage

## Observations
- **DOM Manipulation**: Direct manipulation of DOM elements for instant UI updates
- **Event Delegation**: Single event listener on task list handles all task item events efficiently
- **State Management**: Class-based approach maintains consistent state across operations
- **Data Persistence**: localStorage provides seamless persistence without backend
- **Performance**: Event delegation and minimal DOM updates ensure smooth performance
- **User Feedback**: Visual and confirmation dialogs improve user confidence
- **Code Organization**: Class-based structure makes code maintainable and extensible

## Possible Enhancements
- Add due dates and reminders
- Implement drag-and-drop for task reordering
- Add task categories/tags
- Implement priority levels
- Add search functionality
- Export/import tasks
- Dark mode toggle
- Task history/undo functionality

## Conclusion
This To-Do List application successfully demonstrates core JavaScript concepts including DOM manipulation, event handling, state management, and data persistence. The class-based architecture provides clean, maintainable code, while localStorage ensures data persists across sessions. The application showcases modern JavaScript practices and provides an excellent foundation for more complex interactive web applications. Features like event delegation, input validation, and user confirmations demonstrate production-ready development practices.
