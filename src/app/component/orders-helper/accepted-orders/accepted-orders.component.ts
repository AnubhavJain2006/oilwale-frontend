import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { OrderGet } from 'src/app/interface/order-get';
import { OrderUpdate } from 'src/app/interface/utilities/order-update';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent implements OnInit {

  @Input() orders!: OrderGet[];
  @Input() loading!: boolean;
  @Output() completeEvent:EventEmitter<string> = new EventEmitter<string>();
  
  // utils 
  addNoteOrderId: string = "Not set";
  addNoteNote: string = "";
  
  acceptOrderResponse!: OrderUpdate;

  addNoteLoadingFlag: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  completeOrder(order: OrderGet) {
    order.status = -999;
    // this.acceptOrderFlag = true;
    this.orderService.completeOrder(order.orderId).subscribe((data) => {
      this.acceptOrderResponse = data;
      console.log(this.acceptOrderResponse);
      // this.acceptOrderFlag = false;
      this.completeEvent.emit();
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

        document.getElementById("notesModalCloseBtn1")?.click();
      }
    })
  }


}
