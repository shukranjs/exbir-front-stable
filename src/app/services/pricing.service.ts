import { Injectable } from "@angular/core";
// import { CalcMembers } from "../home/welcome/calcMembers";
import { NgForm } from "@angular/forms";

@Injectable()
export class PricingService {
  constructor() {}
  // calcu(calcMembers:CalcMembers): number {
  //   let cost1 = 0,
  //     cost2 = 0,
  //     cost = 0;
  //   if (
  //     calcMembers.height +
  //       calcMembers.width +
  //       calcMembers.length >=
  //       100 &&
  //     calcMembers.height >= 10 &&
  //     calcMembers.width >= 10 &&
  //     calcMembers.length >= 10
  //   ) {
  //     cost1 =
  //       ((calcMembers.height *
  //         calcMembers.width *
  //         calcMembers.length) /
  //         8000) *
  //       4;
  //   }
  //   if (calcMembers.weight <= 0.5) {
  //     cost2 = 3;
  //   } else if (calcMembers.weight <= 1) {
  //     cost2 = 4;
  //   } else {
  //     cost2 = calcMembers.weight * 4;
  //   }
  //   if (cost1 < cost2) cost = cost2;
  //   else cost = cost1;
  //   return cost;
  // }
}
