import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'generated-list',
    loadComponent: () =>
      import(
        './random-integer-generator/generated-list/generated-list.component'
      ).then((m) => m.GeneratedListComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
