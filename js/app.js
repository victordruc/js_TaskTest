let containerList = document.getElementById("listContainer")
let taskForm = document.getElementById("taskForm")
let taskAdd = document.getElementById("taskAdd")
let listContainer = document.getElementById("listContainer")
let searchTaskInput = document.getElementById("searchTaskInput")
let filterOption = document.getElementById("filterOption")


let task = new Task(tasks)

// EVENT--------
taskAdd.addEventListener("click",()=>{task.addChildren(new Form(taskForm), containerList)})
listContainer.addEventListener("click",(e)=>new List().editTask(e))
searchTaskInput.addEventListener("input",(e)=>new List().searchTask(e))
filterOption.addEventListener("change",(e)=>new List().filterTask(e))
// EVENT----------

task.render(containerList)

const dispatch = (fun) => {
    taskManager(original, fun)
    saveTasks(tasks)
    new Task(tasks).render(containerList)
}