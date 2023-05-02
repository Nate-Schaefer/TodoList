window.addEventListener('load' , () => {

    const {connection} = require('./DBconnect.js')
    
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL server');
      });

    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        connection.query('INSERT INTO tasks (name) VALUES (?)', [task], (err, result) => {
            if(err) throw err;
            console.log('Task Inserted into DB');

           connection.query('SELECT * FROM tasks', (err, results) => {
            if(err) throw err;

            list_el.innerHTML = '';

            results.forEach((task) => {

                const task_el = document.createElement("div");
                task_el.classList.add("task");

                const task_content_el = document.createElement("div");
                task_content_el.classList.add("content");
                //task_content_el.innerText = task;

                task_el.appendChild(task_content_el);

                const task_input_el = document.createElement("input");
                task_input_el.classList.add("text");
                task_input_el.type = "text";
                task_input_el.value = task;
                task_input_el.setAttribute("readonly", "readonly");

                task_content_el.appendChild(task_input_el);

                const task_actions_el = document.createElement("div");
                task_actions_el.classList.add("actions");

                const task_edit_el = document.createElement("button");
                task_edit_el.classList.add("edit");
                task_edit_el.innerHTML = "Edit";

                const task_delete_el = document.createElement("button");
                task_delete_el.classList.add("delete");
                task_delete_el.innerHTML = "Delete";

                task_actions_el.appendChild(task_edit_el);
                task_actions_el.appendChild(task_delete_el);

                task_el.appendChild(task_actions_el);

                list_el.appendChild(task_el);

            });

                input.value = "";

        
           });
        });
    });
});


//         task_edit_el.addEventListener('click', () => {
//             if(task_edit_el.innerText.toLowerCase() == "edit") {
//                 task_input_el.removeAttribute('readonly');
//                 task_input_el.focus();
//                 task_edit_el.innerText = "Save";
//             }
//             else {
//                 const new_task_name = task_input_el.value;
//                 connection.query('UPDATE tasks SET name = ? WHERE id = ?', [new_task_name, task.id], (err, result) => {
//                     if(err) throw err;
//                     console.log('Task updated');
                
//                     task_input_el.setAttribute("readonly", "readonly");
//                     task_edit_el.innerText = "Edit";
//                 });
//             }
//         });

//         task_delete_el.addEventListener('click', () => {
//             connection.query('DELETE tasks SET WHERE id = ?', [task.id], (err, result) => {
//                 if(err) throw err;
//                 console.log('Task deleted')
            
//             list_el.removeChild(task_el);
//             });
//         });
//     })
// });
// });