import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './../hero/hero';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>(); //生成了一个产生字符串的Observable（可观察对象）用作按名称搜索的过滤条件

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term); //每次调用search()方法时都会把新字符串放进可观察的流中。
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)        // 在传出最终字符串之前，搜索事件将会等待
      .distinctUntilChanged()   // 确保过滤条件发生变化时才发送请求，避免重复请求同一个搜索词
      .switchMap(term => term   // 它会取消并丢弃以前的搜索可观察对象，只保留最近的
        ? this.heroSearchService.search(term)
        : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
