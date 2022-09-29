// export interface User {
//     /*
//         User object that is set as the redux user object in src/ducks/user-slice
//         Must add onto the object as more fields become necessary
//     */
//     uid: string | undefined;
//     email: string | undefined | null;
//     phoneNumber: string | undefined | null;
//     isAnonymous: boolean | undefined;
//     emailVerified: boolean | undefined;
//     loggedIn: boolean | undefined;
//     count: number;
//     // cart?: cartArray[] | undefined;
//     cart?: any;
// }

export interface BaseUser {
    uid: string;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    color?: string | null; // fallback if there is no image
}

export interface User extends BaseUser {
    /*  
        User object that is set as the redux user object in src/ducks/user-slice
        Must add onto the object as more fields become necessary
    */
    // contact info
    email?: string | null;
    phoneNumber?: string | null;

    // booleans
    isAnonymous: boolean | null;
    emailVerified?: boolean | null;
    loggedIn: boolean | null;

    // need to set this temporarily for deleted users, go through with cloud functions later
    isDeleted?: boolean | null;
}

const nullUser: User = {
    uid: 'none',
    email: null,
    image: null,
    color: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,

    isAnonymous: null,
    emailVerified: null,
    loggedIn: null,
    isDeleted: null,
};

export const initializeUser = (args?: User): User => {
    /*
        Returns the initialized user, depending on the user inputs
    */
    if (!args) {
        return nullUser;
    }

    // random color map for generating the user background color
    const colors = [
        'rose',
        'fuchsia',
        'lightBlue',
        'blue',
        'teal',
        'emerald',
        'yellow',
        'orange',
        'red',
    ];

    return {
        ...nullUser,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDeleted: false,
        ...args,
    };
};
