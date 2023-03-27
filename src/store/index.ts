import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks:[
      {title:"task1",
        checkList:[{
          name:"check1",
          checked:false
        },
          {
            name:"check2",
            checked:true
          }]
      },
      {title:"task2",
        checkList:[{
          name:"check1",
          checked:false
        },
          {
            name:"check2",
            checked:true
          },
          {
            name:"check3",
            checked:true
          },
          {
            name:"check4",
            checked:false
          }
          ,
          {
            name:"check5",
            checked:false
          }]
      },
      {title:"task2",
        checkList:[{
          name:"check1",
          checked:false
        },
          {
            name:"check2",
            checked:true
          },
          {
            name:"check3",
            checked:true
          },
          {
            name:"check4",
            checked:true
          },
          {
            name:"check4",
            checked:true
          },
          {
            name:"check4",
            checked:true
          }]
      }
    ]
  },
  getters: {
    allTasks(state){
      return state.tasks;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
