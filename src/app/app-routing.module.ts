import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditionComponent } from './components/edition/edition.component';
import { GraphComponent } from './components/graph/graph.component';
import { TableauComponent } from './components/tableau/tableau.component';
import { BeerDetailResolver } from './resolvers/beer-detail-resolver/beer-detail.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'tableau', component: TableauComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'edit/:id', component: EditionComponent, resolve: { beer: BeerDetailResolver } },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
