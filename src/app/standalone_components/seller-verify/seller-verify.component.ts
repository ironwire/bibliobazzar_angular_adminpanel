import { Component, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SellerResponse } from '../seller-register/seller-reponse.model';

@Component({
  selector: 'app-seller-verify',
  standalone: true,
  imports: [],
  templateUrl: './seller-verify.component.html',
  styleUrl: './seller-verify.component.css',
})
export class SellerVerifyComponent {
  constructor(private storeService: StoreService, private router: Router) {}

  @Input() code = '';

  ngOnInit(): void {
    console.log(this.code);
    let sellerResponse = this.sellerEmailVerify({
      code: this.code,
    });
  }

  private sellerEmailVerify(request) {
    this.storeService.storeEmailVerify(request).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
