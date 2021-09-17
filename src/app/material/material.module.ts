import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatButtonModule, MatInputModule];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
