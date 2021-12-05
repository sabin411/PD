import firebase from "../firebase/clientApp";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// configure firebaseUI
const uiConfig = {
  // redirect to / after sign in is successful. Alternatively you can provide a callback
  signInSuccessUrl: "/",
  // We will display git as auth providers.
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};
function SignInScreen() {
  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Fun Olympic</h1>
      <p>Please sign-in</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
