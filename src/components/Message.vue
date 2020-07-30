<template>
  <div class="message">
      <form @submit.prevent = "addText">
          <label for="new-text">Press Enter to add message:</label>
          <input type="text" name="new-text" v-model="message">
          <p v-if='feedback' class="red-text">{{ feedback }}</p>
      </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'message',
    props: {
        name: String
    },
    data(){
        return{
            message: null,
            feedback: null
        }
    },
    methods: {
        addText(){
           if(this.message){
               //connects to the firestore: here it posts the data to the collection
               db.collection('messages').add({
                   content: this.message,
                   name: this.name,
                   timestamp: Date.now()
               }).catch(err => {
                   this.feedback = err;
               })
               this.message = null;
               this.feedback = null;
           }else{
               this.feedback = "Must Enter A Message" 
           }
        }
    }
}
</script>

<style>

</style>