import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "./services/websocket.service";
import { IBitcoin } from "./interfaces/bitcoin.interface";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public bitcoin: IBitcoin;

  public model: { command: any };
  constructor(private wsService: WebsocketService) {
    this.model = {
      command: ""
    };
  }

  ngOnInit(): void {
    this.wsService
      .connect("wss://ws.blockchain.info/inv")
      // this.wsService.connect("ws://echo.websocket.org")
      .subscribe(
        // data => this.data.push(data.data),
        response => {
          if (response.data !== undefined) {
            // console.info(JSON.parse(response.data).x);
            this.bitcoin = JSON.parse(response.data).x;
          }
        },
        error => console.info(error)
      );
  }

  send(): void {
    this.wsService.send(JSON.stringify(this.model.command));
  }

  onclick(value: any): void {
    this.wsService.send(JSON.stringify(value));
  }
}
