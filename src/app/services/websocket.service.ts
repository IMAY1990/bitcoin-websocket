import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: Subject<MessageEvent>;
  public websocket: WebSocket;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  public send(message: any): void {
    this.websocket.send(message);
  }

  public closeSocket(): void {
    if (this.websocket !== undefined) {
      this.websocket.close();
    }
  }

  private create(url: string): Subject<MessageEvent> {
    this.websocket = new WebSocket(url);
    const observable = Observable.create((observer: Observer<MessageEvent>) => {
      this.websocket.onopen = observer.next.bind(observer);
      this.websocket.onmessage = observer.next.bind(observer);
      this.websocket.onerror = observer.next.bind(observer);
      this.websocket.onclose = observer.next.bind(observer);
      return this.websocket.close.bind(this.websocket);
    });

    let observer = {
      next: (data: any) => {
        if (this.websocket.readyState === WebSocket.OPEN) {
          console.info(data)
          this.websocket.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
