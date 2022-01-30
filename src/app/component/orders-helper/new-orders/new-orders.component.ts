import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';
import { OrderUpdate } from 'src/app/interface/utilities/order-update';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;
  @Output() acceptEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() declineEvent: EventEmitter<string> = new EventEmitter<string>();

  acceptOrderResponse!: OrderUpdate;
  // auxAcceptanceArray: boolean[]

  // utils 
  addNoteOrderId: string = "Not set";
  addNoteNote: string = "";

  // flag
  acceptOrderFlag: boolean = false;
  declineOrderFlag: boolean = false;
  addNoteLoadingFlag: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    console.log( "new" + this.orders);
  }

  acceptOrder(order: OrderGet) {
    order.status = -999;
    this.acceptOrderFlag = true;
    this.orderService.acceptOrder(order.orderId).subscribe((data) => {
      this.acceptOrderResponse = data;
      console.log(this.acceptOrderResponse);
      this.acceptOrderFlag = false;
      this.acceptEvent.emit();
    })
  }

  declineOrder(order: OrderGet) {
    order.status = -999;
    this.declineOrderFlag = true;
    this.orderService.declineOrder(order.orderId).subscribe((data) => {
      this.acceptOrderResponse = data;
      console.log(this.acceptOrderResponse);
      this.declineOrderFlag = false;
      this.declineEvent.emit();
    })
  }

  setAddNoteModel(orderId: string, note: string) {
    this.addNoteOrderId = orderId;
    this.addNoteNote = note;
  }

  addNoteToOrder(orderId: string, note: string) {
    this.addNoteLoadingFlag = true;
    this.orderService.addNoteToOrder(orderId, note).subscribe({
      next: data => {
        console.log(data);

        for ( let i=0; i< this.orders.length; i++) {
          if (this.orders[i].orderId == orderId) {
            this.orders[i].notes = data.notes;
            break;
          }
        }

        document.getElementById("notesModalCloseBtn")?.click();

      }
    })
  }

}
