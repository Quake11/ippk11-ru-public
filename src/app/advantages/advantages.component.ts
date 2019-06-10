import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss'],
})
export class AdvantagesComponent implements OnInit {
  advantages = [
    {
      name: 'Доступность учебных материалов',
    },
    {
      name: 'Удобное расписание занятий и экзаменов',
    },
    {
      name: 'Большой выбор курсов',
    },
    {
      name: 'Низкая стоимость обучения',
    },
    {
      name: 'Высокое качество получаемых знаний',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
