export interface ScreenParams<T> {
    /*
        Params for every screen, defined the React Navigation props: https://reactnavigation.org/docs/params/
    */
    route: T;
    navigation?: any | undefined;
}
