import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from 'firebase/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  users$: Observable<UserProfile[]>;
  allUsers: any = [];
  colRef: any;

  constructor(public dialog: MatDialog) {
    this.colRef = collection(this.firestore, 'users');
    this.users$ = collectionData(this.colRef, { idField: 'id' }) as Observable<UserProfile[]>;
    this.users$.subscribe((changes: any) => {
      this.allUsers = changes;
      console.log(changes);
    });
  }

  ngOnInit(): void {

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}


