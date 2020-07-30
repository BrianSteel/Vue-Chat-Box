<template>
  <div class="chat container">
      <h2 class="center green-text">Chat Box</h2>
      <div class="card">
          <div class="card-content">
              <ul class="messages" v-chat-scroll>
                  <li v-for='message in messages' :key="message.id" :class = "[name === message.name? 'right-align':'']">
                      <span class="teal-text name">{{message.name}}- </span>
                      <span class="grey-text text-darken-3">{{message.content}}</span>
                      <span class="time grey-text">{{message.timestamp}}</span>
                  </li>
              </ul>
          </div>
          <div class="card-action">
              <message v-bind:name="name"></message>
          </div>
      </div>
      

  </div>
</template>

<script>
import Message from '@/components/Message';
import db from '@/firebase/init';
import moment from 'moment';
import vueChatScroll from 'vue-chat-scroll'
import Vue from 'vue'

//vue scroll autoscroll to the bottom of the page2
Vue.use(vueChatScroll);

export default {
    name: 'chat',
    components: {
        'message': Message
    },
    props:{
        name: String
    },
    data(){
        return{
            messages: []
        }
    },
    created(){
        //using firestore event listeners
        //gets data from collection
        //orderBy() lists the collection items (name, content) according to time created (by default they shuffled)
        //listen is now a collection which has method available onSnapshot()
        let listen = db.collection('messages').orderBy('timestamp');
        //do smth the snapshot collection
        listen.onSnapshot(snapshot => {
            //docChanges() because need the doc changes only 
            //method chaining with docChanges and forEach both inside the snapshot proto 
            snapshot.docChanges().forEach(change => {
                //the changes in the snapshot have a change type: added (this is a type of change)
                //only listen for "added" event types
                if(change.type === 'added'){
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        //doc.data() gets us the whole object we posted to firebase
                        name: doc.data().name,
                        content: doc.data().content,
                        //use moment.js to format the data
                        timestamp: moment(doc.data().timestamp).format('lll')
                    })

                }
            })
        })
    }
}
</script>

<style>
.chat h2{
    font-size: 2.6rem;
    margin-bottom: 2.5rem;
}

.chat span{
    font-size: 1.4rem;
}

.chat .time {
    display: block;
    font-size: 0.8rem;
}

.messages {
    max-height: 400px;
    overflow: auto;
}

li{
    margin-right: 1.5rem;
}

.messages::-webkit-scrollbar{
    width: 3px;
}

.messages::-webkit-scrollbar-track{
    background: #ddd;
}

.messages::-webkit-scrollbar-thumb{
    background: #aaa;
}

</style>