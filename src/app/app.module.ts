import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeAz from '@angular/common/locales/az-Latn';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertifyService } from './services/alertify.service';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { TracksComponent } from './dashboard/tracks/tracks.component';
import { BasketsComponent } from './dashboard/baskets/baskets.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { LoginGuard } from './login/login.guard';
import { RegisterGuard } from './register/register.guard';
import { AlreadyLoggedInGuard } from './login/already-logged-in.guard';
import { DashboardNavComponent } from './dashboard/dashboard-nav/dashboard-nav.component';
import { AddOrderComponent } from './dashboard/orders/add-order/add-order.component';
import { UserService } from './services/user.service';
import { TrackModalComponent } from './dashboard/tracks/track-modal/track-modal.component';
import { TransactionService } from './services/transaction.service';
import { BoxComponent } from './dashboard/box/box.component';
import { AddBasketComponent } from './dashboard/baskets/add-basket/add-basket.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TrackDetailsComponent } from './dashboard/tracks/track-details/track-details.component';
import { CourierComponent } from './dashboard/courier/courier.component';
import { PaymentService } from './services/payment.service';
import { SafePipe } from './safe.pipe';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { PartnersComponent } from './partners/partners.component';
import { OwlModule } from 'ngx-owl-carousel';
import { OurServicesComponent } from './our-services/our-services.component';
import { AboutUsComponent } from './our-services/about-us/about-us.component';
import { ExternalStorageComponent } from './our-services/external-storage/external-storage.component';
import { ShippingComponent } from './our-services/shipping/shipping.component';
import { RulesComponent } from './our-services/rules/rules.component';
import { ShopsComponent } from './shops/shops.component';
import { ContactComponent } from './contact/contact.component';
import { CommercialComponent } from './contact/commerical/commercial.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordReturnComponent } from './reset-password-return/reset-password-return.component';
import { PaymesReturnComponent } from './dashboard/transactions/paymes-return/paymes-return.component';
import { MissionComponent } from './our-services/mission/mission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CopyClipboardModule } from './directives/copy-clipboard.module';

registerLocaleData(localeAz, 'az');

// @ts-ignore
// @ts-ignore
@NgModule({
	declarations: [
		AppComponent,
		SafePipe,
		NavComponent,
		RegisterComponent,
		LoginComponent,
		SidebarComponent,
		DashboardComponent,
		OrdersComponent,
		TracksComponent,
		BasketsComponent,
		TransactionsComponent,
		SettingsComponent,
		DashboardNavComponent,
		AddOrderComponent,
		TrackModalComponent,
		BoxComponent,
		AddBasketComponent,
		TrackDetailsComponent,
		CourierComponent,
		SafePipe,
		FooterComponent,
		HomeComponent,
		ArticlesComponent,
		ArticleComponent,
		PartnersComponent,
		OurServicesComponent,
		AboutUsComponent,
		ExternalStorageComponent,
		ShippingComponent,
		RulesComponent,
		ShopsComponent,
		ContactComponent,
		CommercialComponent,
		ResetPasswordComponent,
		ResetPasswordReturnComponent,
		PaymesReturnComponent,
		MissionComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgbModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		NgxSpinnerModule,
		NgSelectModule,
		CountdownModule,
		FileUploadModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ HttpClient ]
			}
		}),
		// AgmCoreModule.forRoot({
		//   apiKey: 'AIzaSyBJ7SpQeFZ174AuXvexuMALZH4aDjAp5ew'
		// }),
		ToastrModule.forRoot({
			preventDuplicates: true,
			closeButton: true,
			progressBar: true
		}),
		OwlModule,
		CopyClipboardModule
	],
	providers: [
		Title,
		AlertifyService,
		LoginGuard,
		RegisterGuard,
		AlreadyLoggedInGuard,
		UserService,
		TransactionService,
		PaymentService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}
