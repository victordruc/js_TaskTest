class Form {
    constructor(taskForm) {
        this.taskForm = taskForm
    }
    render() {
        if (!taskForm.children.length) {
            let form = document.createElement("form")
            form.className = "row g-3 needs-validation border border-primary rounded my-3"
            form.setAttribute("novalidate", true)

            form.innerHTML = `
                <div class="input-group">
                    <span class="input-group-text">Name</span>
                    <input type="text" class="form-control"  required>
                </div>

                <div class="input-group">
                    <span class="input-group-text" >Description</span>
                    <input type="text" class="form-control" required>
                </div>

                <div class="input-group">
                    <span class="input-group-text">Deadline</span>
                    <input type="text" class="form-control" required placeholder="Day">
                    <input type="text" class="form-control" required placeholder="Month">
                    <input type="text" class="form-control" required placeholder="Year">
                </div>

                <div class="input-group">
                    <span class="input-group-text" >Priority</span>
                    <select class="form-select" required>
                        <option selected disabled value="">Priority</option>
                        <option value="Hight">Hight</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div class="col-12 d-flex justify-content-center mb-3">
                    <button class="btn btn-secondary mx-2" id="formButtonClose">Close</button>
                    <button class="btn btn-success mx-2" type="submit">Save</button>
                </div>
        `
            this.taskForm.append(form)
            this.validation()
            this.closeForm()
        }
    }

    validation() {
        let forms = document.querySelectorAll('.needs-validation')
        let thisClass = this
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    event.preventDefault()
                    event.stopPropagation()
                    if (form.checkValidity()) {
                        thisClass.addTask(forms)
                        task.children.forEach((e, i) => {
                            if (e instanceof Form) {
                                task.children.splice(i, 1)
                            }
                        })
                        while (thisClass.taskForm.firstChild) {
                            thisClass.taskForm.removeChild(thisClass.taskForm.firstChild);
                        }
                    }

                    form.classList.add('was-validated')

                }, false)
            })
    }

    addTask(forms) {
        let newTask = {
            name: "",
            description: "",
            deadline: "",
            priority: false,
            status: false,
            id: Math.random().toString(36).substr(2, 9)
        }
        let month = ''
        let day = ''
        let year = ''
        Array.from(forms[0].elements).forEach((e, i) => {

            switch (i) {
                case 0:
                    newTask.name = e.value;
                    break
                case 1:
                    newTask.description = e.value;
                    break
                case 2:
                    day = e.value;
                    break
                case 3:
                    month = e.value > 0 ? e.value - 1 : e.value = 0;
                    break
                case 4:
                    year = e.value;
                    break
                case 5:
                    newTask.priority = (e.value === "Hight") ? true : false;
                    break
            }
            try{
                newTask.deadline = new Intl.DateTimeFormat("ru").format(new Date(year, month, day))
            } catch {
                newTask.deadline = new Intl.DateTimeFormat("ru").format(new Date())
            }
            
        })
        dispatch(addTask(newTask))
    }

    closeForm() {
        let formButtonClose = document.getElementById("formButtonClose")
        let thisClass = this
        formButtonClose.addEventListener("click", e => {
            task.children.forEach((e, i) => {
                if (e instanceof Form) {
                    task.children.splice(i, 1)
                }
            })
            while (thisClass.taskForm.firstChild) {
                thisClass.taskForm.removeChild(thisClass.taskForm.firstChild);
            }
        })
        dispatch(sendState())
    }
}