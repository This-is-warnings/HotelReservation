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
import {UsersComponent} from './users/users.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {ClientGuard} from "./guards/client.guard";


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
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

          {path: '', redirectTo: '/login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
          {path: 'home', component: HomeComponent,canActivate: [AuthGuard]},
          {path: 'requests', component: RequestsComponent,canActivate: [AuthGuard]},
          {path: 'reservedRooms', component: ReservedRoomsComponent,canActivate: [AuthGuard]},
          {path: 'cards', component: CardsComponent,canActivate: [AuthGuard]},
          {path: 'cards/add', component: AddCardComponent,canActivate: [AuthGuard]},
          {path: 'cards/:id/topUp', component: TopUpCardComponent,canActivate: [AuthGuard]},
          {path: 'requests/add', component: AddRequestComponent,canActivate: [AuthGuard]},
          {path: 'rooms', component: RoomsComponent,canActivate: [AuthGuard]},
          {path: 'rooms/add', component: AddRoomComponent,canActivate: [AuthGuard]},
          {path: 'rooms/edit/:id', component: EditRoomComponent,canActivate: [AuthGuard]},
          {path: 'requests/:id/viewing', component: ViewingRequestComponent,canActivate: [AuthGuard]},
          {path: 'users', component: UsersComponent,canActivate: [AuthGuard, AdminGuard]},
          {path: 'users/edit/:id', component: EditUserComponent,canActivate: [AuthGuard,AdminGuard]},
          {path: 'users/add', component: AddUserComponent,canActivate: [AuthGuard,AdminGuard]}

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
  providers: [ClientGuard, AdminGuard, AuthGuard, TokenStorageService, AuthService, CardsService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
