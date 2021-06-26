class Task {
    constructor(props) {
        this.props = props
        this.children = []
        this.children.push(new List(props))
    }

    addChildren(children, containerList) {
        this.children.push(children)
        this.render(containerList)
    }

    render(containerList) {
        this.children.forEach(index=>index.render(containerList))
    }
}