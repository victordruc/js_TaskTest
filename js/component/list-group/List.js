class List {
    constructor(props) {
        this.props = props
    }

    render(containerList) {

        if(containerList.children.length) {
            while (containerList.firstChild) {
                containerList.removeChild(containerList.firstChild);
              }
        }
        
        this.props.map(index=>{
        let li = document.createElement("li")
        li.className ="list-group-item list-group-item-action"

        let divName = document.createElement("div")
        divName.className = "d-flex w-100 justify-content-between flex-wrap"

        let h5 = document.createElement("h5")
        h5.className = "mb-1"
        h5.innerText = `Name: ${index.name}`

        let divSmall = document.createElement("div")
        let small = document.createElement("small")
        small.innerText = `Deadline: ${index.deadline} To close the task you have:${parseInt(this.diffDates(index.deadline))}`
        small.className = `alert ${this.diffDates(index.deadline)<3?"alert-danger":"alert-success"}`

        let smallPriority =  document.createElement("small")
        smallPriority.innerText = `Priority: ${index.priority?"Hight":"Low"}`
        smallPriority.className = `alert  ${index.priority?"alert-danger":"alert-success"}`
        divSmall.append(small, smallPriority)
        divName.append(h5,divSmall)
        index.status?divName.removeChild(divSmall):true
        let divDescription = document.createElement("div")
        divDescription.className = "d-flex w-100 justify-content-between"

        let p = document.createElement("p")
        p.className = "mb-1"
        p.innerText = `Description: ${index.description}`

        let divButton = document.createElement("div")
        divButton.setAttribute("key", index.id)
        divButton.className = "d-flex"
        let buttonDone = document.createElement("button")
        buttonDone.className = "btn btn-outline-success mx-2"
        buttonDone.type = "button"
        buttonDone.innerText = "Done"

        let buttonDelete = document.createElement("button")
        buttonDelete.className = "btn btn-outline-danger"
        buttonDelete.type = "button"
        buttonDelete.innerText = "Delete"

        if(!index.status) {
            divButton.append(buttonDone, buttonDelete)
        } else {
            let divDone = document.createElement("div")
            divDone.className = "doneTask mx-2"
            divDone.innerText = "Close"
            divButton.append(divDone, buttonDelete)
        }
        
        divDescription.append(p, divButton)
        
        li.append(divName, divDescription)

        containerList.append(li)
        })
    }

    diffDates(res) {
        let dString = res.split(".")
        let day_1 = new Date(+dString[2], +dString[1] - 1, +dString[0])
        let day_2 = new Date()
        return (day_1 - day_2) / (60 * 60 * 24 * 1000);
    }

    editTask(info) {
        if(info.target.innerText == "Delete") {
            dispatch(deleteTask(info.target.parentElement.getAttribute("key")))
        } else if(info.target.innerText == "Done") {
            dispatch(changeStatusTask(info.target.parentElement.getAttribute("key")))
        }
    }

    searchTask(info) {
        dispatch(searchTask(info.target.value))
    }

    filterTask(info) {
        dispatch(filterTask(info.target.value))
    }
}