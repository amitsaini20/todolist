var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTasktoDom(task){
    const li=document.createElement('li');
    li.innerHTML= `
    <input type="checkbox" id="${task.id}" ${task.completed ? "checked":''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />
  `;
  taskList.append(li);
}

function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTasktoDom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
    const task=tasks.filter(function(task){
        return task.id==Number(taskId);
    });
    if (task.length>0){
        const curr=task[0];
        curr.completed= !curr.completed;
        renderList();
        showNotification('Task Toggled Successfully');
        return;
    }
    showNotification('Could not toggle the task');
}

function deleteTask (taskId) {
    const newtask=tasks.filter(function (task){
        return task.id!=Number(taskId);
    })
    tasks=newtask;
    renderList();
    showNotification('Task deleted Successfully');
    // return;
}

function addTask (task) {
    if (task){
    tasks.push(task);
    renderList();
    showNotification('Task added Successfully');
    return
    }
    showNotification('Task can not added ');
}

function showNotification(text) {
    alert(text);
}

function handleinputkeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification('text cannot be empty');
            return
        }
        const task={
            title:text,
            id:Date.now(),
            completed:false
        };
        e.target.value='';
        addTask(task);
    }

}

function handleclicklistner(e){
    const target=e.target;
    // console.log(target);
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    // fetchTools();
    addTaskInput.addEventListener("keyup", handleinputkeypress);
    document.addEventListener('click',handleclicklistner);
}

initializeApp();
