import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public user: User | undefined;

  constructor(public afAuth: AngularFireAuth) { }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    }
    catch (error) {
      console.log(error);
      return false;
    }

  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }
  async logout() {
    this.afAuth.signOut();
  }
  async getCurrentUser() {
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async changePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string) {
    let currentUser: User | null = firebase.auth().currentUser;
    let result = "";
    if (currentUser != null) {
      let userEmail: string = "";
      if (currentUser.email != null) {
        userEmail = currentUser.email;
      }
      else {
        result = "No se puede cambiar la contraseña sin iniciar sesión.";
      }
      const credentials = firebase.auth.EmailAuthProvider.credential(userEmail, oldPassword);
      await currentUser.reauthenticateWithCredential(credentials).then(
        async function () {
          if (newPassword != newPasswordConfirm) {
            result = "La confirmación de contraseña no coincide.";
          }
          else if (newPassword.length < 6) {
            result = "Asegurate de que la contraseña tiene minimo 6 caracteres.";
          }
          else {
            await currentUser?.updatePassword(newPassword).then(
              function () {
                result = 'La contraseña se actualizo correctamente.';
              }).catch(function (error: any) {
                console.log(error)
                result = error;
              });
          }
        }).catch(
          function (error) {
            console.log(error);
            if (error.code === "auth/wrong-password") {
              result = "La contraseña actual no es correcta.";
            }
            else if (error.code === "auth/too-many-requests"){
              result = "Lo sentimos no puedes cambiar la contraseña ahora, has hecho muchos intentos fallidos, te recomendamos cerrar sesión y restablecer la contraseña."
            }else {
              result = error;
            }
          });
    }
    else {
      result = "No se puede cambiar la contraseña sin iniciar sesión.";
    }
    return result;
  }
  async sendEmailToResetPassword(emailToSend: string) {
    return await this.afAuth.sendPasswordResetEmail(emailToSend).then(
      success => {
        return true;
      },
      error => {
        return false;
      }
    );
  }

}
