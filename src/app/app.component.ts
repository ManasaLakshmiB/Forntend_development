import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jsonObj: any;
  userCreationForm: any;
  constructor(private http: HttpClient, public fb: FormBuilder) { }
  ngOnInit(): void {
    this.http.get<any>('https://frontend-take-home.fetchrewards.com/form').subscribe(data => {
     this.jsonObj = data;
    })
    this.userCreationForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      occupation: ['', [Validators.required]],
      state: ['',[Validators.required]],
    });
  }
  
  onSubmit() {
    if (this.userCreationForm.invalid) {
      return;
    }
    let data = {
      "name": this.userCreationForm.value.fullname,
      "email": this.userCreationForm.value.email,
      "password": this.userCreationForm.value.password,
      "occupation": this.userCreationForm.value.occupation,
      "state": this.userCreationForm.value.state
    }
    this.http.post<any>('https://frontend-take-home.fetchrewards.com/form', data).subscribe(data => {
      if (data) {
        alert("You form is submitted");
      }
    })
    this.userCreationForm.reset();
  }
}



