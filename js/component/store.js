const SENDSTATE = "SENDSTATE"
const ADDTASK = "ADDTASK"
const REMOVETASK = "REMOVETASK"
const STATUSTASK = "STATUSTASK"
const SEARCHTASK = "SEARCHTASK"
const FILTERTASK = "FILTERTASK"

let tasks = [{
        name: "Task 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, qui.",
        deadline: "22.07.2021",
        priority: true,
        status: true,
        id: 1
    },
    {
        name: "Task 2",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, maxime!",
        deadline: "29.06.2021",
        priority: false,
        status: false,
        id: 2
    },
    {
        name: "Task 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum rem possimus aliquid officia alias magnam omnis esse eaque at saepe?",
        deadline: "28.06.2021",
        priority: true,
        status: false,
        id: 3
    },
    {
        name: "Task 4",
        description: "Lorem ipsum dolor sit amet.",
        deadline: "01.07.2021",
        priority: false,
        status: false,
        id: 4
    },
]

let original = [...tasks]

const taskManager = (state, action) => {
    switch (action.type) {
        case ADDTASK:
            state.push(action.task);
            tasks = [...state]
            break
        case REMOVETASK:
            state.forEach((e, i) => {
                if (e.id == action.id) {
                    state.splice(i, 1)
                }
                tasks = [...state]
            });
            break
        case STATUSTASK:
            state.forEach((e, i) => {
                if (e.id == action.id) {
                    state[i].status = true
                }
            });
            break
        case SEARCHTASK:
            tasks = original.filter(e => e.description.trim().toLowerCase().includes(action.value.trim().toLowerCase()));
            break
        case FILTERTASK:
            switch (action.value) {
                case "Deadline - Ascending":
                    state.sort((a, b) => {
                        if (a.deadline > b.deadline) {
                            return 1;
                        }
                        if (a.deadline < b.deadline) {
                            return -1;
                        }
                        return 0;
                    }).sort((a, b) => {
                        if (a.status > b.status) {
                            return 1;
                        }
                        if (a.status < b.status) {
                            return -1;
                        }
                        return 0;
                    })
                    tasks = [...state]
                    break
                case "Deadline - Descending":
                    state.sort((a, b) => {
                        if (a.deadline < b.deadline) {
                            return 1;
                        }
                        if (a.deadline > b.deadline) {
                            return -1;
                        }
                        return 0;
                    }).sort((a, b) => {
                        if (a.status > b.status) {
                            return 1;
                        }
                        if (a.status < b.status) {
                            return -1;
                        }
                        return 0;
                    })
                    tasks = [...state]
                    break
                case "Priority - Ascending":
                    state.sort((a, b) => {
                        if (a.priority < b.priority) {
                            return 1;
                        }
                        if (a.priority > b.priority) {
                            return -1;
                        }
                        return 0;
                    }).sort((a, b) => {
                        if (a.status > b.status) {
                            return 1;
                        }
                        if (a.status < b.status) {
                            return -1;
                        }
                        return 0;
                    })
                    tasks = [...state]
                    break
                case "Priority - Descending":
                    state.sort((a, b) => {
                        if (a.priority > b.priority) {
                            return 1;
                        }
                        if (a.priority < b.priority) {
                            return -1;
                        }
                        return 0;
                    }).sort((a, b) => {
                        if (a.status > b.status) {
                            return 1;
                        }
                        if (a.status < b.status) {
                            return -1;
                        }
                        return 0;
                    })
                    tasks = [...state]
                    break
            }
            break
        default: 
            tasks = [...state]
        break
    }
}

const sendState = () => ({
    type: SENDSTATE,
})
const addTask = (task) => ({
    type: ADDTASK,
    task
})
const deleteTask = (id) => ({
    type: REMOVETASK,
    id
})
const changeStatusTask = (id) => ({
    type: STATUSTASK,
    id
})
const searchTask = (value) => ({
    type: SEARCHTASK,
    value
})
const filterTask = (value) => ({
    type: FILTERTASK,
    value
})