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
        // this.text = ''
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
    chatroomJoin() {
      const content = {
        chatGuy: this.chatGuy,
        member: this.name,
      }
      this.socket.emit('chatroomJoin', content)
    },
    receivedMessage(message) {
      this.messages.push(message)
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0
    },
    // choseChatGuy() {
    //   this.chatGuy = chatGuy
    // }
  },
  created() {
    this.socket = io('http://localhost:80')
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
    })

  }
})