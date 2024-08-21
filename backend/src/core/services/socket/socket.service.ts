import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

type TConnectedClient = {
  userId: number | null;
  clientId: string;
  socket: Socket;
};

@Injectable()
export class SocketService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly connectedClients: TConnectedClient[] = [];

  async handleConnection(socket: Socket): Promise<void> {
    const clientObject = {
      socket,
      clientId: socket.id,
      userId: null,
    };
    if (socket.handshake.auth.token) {
      try {
        const token = socket.handshake.auth.token.replace('Bearer ', '');
        const verify = await this.jwtService.verify(token, {
          secret: process.env.JWTKEY,
        });
        if (verify) {
          clientObject.userId = verify.id;
        }
      } catch (error) {
        socket.emit('error', { message: 'Invalid token' });
      }
    }

    this.connectedClients.push(clientObject);
    this.sendMessageToClient(clientObject.userId, 'authorized', {
      message: 'authorized',
    });
  }

  handleDisconnect(socket: Socket): void {
    const clientId = socket.id;
    const clientIndex = this.connectedClients.findIndex(
      (client) => client.clientId === clientId,
    );
    if (clientIndex > -1) {
      this.connectedClients.splice(clientIndex, 1);
    }
  }

  sendMessageToClient(userId, topic, data): void {
    const client = this.connectedClients.find(
      (client) => client.userId === userId,
    );
    if (client) {
      client.socket.emit(topic, JSON.stringify(data));
    }
  }

  sendNotificationToAllClients(event: string, data: any): void {
    this.connectedClients.forEach((client) => {
      client.socket.emit(event, JSON.stringify(data));
    });
  }
}
