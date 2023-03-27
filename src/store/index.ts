import { createStore } from 'vuex'
import {apolloClient} from '../client/ApolloClient'
import { Tasks } from '../graphql/tasks'
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
  },
  actions: {
    async fetchTasks({ commit }){
      const response = await apolloClient.query({query:Tasks});
      commit('setTasks', response.data.tasklist.tasks);
    }
  },
  modules: {
  }
})
