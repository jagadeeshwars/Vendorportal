import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { NgToastService } from 'ng-angular-popup';



const socket = io(environment.media);

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    loginUrl: string = "auth/login";
    pipe = new DatePipe('en-US');
    private myFormattedDate: any;
    constructor(private router: Router, private toast: NgToastService,) {
        // socket = io(environment.socket_conn);
        const now = Date.now();
        this.myFormattedDate = this.pipe.transform(now, 'short');

        try {
          //  console.log(this.myFormattedDate + ': Connecting backend server... ', environment.media);
            if (!socket.connected) {
                socket.connect();
               // console.log(this.myFormattedDate + ': Connected to server - ', environment.media);
               // console.log(this.myFormattedDate + ': Socket ID - ', socket.id);

            }
            else {
               // console.log(this.myFormattedDate + ': Already connected to server - ', environment.media);
                //console.log(this.myFormattedDate + ': Socket ID - ', socket.id);
            }

         
            socket.on('connect', () => {
               // console.log(this.myFormattedDate + ': Listening the backend server - ', environment.media);
                //console.log(this.myFormattedDate + ': Socket ID - ', socket.id);

            });

            socket.on('logout', (data: any) => {
                
                let userid = this.getItem('userid');
                let sessionId = this.getItem('sessionId');

                console.log(data);
                console.log("userid", userid)
                console.log("sessionId", sessionId)

                if (userid?.toLowerCase() == data.UserID?.toLowerCase()) {
                    if (sessionId == data.sessionId) {
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('userid', '');
                            localStorage.setItem('token', '');
                            localStorage.setItem('active', 'false');
                            localStorage.setItem('sessionId', '');
                            localStorage.setItem('isLoggedin', 'false');
                        }
                        this.toast.info( "Info", 'You have been forcefully logged out' );
                        this.router.navigate([this.loginUrl]);
                    }
                }

            });
        } catch (error) {
            console.log('Error:', error);
        }
    }

    SocketConn() {
        if (!socket) {
            throw new Error('Socket.IO has not been initialized');
        }
        return socket;
    };

    getItem(key: string): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(key);
        } else {
            // Fallback for Node.js
            return null;
        }
    }
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

  
    connect() {

        socket.on('connect', () => {
            //console.log(this.myFormattedDate + ': Listening the backend server - ', environment.media);
           // console.log(this.myFormattedDate + ': Socket ID - ', socket.id);

        });
    }

 

}
