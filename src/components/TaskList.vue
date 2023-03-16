<template>
<v-container>
  <v-row>
    <v-col class="border mb-3" cols="3">Задание</v-col>
    <v-col class="border mb-3" cols="9">Задачи</v-col>
  </v-row>
  <div v-for="(task,index) in tasks" :key="index">
  <v-row>
    <v-col class="border mb-3" cols="3">{{task.title}}</v-col>
    <v-col class="border mb-3" cols="9">
      <div v-for="(check,index) in task.checkList.slice(0,3)" :key="index">
        <v-checkbox class="mb-n5" v-model="check.checked" disabled :label="check.name"></v-checkbox>
      </div>
      <span class="ml-3 text-grey" v-if="task.checkList.length>3">...
        <v-tooltip activator="parent" location="end">
          <div v-for="(check,index) in task.checkList.slice(3)" :key="index">
            <v-checkbox class="mb-n5" v-model="check.checked" disabled :label="check.name"></v-checkbox>
          </div>
        </v-tooltip></span>
    </v-col>
  </v-row>
  </div>
</v-container>
</template>

<script>
export default {
  name: "TaskList",
  data () {
    return {
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
            }]
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>

</style>