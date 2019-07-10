var app = new Vue({
  el: '#app',
  components: {
    'task' : {
              props: ['task'],
              template: `
                  <div class="ui segment task"
                      v-bind:class="task.completed ? 'done' : 'todo' " >
                     Name : {{task.name}} description: {{task.description}} Status: {{task.completed}}
                  </div>
                         `
             }
    },
  data: {
    tasks: [
      {id:1, name: 'Task 1', description: 'Just some ranodm one', completed: true},
      {id:2, name: 'Task 2', description: 'Just as it is!', completed: false},
      {id:3, name: 'Task 3', description: 'some ranodm one', completed: true},
      {id:4, name: 'Task 4', description: 'Chill,for fun!', completed: false},
      {id:5, name: 'Task 5', description: 'Just hanging out here!', completed: true}
    ]
  },
  computed: {
    completedTasks: function(){
      return this.tasks.filter( item => item.completed == true);
    },
    todoTasks: function(){
      return this.tasks.filter(item => item.completed == false);
    }
  }
})
