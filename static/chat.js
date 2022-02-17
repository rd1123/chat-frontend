const app = new Vue({
  el: '#app',
  data: {
    title: 'Nestjs Websockets Chat',
    name: '',
    text: '',
    messages: [],
    chatGuy: '',
    socket: null
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          member: this.name,
          chatGuy: this.chatGuy,
          content: this.text,
          type: 'text',
        }
        this.socket.emit('chatroomMessage', message);
      }
    },
    chatroomUpdated() {
      const content = {
        receiverId: this.chatGuy,
        text: this.text
      }
      this.socket.emit('chatroomUpdated', content)
      this.text = ''
    },
    receivedMessage(message) {
      this.messages.push(message)
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0
    },
  },
  created() {
    this.socket = io('http://localhost:80')
    this.socket.on('chatroomMessage', (message) => {
      this.receivedMessage(message)
    })

  }
})