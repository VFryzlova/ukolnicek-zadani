let url = new URL('https://apps.kodim.cz/daweb/trening-api/apis/tasks-api/tasks')

const fetchData = () => {
	fetch(`${url}`)
		.then((response) => response.json())
		.then((data) => renderTasks(data))
}

fetchData()

const Task = (props) => {
	const { done, due, name } = props
	return `
        <div class="task">
            <div class="task__body">
                <div class="task__name">${name}</div>
                <div class="task__due">${due}</div>
            </div>
            <div class="task__done">${done ? '✓' : ''}</div>
        </div>
    `
}

const renderTasks = (data) => {
	document.querySelector('.todo__tasks').innerHTML = data
        .map((task) => Task(task))
        .join('')
}

document.querySelector('#checkbox-undone')
    .addEventListener('change', function () {
        if (this.checked) {
            url.searchParams.set('done', true)
            fetchData()
        } else {
            url.searchParams.delete('done')
            fetchData()
        }
})
