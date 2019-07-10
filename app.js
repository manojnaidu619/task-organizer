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
                        <label>{{ task.name }} <span class="description">{{ task.description }}</span></label>
                       </div>
                      </div>
                      <div class="right floated three wide column">
                      </div>
                    </div>
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
  },
    methods:{
      toggleDone: function(event,id){
        console.log(event);
        console.log(id);
      }
    }
 });
