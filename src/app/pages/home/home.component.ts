import { PagerService } from './../../shared/page.service';
import { DataService, Diary, DiaryComment } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data$;
  postDiary: Diary = {
    img: "",
    title: ""
  };
  file: FileList;

  //paging
  pager: any = {};
  pagedItems: any[];
  selectedValue: number;


  isSubmit: boolean = false;
  constructor(public data: DataService, private pagerService: PagerService) { }

  ngOnInit() {
    this.data.getDiaries().subscribe(res => {
      this.data$ = res;
      this.setPage(1);
    });
    ;
  }



  Add() {
    this.isSubmit = true;
   if (this.postDiary.title == "") {
     this.isSubmit = false;
     alert("add message please");
     return;
   } else {
      this.data.AddDiary(this.postDiary, this.file).then(res => {
      if (res) {
        this.isSubmit = false;
        this.postDiary.title = '';
      }
    });
   }

  }

  fileChange(event) {
    this.file = event.target.files;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    window.scrollTo(0, 0);
    // get pager object from service
    this.pager = this.pagerService.getPager(this.data$.length, page);

    // get current page of items
    this.pagedItems = this.data$.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  handleAddComment(ev:DiaryComment){
    if (ev.message==null) {
      alert("add Comment please");
    } else {
     
     this.data.createComment(ev);
    }
   
  }


  open(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }



}
