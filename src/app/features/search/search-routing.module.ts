import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SearchResolver } from './search.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      dataLoaded: SearchResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
