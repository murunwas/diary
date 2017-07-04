import { DataService, Diary, DiaryComment } from './../../shared/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

@Input() index;
@Input() diaryKey;
@Output() writeComment: EventEmitter<any> = new EventEmitter<any>();
 comments: DiaryComment[] = [];
 message;
 commentlength;
 subscription

  constructor(public data: DataService) { };

  ngOnInit() {
   this.subscription= this.data.getCommentsList(this.diaryKey).subscribe(data=>{
        this.comments = data;
        this.commentlength = data.length.toString()
    });
  };

   addComment(){
     this.writeComment.emit({
       message: this.message,
       key: this.diaryKey
     });

     this.message = "";
  };

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
