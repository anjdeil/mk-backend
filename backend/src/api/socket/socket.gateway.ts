import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SocketService } from '../../core/services';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket): void {
    this.socketService.handleDisconnect(socket);
  }
}
