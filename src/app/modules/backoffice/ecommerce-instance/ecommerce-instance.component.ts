import { Component, OnInit } from '@angular/core';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';

@Component({
    selector: 'app-ecommerce-instance',
    templateUrl: './ecommerce-instance.component.html',
})
export class EcommerceInstanceComponent implements OnInit {
    ecommerce: EcommerceDto[] = [];
    loading: boolean =false;
    constructor(
        private ecommerceService: EcommerceService
    ) { }

    ngOnInit() {
        this.getAllEcommerceInstance()
    }

    getAllEcommerceInstance() {
        this.loading=true
        this.ecommerceService.findEcommerceEnInstance().subscribe((result) => {
            this.ecommerce = result;
            this.loading=false
            console.log(result);
        })
    }
}
