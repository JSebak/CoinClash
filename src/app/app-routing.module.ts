import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './modules/Charts/chart.component';
import { dashboard } from './modules/Dashboard/dashboard.component';
import { NewsSection } from './modules/Section/news.component';

const routes: Routes = [
  { path: 'dashboard', component: dashboard },
  { path: 'news', component: NewsSection },
  { path: 'chart', component: ChartComponent },
  // {path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
