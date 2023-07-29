import {createStore} from 'vuex'
import {apolloClient} from '@/client/ApolloClient'
import {TASKS} from '@/graphql/tasks'
import {DEL_TASK} from "@/graphql/delete_task";
import {EDIT_TASK} from "@/graphql/edit_task";
import {ADD_TASK} from "@/graphql/add_task";
import {Task} from "@/types/BasicTypes"

export default createStore({
    state: {
        tasks: [] as Task[]
    },
    getters: {
        getTask: (state) => (index: number) => {
            return state.tasks[index];
        }
    },
    mutations: {
        setTasks(state, taskList: Task[]) {
            state.tasks = taskList;
        },
        delTask(state, index: number) {
            state.tasks.splice(index, 1);
        },
        addTask(state, task: Task) {
            state.tasks.unshift(task);
        },
        editTask(state, payload) {
            state.tasks.splice(payload.taskId, 1, payload.task);
        }
    },
    actions: {
        async fetchTasks({commit}) {
            const tasks = localStorage.getItem('tasks');
            if (tasks != null) {
                commit('setTasks', JSON.parse(tasks));
            } else {
                try {
                    const response = await apolloClient.query({query: TASKS});
                    commit('setTasks', [...response.data.tasklist.tasks]);
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async delTask({commit}, payload) {
            try {
                await apolloClient.mutate({mutation: DEL_TASK, variables: {taskId: payload}});
            } catch (err) {
                console.log(err);
            }
            commit('delTask', payload);
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        },
        async editTask({commit}, payload) {
            try {
                await apolloClient.mutate({
                    mutation: EDIT_TASK,
                    variables: {taskId: payload.taskId, task: payload.task}
                });
            } catch (err) {
                console.log(err);
            }
            commit('editTask', payload);
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        },
        async addTask({commit}, payload) {
            try {
                await apolloClient.mutate({mutation: ADD_TASK, variables: {task: payload}});
            } catch (err) {
                console.log(err);
            }
            commit('addTask', payload);
            localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        }
    }
})
