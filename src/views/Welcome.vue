<template>
  <div class="welcome container">
    <div class="card blue-grey lighten-5">
      <div class="card-content center-align">
        <h2 class="blue-grey-text">Welcome</h2>
        <form @submit.prevent="enterChatBox">
          <label for="name">Enter Your Name:</label>
          <input type="text" name="name" v-model="name">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn blue-grey">Enter Chat Box</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  methods:{
    //function created to route the welcome component to the chat component
    enterChatBox(){
      if(this.name){
        //has two jobs
        //no 1: name: chat (see in router's index.js) redirects to the chat page
        //params option has the name key that takes this.name value to be sent as a prop
        this.$router.push({ name:'chat', params: { name: this.name } })
      }else{
        //feedback to users to dont put in the name
        this.feedback = "You must enter a name to join chat"
      }
    }
  }
};
</script>

<style>
.welcome{
  max-width: 25rem;
  margin-top: 6.25rem;
}

.welcome h2{
  font-size: 3rem;
}

.welcome button{
  margin: 2rem auto;
}
</style>
