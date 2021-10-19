import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Courier } from "../entities/courier";
import { ApiService } from "./api.service";
import { CourierForUpdate } from "../entities/courierForUpdate";

@Injectable({
  providedIn: "root",
})
export class CourierService {
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  add(courier: Courier) {
    courier.user_id = this.authService.getCurrentUserId();
    return this.apiService.post("/courier", courier);
  }
  update(courier: CourierForUpdate) {
    courier.user_id = this.authService.getCurrentUserId();
    return this.apiService.put("/courier", courier);
  }

  addNonPackageCourier(courier: Courier) {
    courier.user_id = this.authService.getCurrentUserId();
    return this.apiService.post("/nopackage/courier", courier);
  }
  updateNonPackageCourier(courier: CourierForUpdate) {
    courier.user_id = this.authService.getCurrentUserId();
    return this.apiService.put("/nopackage/courier", courier);
  }

  getAll() {
    return this.apiService.get(
      "/courier/" + this.authService.getCurrentUserId()
    );
  }
}
