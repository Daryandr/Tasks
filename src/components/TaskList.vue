<template>
<v-container>

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
            }]
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>

</style>