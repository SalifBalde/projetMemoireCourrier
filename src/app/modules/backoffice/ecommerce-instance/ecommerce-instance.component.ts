import { Component, OnInit } from '@angular/core';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';

@Component({
    selector: 'app-ecommerce-instance',
    templateUrl: './ecommerce-instance.component.html',
})
export class EcommerceInstanceComponent implements OnInit {
    ecommerce: EcommerceDto[] = [];
    loading: boolean = false;

    constructor(private ecommerceService: EcommerceService) {}

    ngOnInit() {
        this.loadEcommerceData();
    }
    
    loadEcommerceData() {
        this.loading = true;

        Promise.allSettled([
            this.ecommerceService.findEcommerceEnInstance().toPromise(),
            this.ecommerceService.findEcommerceReturn().toPromise()
        ]).then(results => {
            const instances = results[0].status === 'fulfilled' ? results[0].value || [] : [];
            const returns = results[1].status === 'fulfilled' ? results[1].value || [] : [];

            this.ecommerce = [...instances, ...returns];
            this.loading = false;

        }).catch(error => {
            this.loading = false;
            console.error('Erreur de chargement des données', error);
        });
    }

}
