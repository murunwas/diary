import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

export interface Diary {
    title?: string,
    img?: string,
    date?: any,
    user?: string,
    avatar?: string,
    uid?: string
}

export interface DiaryComment {
    message?: string,
    date?: any,
    user?: string,
    avatar?: string,
    key?: string
}



@Injectable()
export class DataService {
    user: firebase.User = null;
    comments$: FirebaseListObservable<DiaryComment[]> = null;
    constructor(private http: Http, private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
        afAuth.authState.subscribe(auth => {
            this.user = auth;
        });
    }

    getDiaries() {
        return this.db.list('/diary').map((array) => array.reverse()) as FirebaseListObservable<any[]>;;
    }

    //add Diary
    AddFile(file) {

        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let headers = new Headers();

        let options = new RequestOptions({ headers: headers });

        return this.http.post("http://sengani.ga/index.php", formData, options).map(res => res.json());
    }


    AddDiary(diary: Diary, file) {
     
      var user = firebase.auth().currentUser;
        diary.user = user != null ? user.displayName.split(" ", 1).toString() : "";
        diary.avatar = user != null ? user.photoURL : "";
        diary.date = firebase.database.ServerValue.TIMESTAMP;
        diary.uid = user.uid;

        var promise = new Promise((resolve, reject) => {

            if (file != null) {
                this.AddFile(file.item(0)).subscribe(res => {
                    if (res.status) {
                        diary.img = `http://sengani.ga/uploads/${res.generatedName}`;
                    } else {
                        diary.img = "";
                    }
                    // this.Notification(diary.title);
                    this.db.list('/diary').push(diary).then((item) => { resolve(true) });
                });

            } else {
                //this.Notification(diary.title);
                this.db.list('/diary').push(diary).then((item) => { resolve(true) });
            }

        });

        return promise;

    }



    //login
    login() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.router.navigate(["/"]));
    }

    Fblogin() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => this.router.navigate(["/"]));
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    get isLoggedIn(): boolean {
        return this.user !== null;
    }

    get currentUserId(): string {
        return this.isLoggedIn ? this.user.uid : '';
    }

    currentUserObservable(): any {
        return this.afAuth.authState
    }

    get DisplayName(): string {
        return this.isLoggedIn ? this.user.displayName.split(" ", 1).toString() : 'Guest'

    }

    get avatar(): string {
        return this.isLoggedIn ? this.user.photoURL : 'Guest'

    }

    get email(): string {
        return this.isLoggedIn ? this.user.email : 'Guest'

    }

    //Comments
    getCommentsList(diarykey: string): FirebaseListObservable<DiaryComment[]> {
        if (!this.user) return;
        this.comments$ =  this.db.list(`diaryComments/${diarykey}`);
           return this.comments$;
    }

    createComment(comment: DiaryComment) {
          var user = firebase.auth().currentUser;
        comment.user = user != null ? user.displayName.split(" ", 1).toString() : "";
        comment.avatar = user != null ? user.photoURL : "";
        comment.date = firebase.database.ServerValue.TIMESTAMP;
        
        this.db.list(`diaryComments/${comment.key}`).push(comment)
    }

        ///Likes
    getItemVotes(itemId): FirebaseObjectObservable<any> {
        // Gets total votes
        return this.db.object(`likes/${itemId}`)
    }

    updateUserVote(itemId, userId, vote): void {
        // Creates or updates user's vote
        let data = {}
        data[userId] = vote;

        if (vote) {
            
            this.db.object(`likes/${itemId}`).update(data)
        } else {
            this.db.object(`likes/${itemId}/${userId}`).remove()
        }

    }

    getCountVotes(itemId) {
        return this.db.object(`likes/${itemId}/count`)

    }

}
