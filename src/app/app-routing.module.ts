import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { OrdersComponent } from "./dashboard/orders/orders.component";
import { TracksComponent } from "./dashboard/tracks/tracks.component";
import { BasketsComponent } from "./dashboard/baskets/baskets.component";
import { TransactionsComponent } from "./dashboard/transactions/transactions.component";
import { SettingsComponent } from "./dashboard/settings/settings.component";
import { LoginGuard } from "./login/login.guard";
import { AlreadyLoggedInGuard } from "./login/already-logged-in.guard";
import { AddOrderComponent } from "./dashboard/orders/add-order/add-order.component";
import { CourierComponent } from "./dashboard/courier/courier.component";
import { HomeComponent } from "./home/home.component";
import { ArticlesComponent } from "./articles/articles.component";
import { ArticleComponent } from "./article/article.component";
import { OurServicesComponent } from "./our-services/our-services.component";
import { ExternalStorageComponent } from "./our-services/external-storage/external-storage.component";
import { AboutUsComponent } from "./our-services/about-us/about-us.component";
import { ShippingComponent } from "./our-services/shipping/shipping.component";
import { RulesComponent } from "./our-services/rules/rules.component";
import { MissionComponent } from "./our-services/mission/mission.component";
import { ShopsComponent } from "./shops/shops.component";
import { ContactComponent } from "./contact/contact.component";
import { CommercialComponent } from "./contact/commerical/commercial.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordReturnComponent } from "./reset-password-return/reset-password-return.component";
import { PaymesReturnComponent } from "./dashboard/transactions/paymes-return/paymes-return.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "articles", component: ArticlesComponent },
  { path: "article/:id", component: ArticleComponent },
  { path: "our-services", component: OurServicesComponent },
  { path: "our-services/about-us", component: AboutUsComponent },
  {
    path: "our-services/external-storage",
    component: ExternalStorageComponent,
  },
  { path: "our-services/shipping", component: ShippingComponent },
  { path: "our-services/rules", component: RulesComponent },
  { path: "our-services/mission", component: MissionComponent },
  { path: "shops", component: ShopsComponent },
  { path: "contact", component: ContactComponent },
  { path: "contact/commercial", component: CommercialComponent },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AlreadyLoggedInGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AlreadyLoggedInGuard],
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
    canActivate: [AlreadyLoggedInGuard],
  },
  {
    path: "reset-password-return/:token",
    component: ResetPasswordReturnComponent,
    canActivate: [AlreadyLoggedInGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/orders",
    component: OrdersComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/orders/add-order",
    component: AddOrderComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/tracks",
    component: TracksComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/baskets",
    component: BasketsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/couriers",
    component: CourierComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/transactions",
    component: TransactionsComponent,
    canActivate: [LoginGuard],
  },
  {
    path:
      "dashboard/transactions/paymes/return/:message/:return_type/:invoice_path/:amount/:currency/:user_id",
    component: PaymesReturnComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "dashboard/settings",
    component: SettingsComponent,
    canActivate: [LoginGuard],
  },
  { path: "**", redirectTo: "", pathMatch: "full" }, // 404 sehifesi gelecek
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
