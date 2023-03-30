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
    }
  },
  mutations: {
    setTasks(state, tasklist) {
      state.tasks = tasklist;
    },
    delTask(state,index){
      state.tasks.splice(index,1);
    },
    addTask(state,index){
      console.log(state,index);
    },
    editTask(state,index){
      console.log(state,index);
    }
  },
  actions: {
    async fetchTasks({ commit }){
      const response = await apolloClient.query({query:TASKS});
      commit('setTasks', [...response.data.tasklist.tasks]);
    },
    async delTask({commit},payload){
      const response = await apolloClient.mutate({mutation: DEL_TASK,variables: {taskId: payload}})
      commit('delTask',payload);
    },
    editTask({commit},payload){
      commit('editTask',payload);
    },
    addTask({commit},payload){
      commit('addTask',payload);
    }
  },
  modules: {
  }
})
