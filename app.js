var app = new Vue({
  el: '#app',
  components: {
    'task' : {
              props: ['task'],
              template: `
                  <div class="ui segment task"
                      v-bind:class="task.completed ? 'done' : 'todo' " >
                    <div class="ui grid">
                      <div class="left floated twelve wide column">
                       <div class="ui checkbox">
                        <input type="checkbox" name="task" v-on:click="app.toggleDone($event, task.id)" :checked="task.completed" />
                        <label>{{task.name}} &nbsp; <span class="description">{{ task.description }}</span></label>
                       </div>
                      </div>
                      <div class="right floated three wide column">
                       <i class="icon pencil blue" alt="Edit" v-on:click="app.editTask($event, task.id)"></i>
                       <i class="icon trash red" alt="Delete" v-on:click="app.deleteTask($event, task.id)"></i>
                      </div>
                    </div>
                  </div>
                        `
             }
    },
  data: {
    tasks: [
      {id:1, name: 'Task 1', description: 'Just some random one', completed: true},
      {id:2, name: 'Task 2', description: 'Fun as it is!', completed: false},
      {id:3, name: 'Task 4', description: 'Chill,for fun!', completed: false},
      {id:4, name: 'Task 5', description: "What's hanging out here!", completed: true}
    ],
    task: {},
    action: 'create',
    message: ''
  },
  computed: {
    completedTasks: function(){
      return this.tasks.filter( item => item.completed == true);
    },
    todoTasks: function(){
      return this.tasks.filter(item => item.completed == false);
    },
    nextId: function(){
      return (this.tasks.sort(function(a,b){ return a.id - b.id; }))[this.tasks.length - 1].id+1;
    }
  },
    methods:{
      clear: function(){
        this.task = {};
        this.action = 'create';
        this.message;
      },
      toggleDone: function(event,id){
        event.stopImmediatePropagation();
        let task = this.tasks.find(item => item.id == id);

        if(task){
          task.completed = !task.completed;
          this.message = `Task ${id} Updated!`
        }
      },
      createTask: function(event) {
        event.preventDefault();

        if(!this.task.completed){
          this.task.completed = false;
        }else{
          this.task.completed = true;
        }

        let taskId = this.nextId;
        let newTask = Object.assign({}, this.task);
        if(newTask.name.length && newTask.description.length ){
          this.tasks.push(newTask);
          this.message = `Task ${taskId} Created!`;
        }else{
          console.log('Please fill out the fields!');
          this.message = `Please fill out the fields!`;
        }
      },
      editTask: function(event,id){
        this.action = 'edit';
        let task = this.tasks.find(item => item.id == id);

        if(task){
          this.task = {id: id, name: task.name, description: task.description, completed: task.completed};
        }
      },
      updateTask: function (event, id){
        event.stopImmediatePropagation();
        event.preventDefault();

        let task = this.tasks.find(item => item.id == id);

        if(task && this.task.name && this.task.description){
          task.name = this.task.name;
          task.description = this.task.description;
          task.completed = this.task.completed;
          this.message = `Task ${id} Updated!`
        }
      },
      deleteTask: function(event, id){
        event.stopImmediatePropagation();

        let taskIndex = this.tasks.findIndex(item => item.id == id);
        if(taskIndex > -1){
          this.$delete(this.tasks, taskIndex);
          this.message = `Task ${id} Deleted!`
        }
      }
    }
 });
