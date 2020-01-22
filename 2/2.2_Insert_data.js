const form 		= document.querySelector('#task-form');
const tasklist 	= document.querySelector('.collection');
const clearBtn	= document.querySelector('.clear-task');
const filter	= document.querySelector('#filter');
const taskInput	= document.querySelector('#task');


loadEventListeners();

function loadEventListeners(){
	form.addEventListener('submit', addTask);
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