const app = new Vue({
  el: '#app',
  data: {
    title: 'Home page',
    name: '',
    text: '',
    messages: '',
    memberId: '',
    chatGuy: '',
    socket: null,
  },
  methods: {
    goToChat() {
      this.$router.push('./chat')
    },
    receivedMessage(message) {
      this.message = ''
      this.name = ''
      this.message = message.content
      this.name = message.name + ' :'
    },
    chatroomUpdatedRegis() {
      const content = {
        receiverId: this.memberId
      }
      this.socket.emit('chatroomUpdated', content)
    },
  },
  created() {
    this.socket = io('http://localhost:80')
    this.socket.on('chatroomUpdated', (message) => {
      this.receivedMessage(message);
    })

  }
})