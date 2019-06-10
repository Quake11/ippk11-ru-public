import { MetaService } from '@ngx-meta/core';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { IParallaxScrollConfig } from 'ng2-parallaxscroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  title = 'ippk11';

  config: IParallaxScrollConfig = {
    axis: 'Y',
    speed: 0.12,
  };

  constructor(private meta: MetaService) {}

  ngOnInit() {
    this.meta.setTitle(
      'Дистанционное обучение для работников агропромышленного комплекса'
    );
    this.meta.setTag(
      'description',
      'Дистанционные курсы для работников агропромышленного комплекса'
    );
    this.meta.setTag('og:image', 'https://ippk11.ru/assets/intro.jpg');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:url', 'https://ippk11.ru');
    this.meta.setTag(
      'og:site_name',
      'Сайт дистанционных курсов института ПП и ПК работников агропромышленного комплекса Республики Коми'
    );
    this.meta.setTag('robots', 'index, follow');
  }
}
