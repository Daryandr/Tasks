import { createStore } from 'vuex'
import {apolloClient} from '@/client/ApolloClient'
import { TASKS } from '@/graphql/tasks'
import {DEL_TASK} from "@/graphql/delete_task";

export default createStore({
  state: {
    tasks: []
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
    setTasks(state, tasklist) {
      state.tasks = tasklist;
    },
    delTask(state,index:number){
      state.tasks.splice(index,1);
    },
    addTask(state,task){
      state.tasks.push(task);
    },
    editTask(state,payload){
      state.tasks.splice(payload.idx, 1, payload.task);
    }
  },
  actions: {
    async fetchTasks({ commit }){
      const response = await apolloClient.query({query:TASKS});
      commit('setTasks', [...response.data.tasklist.tasks]);
    },
    async delTask({commit},payload){
      const response = await apolloClient.mutate({mutation: DEL_TASK,variables: {taskId: payload}});
      if(response.data.deleteTask=="Task deleted")
        commit('delTask',payload);
    },
    async editTask({commit},payload){
      const response = await apolloClient.mutate({mutation: EDIT_TASK,variables: {taskId: payload.idx, task: payload.task}});
      if(response.data.editTask=="Task edited")
       commit('editTask',payload);
    },
    async addTask({commit},payload){
      const response = await apolloClient.mutate({mutation: ADD_TASK,variables: {task: payload}});
      if(response.data.editTask=="Task added")
        commit('addTask',payload);
    }
  },
  modules: {
  }
})
