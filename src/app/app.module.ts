import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {TabMenuModule} from "primeng/tabmenu";
import {TokenStorageService} from "./services/token-storage.service";
import {AuthService} from "./services/auth.service";
import {CardsComponent} from './cards/cards.component';
import {TableModule} from "primeng/table";
import {CardsService} from "./services/cards.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RequestsComponent} from './requests/requests.component';
import {ReservedRoomsComponent} from './reserved-rooms/reserved-rooms.component';
import {AddCardComponent} from './cards/add-card/add-card.component';
import {TopUpCardComponent} from './cards/top-up-card/top-up-card.component';
import {AddRequestComponent} from './requests/add-request/add-request.component';
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {SelectButtonModule} from "primeng/selectbutton";
import {DialogModule} from "primeng/dialog";
import {RoomsComponent} from './rooms/rooms.component';
import {AddRoomComponent} from './rooms/add-room/add-room.component';
import {EditRoomComponent} from './rooms/edit-room/edit-room.component';
import {ViewingRequestComponent} from './requests/viewing-request/viewing-request.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    CardsComponent,
    RequestsComponent,
    ReservedRoomsComponent,
    AddCardComponent,
    TopUpCardComponent,
    AddRequestComponent,
    RoomsComponent,
    AddRoomComponent,
    EditRoomComponent,
    ViewingRequestComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'cards', component: CardsComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'reservedRooms', component: ReservedRoomsComponent},
      {path: 'cards/add', component: AddCardComponent},
      {path: 'cards/:id/topUp', component: TopUpCardComponent},
      {path: 'requests/add', component: AddRequestComponent},
      {path: 'rooms', component: RoomsComponent},
      {path: 'rooms/add', component: AddRoomComponent},
      {path: 'rooms/edit/:id', component: EditRoomComponent},
      {path: 'requests/:id/viewing', component: ViewingRequestComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    HttpClientModule,
    TableModule,
    ConfirmPopupModule,
    ToastModule,
    BrowserModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    CalendarModule,
    SelectButtonModule,
    DialogModule
  ],
  providers: [TokenStorageService, AuthService, CardsService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
