import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'home', component: HomepageComponent},
  {path:'user', component: UserComponent},
  {path:'', redirectTo:'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
