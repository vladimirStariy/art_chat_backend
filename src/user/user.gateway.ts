import { 
  WebSocketGateway, 
  SubscribeMessage, 
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from 'socket.io'
import { UserService } from "./user.service";

@WebSocketGateway({
  cors: true,
  namespace: '/user'
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private userService: UserService
  ) {}
  
  @WebSocketServer() server: Server;
  private connectedClients: Socket[] = [];
  handleConnection(client: Socket) {
    console.log('client connected') 
    this.connectedClients.push(client)
  }
  handleDisconnect(client: Socket) { this.connectedClients.splice(this.connectedClients.indexOf(client), 1) }
  
  @SubscribeMessage('messageToServer')
  async handleSendMessage(client: Socket, message: { room: string; text: string;}) {
    await this.server.to(message.room).emit('messageToServer', {
      message: message.text, 
      client: client.id
    })
  }
  
  @SubscribeMessage('leaveChat')
  handleLeaveChar(client: Socket, room: string) {
    client.leave(room);
    client.emit('leaveRoom', room)
  }
  
  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedChat', room)
  }
}