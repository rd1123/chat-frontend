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
      this.message = message.text
      this.name = message.name + ' :'
    },
    chatroomListRegis() {
      const content = {
        memberId: this.memberId
      }
      this.socket.emit('chatroomList', content)
    },
  },
  created() {
    this.socket = io('http://localhost:80')
    this.socket.on('chatroomUpdatedClient', (message) => {
      this.receivedMessage(message);
    })

  }
})