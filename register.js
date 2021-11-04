import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
let auth = getAuth()

export function createUser(email, password) {   
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

