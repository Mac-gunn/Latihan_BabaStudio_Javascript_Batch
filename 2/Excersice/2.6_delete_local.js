const form 			= document.querySelector('#task-form');
const tasklist 		= document.querySelector('.collection');
// const clearBtn		= document.querySelector('.clear-task');
// const filter		= document.querySelector('#filter');
const nama			= document.querySelector('#nama');
const jenisKelamin 	= document.querySelector('#jenisKelamin');
const noHP			= document.querySelector('#noHp');
const alamat		= document.querySelector('#alamat');

loadEventListeners();

function loadEventListeners(){
	// document.addEventListener('DOMContentLoaded', loadRegist());
	form.addEventListener('submit', addRegist);
	// tasklist.addEventListener('click', removeTask);
	// clearBtn.addEventListener('click', clearTask);
	// filter.addEventListener('keyup', filterTask);
}



function addRegist(e){
	if(nama.value === ''){
		alert('data berhasil disimpan');
	}
	const tr = document.createElement('tr');
	tr.className = 'collection-item';
	const td = `<tr>
				<td>${nama.value}</td>
				<td>${jenisKelamin.value}</td>
				<td>${noHP.value}</td>
				<td>${alamat.value}</td>
				</tr>`;	
	const tr1 = document.createElement('td');
	const tr2 = document.createElement('td');
	const tr3 = document.createElement('td');
	const tr4 = document.createElement('td');
	const tr5 = document.createElement('td');
	const link = document.createElement('a');
	link.className = 'delete-item';
	link.innerHTML = '<i class="fa fa-remove"></i>';

	// '<td>'+nama.value+'</td><td>'+jenisKelamin.value+'</td><td>'+noHP.value+'</td><td>'+alamat.value+'</td>';
	tr1.appendChild(document.createTextNode(nama.value));
	tr2.appendChild(document.createTextNode(jenisKelamin.value));
	tr3.appendChild(document.createTextNode(noHP.value));
	tr4.appendChild(document.createTextNode(alamat.value));

	tr.appendChild(tr1);
	tr.appendChild(tr2);
	tr.appendChild(tr3);
	tr.appendChild(tr4);
	tr.appendChild(tr5.appendChild(link));
	tasklist.appendChild(tr);

	nama.value = '';
	jenisKelamin.value = '';
	noHP.value = '';
	alamat.value = '';

	e.preventDefault();
}

// function simpanData(data){
// 	let tasks;
// 	if(localStorage.getItem('regist')=== null){
// 		tasks = [];
// 	}else{
// 		tasks = JSON.parse(localStorage.getItem('regist'));
// 	}
// 	tasks.push(data);
	
// 	localStorage.setItem('regist',JSON.stringify(tasks));
// }