const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const loadTasks = () => {
    let localDB = JSON.parse(localStorage.getItem("tasks"))
    tasks = [...localDB]
}

const checkLocalStorageName = () => {
    !localStorage.getItem("tasks")?localStorage.setItem("tasks", JSON.stringify(tasks)):false
}