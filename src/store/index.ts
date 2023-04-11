import { createStore } from 'vuex'
import {apolloClient} from '@/client/ApolloClient'
import { TASKS } from '@/graphql/tasks'
import {DEL_TASK} from "@/graphql/delete_task";
import {EDIT_TASK} from "@/graphql/edit_task";
import {ADD_TASK} from "@/graphql/add_task";

interface Task{
  title:string,
  checklist:[Check]
}

interface Check{
  name:string,
  checked:boolean
}

export default createStore({
  state: {
    tasks: [] as Task[]
  },
  getters: {
    allTasks(state){
      return state.tasks;
    },
    getTask: (state) => (id:number) =>{
      return state.tasks[id];
    }
  },
  mutations: {
    setTasks(state, tasklist: Task[]) {
      state.tasks = tasklist;
    },
    delTask(state,index:number){
      state.tasks.splice(index,1);
    },
    addTask(state,task:Task){
      state.tasks.unshift(task);
    },
    editTask(state,payload){
      state.tasks.splice(payload.idx, 1, payload.task);
    }
  },
  actions: {
    async fetchTasks({ commit }){
      try{
        const response = await apolloClient.query({query:TASKS});
        commit('setTasks', [...response.data.tasklist.tasks]);
      }
      catch (err){
        console.log(err);
      }
    },
    async delTask({commit},payload){
      try{
        await apolloClient.mutate({mutation: DEL_TASK,variables: {taskId: payload}});
      }
      catch (err){
        console.log(err);
      }
      commit('delTask',payload);
    },
    async editTask({commit},payload){
      try{
        await apolloClient.mutate({mutation: EDIT_TASK,variables: {taskId: payload.idx, task: payload.task}});
      }
      catch (err){
        console.log(err);
      }
      commit('editTask',payload);
    },
    async addTask({commit},payload){
      try{
        await apolloClient.mutate({mutation: ADD_TASK,variables: {task: payload}});
      }
      catch (err){
        console.log(err);
      }
      commit('addTask',payload);
    }
  },
  modules: {
  }
})
