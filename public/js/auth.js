const authWrapper = document.querySelector('.auth');
const authModal = document.querySelector('.auth .modal');
const loginButton = document.querySelector('.loginButton');
const signOut = document.querySelector('.signOut');
const db = firebase.firestore();
const userRef = db.collection('user');

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        authWrapper.classList.remove('open');
        authModal.classList.remove('active');
        showLoginUserName(user);
    } else {
        authWrapper.classList.add('open');
        authModal.classList.add('active');
    }
});

signOut.addEventListener('click', e => {
    firebase.auth().signOut();
});

loginButton.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            showLoginUserName(user);
            const userUid = user.uid;
            const query = userRef.where('uid', '==', userUid);
            query.get().then(datas => {
                if (datas.size === 0) {
                    userRef.doc().set({
                        uid: userUid,
                        name: user.displayName,
                        email: user.email
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
});

function showLoginUserName(user) {
    document.getElementsByClassName('userDisplayName')[0].innerHTML = `Hello ${user.displayName}`;
}
