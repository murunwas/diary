import { DataService } from './../../shared/data.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { sum, values, size } from 'lodash';

@Component({
  selector: 'like',
  template: `

 <p class="w3-left" *ngIf="userVote; then unfollowButton else followButton"></p>

<ng-template #followButton>
<small (click)="like()"><a><i class="fa fa-heart" aria-hidden="true" ></i> </a>  {{voteCount}}</small>

</ng-template>

<ng-template #unfollowButton>
<small (click)="dislike()"><a><i class="fa fa-heart" aria-hidden="true" style="color:red;"></i> </a>  {{voteCount}}</small>
</ng-template>
  `,
  styles: []
})
export class LikeComponent implements OnInit {
  @Input() userId;
  @Input() itemId;

  voteCount: number;
  userVote: boolean;

  subscription;

  constructor(private upvoteService: DataService) { }

  ngOnInit() {
    this.subscription = this.upvoteService.getItemVotes(this.itemId)
      .subscribe(upvotes => {

        if (this.userId) {
          this.userVote = upvotes[this.userId]
          this.voteCount = this.countFollowers(upvotes);

        }
      })


  }

  like() {

    let vote = true
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote)
  }

  dislike() {
    let vote = false
    this.upvoteService.updateUserVote(this.itemId, this.userId, vote)

  }

  private countFollowers(followers) {
    if (followers.$value === null) return 0
    else return size(followers)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
