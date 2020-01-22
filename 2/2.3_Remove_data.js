const form 		= document.querySelector('#task-form');
const tasklist 	= document.querySelector('.collection');
const clearBtn	= document.querySelector('.clear-task');
const filter	= document.querySelector('#filter');
const taskInput	= document.querySelector('#task');


loadEventListeners();

function loadEventListeners(){
	form.addEventListener('submit', addTask);
	tasklist.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTask);
}

function addTask(e){
	if(taskInput.value === ''){
		alert('data berhasil disimpan');
	}

	const li = document.createElement('li');
	li.className = 'collection-item';

	li.appendChild(document.createTextNode(taskInput.value));

	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></i>';

	li.appendChild(link);

	tasklist.appendChild(li);

	taskInput.value = '';

	e.preventDefault();
}

function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm('yakin bos ?')){
			e.target.parentElement.parentElement.remove();
		}
	}
}

function clearTask(){
	while(tasklist.firstChild){
		tasklist.removeChild(tasklist.firstChild);
	}
}