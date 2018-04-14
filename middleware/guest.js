export default function ({ store, route, redirect }) {
    if (store.state.auth.user !== null) {
        return redirect('/');
    }
}