import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NullReplacerPipe } from './pipe/null-replacer.pipe';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NullReplacerPipe],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, HeaderComponent, NullReplacerPipe],
})
export class SharedModule {}
