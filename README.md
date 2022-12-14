# <img src="https://raw.githubusercontent.com/maetio/expo-template/main/assets/MaetSvg.svg" width="50" align="center" margin-bottom="15px"> Maet Expo Template
This repository contains a template configured with various tools and practices that are used for mobile development at Maet. This template will be continually updated as our stack and knowledge of "best practices" evolve, but **it can be viewed as an introduction into our software development philosophy**. The template itself comes configured with a simple authentication flow for guest sign-in and password authentication.  

> To use this template, make sure to have the [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed and run:

--changes

```bash
expo init --template maet-expo-template
```

Maet is a sports-technology startup that is ***Redefining the Athletic Community***. We are always looking for software developers to join our team that resonate with our *development philosophy* and want to have a positive impact on the open-source community. 
> **You can apply to be a TeamMaet [here](https://angel.co/l/2xAQpw)**.

Drop us a ⭐ if you find this template helpful! Additionally, if you want to stay up-to-date about Maet, visit our website at [Maet.io](https://www.maet.io/), or follow our [Instagram](https://instagram.com/playmaet) and [LinkedIn](https://www.linkedin.com/company/maetio). 

## About this Project
This project has a clear focus on learning our stack(you can learn what technologies we used further down the readme) as well as implementing the Stripe payment extension from FireBase. With this project, you will be able to display your own business's products or subscriptions directly from the Stripe dashboard. Products are displayed in an infinite scroll pagination list, allowing new data to be fetched every time someone reaches the bottom of the page. Users can pick and choose items, and also refresh the page for any updated information. It also makes new stripe users as soon as someone logins into the app for the first time. All this is wrapped together in a neat package that allows anyone to copy and paste this into their own app with a little setup.

## Set-Up/usage:

1. This project was not about authentication or setting up FireBase on your local machine. There are many resources on setting up a react app with FireBase authentication and we even have some documentation on that in the resources tab. The first step to this project is having a react app, FireBase, and Firebase authentication implemented in the app, and redux tool-kit installed. Once you have all this you are ready to continue with the setup.
2. Add FireStore to your project, you can use either test mode or production mode.
3. Make sure to add a 'users' collection in firestore whenever someone signs up for the first time. We have a simple solution to this in our resources tab, however the way we implemented it was using RTK query. If you wish to make something more advanced, looking through the repo should be able to help.
4. Make a basic stripe account, this is needed for the extension.
5. Set up Stripe extension: 
* In Firebase click the 'extensions' tab next to authentication and FireStore. This should pull up the payment options for stripe. To use firebase extensions, you must upgrade your plan to the 'Blaze' plan. Don't worry about being charged unless you are making a production-level app that has thousands of reads and writes a day.
* Once you upgraded your account, find the Stripe extension or click [here](https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments) to locate to correct extension.
* Click install in Console and choose the app you want to install it on. This will pull up a list of settings you can configure. The only settings we recommend changing are changing the customer details to 'users', and changing the sync options from 'do not sync' to 'sync'. Installation might take a couple of minutes...
* Once you have gotten this far you should now be able to see the Stripe extensions documentation by going to the extensions tab and clicking manage next to stripe.
* From here they hold your hand in setting it up, so I recommend looking at the official docs for getting your firebase and stripe extension connected.
6. Test stripe connection, by going into the stripe dashboard and creating a product. Once you make a product you should be able to see it in FireStore.
7. Paginating the products from FireStore:
* Highly recommend looking at the official pagination [Docs](https://firebase.google.com/docs/firestore/query-data/query-cursorsv) at FireStore. As well as looking at our code to get familiar with pagination using RTK query. 
* In short, we need to make a hook with RTK query that takes in the last id of all the items currently being displayed, and returns the next items from firebase. We also need to make sure we have an initial base case since we will not have data in the beginning. 
* Once we get this data we populate a flatlist and add the refresh functionality to it, by resetting all of the initial parameters to the RTK hook.
8. adding cart functionality:
* In a new file create a slice, and add all functionality you want in your cart, add, delete, adjust, etc.
* Add a cart slice to your redux tool-kit reducer
* You can now import this functionality to any component and just add your products into this global state.
9. Finalizing the cart with stripe:
* Now that you have the specified products saved into your cart state you need to take their price IDs and add a document to your users collections. The firebase stripe extension has some really good docs on doing this so please check that out.
* Once you have all this working test it out by adding a product and checking it out. This should take you to stripes prebuild checkout component.

## ⚖️ Development Philosophy
As an engineer at Maet, **we strive to create elegant features for our fellow developers and our users**. We have created the following values that help us in our purpose to build valuable developer tools and delightful user experiences.

### ✌️ **Developer Values**
For our community of developers to create tools that they love to use and get excited about sharing with others.
1. **Modularity:** When we play Legos, having many well-defined pieces is much more valuable (and fun) than a completed static project. We want to be able to put together great tools, allowing us the space for flexibility and creativity. Examples include our implementation of [form-input](https://github.com/maetio/template/blob/main/src/screens/Login.tsx#L106) component with [built-in form validation](https://github.com/maetio/template/blob/main/src/components/user-input/form-input.tsx).
2. **Communication of Knowledge:** As a talented developer at Maet, one of your top duties is effectively communicating your knowledge to our developer community, strengthening the experience of our whole team. Therefore, leave a paper trail of your methods to help transfer your knowledge to others, as we did in our [firebase configuration](https://github.com/maetio/template/blob/main/src/firebase/firebase-config.ts) and [redux hooks declarations](https://github.com/maetio/template/blob/main/src/hooks/useful-ducks.ts).
3. **Responsive and Lightweight:** Write code that automatically adapts to changes, like we did by choosing responsive sizing values or by [automatically generating dark and light themes](https://github.com/maetio/template/blob/main/src/constants/theme.ts). Additionally, only include libraries and files that are strictly necessary while avoiding copying and pasting the same code.

### 💡 **Design Values**
Create an experience for the user that empathetically caters to their needs. There are many [design heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) to consider, but we list some of our most important ones here.
1. **Simplicity:** Offer users only options that are needed and do not overwhelm them with too many bright colors or complex functionality. Allow them the space to make easy, small decisions while generating a response to their needs. An example of this is the decision on the authentication flow to not ask the user whether they want to login in or sign-up, but automatically generating the next screen based on their email input.
2. **Agency:** Give the user the power to navigate the experience effectively, while also allowing them to go back and correct their mistakes when necessary. An example of this can be seen by confirming when to exit certain actions.
3. **Effort-Awareness:** Understand that the user does not want to fill out long forms or navigate many clicks to do a simple task. Give them smaller, digestable steps, being aware of their capacity for effort. An example of this is allowing the user to generate a guest account to temporarily experience the app so they do not have to initially commit to a long sign-up process.
4. **Feedback:** Illustrate to the user that their action occurred in some way, so that they can feel the response and not be lost in confusion/questioning if their response went through. An example of this would be generating alerts for their actions. 

## ⚡ Stack and Dependencies

A [**React Native**](https://reactnative.dev/), [**TypeScript**](https://www.typescriptlang.org/), and [**Expo**](https://expo.dev/) template configured with:

* [**Firebase V9**](https://firebase.google.com/docs/web/modular-upgrade): Firebase V9 is modular and more lightweight than previous versions of firebase, allowing us to import specific functions from firebase instead of initializing the whole app. There are many useful resources to see how to get started with this new version, including this [authentication tutorial](https://firebase.google.com/docs/auth/web/start).
* [**React Navigation**](https://reactnavigation.org/docs/getting-started/): For navigating through screens, we are using react navigation's tab and stack navigators. Additionally, react navigation has [custom theming support](https://reactnavigation.org/docs/themes) built in, which is defined in *src/constants/theme*. 
* [**NativeBase**](https://nativebase.io/): Well built and responsive component library for ios, android, and web.
* [**Redux Toolkit**](): We use redux toolkit to manage universal state. An introduction into redux toolkit can be found [here](https://www.youtube.com/watch?v=9zySeP5vH9c). We divide our redux by concept, all in the "ducks" directory under src, using the slice pattern. Only use redux when necessary, handling internal state with react's useState when possible. We are using redux toolkit because it simplifies redux, allowing us to ["mutate" the state](https://redux.js.org/tutorials/quick-start#create-a-redux-state-slice) in the reducers without having to explicitly make a copy. This will shorten the amount of code we will have to write. [This tutorial](https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit) is useful to reference to understand how to combine redux toolkit and firebase 9 for authentication. 
* [**Redux-Persist**](https://www.npmjs.com/package/redux-persist): Allows us to maintain the state of the app, with the data associated with the user even after the app is quit. To see how to integrate with redux toolkit, check out the [documentation](https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist) or this [tutorial](https://edvins.io/how-to-use-redux-persist-with-redux-toolkit).
* [**React Native SVGs**](): To render local SVGs for our logos with [react-native-svg-transformer](https://github.com/react-native-svg/react-native-svg#use-with-svg-files).
* [**ESlint**](https://eslint.org/) and [**Prettier**](https://prettier.io/): ESlint and Prettier help us detect errors while keeping our code formatting clean. We have initialized these packages using [Airbnb's style guide](https://github.com/airbnb/javascript/tree/master/react), extending our eslintrc.js to include [airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript).
* **Absolute Imports:** To avoid annoying relative imports, we have configured our tsconfig.json file and babel.config.js file to make use of absolute imports. It may be useful to reference the typescript documentation on [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html), or reference [this medium blog](https://medium.com/geekculture/making-life-easier-with-absolute-imports-react-in-javascript-and-typescript-bbdab8a8a3a1).
* **Dark and Light Theme:** We configured our own [theme](https://github.com/maetio/template/blob/main/src/constants/theme.ts) to extent to themes for [NativeBase](https://docs.nativebase.io/customizing-theme) and [React Navigation](https://reactnavigation.org/docs/themes).
* **Form Validation:** We are using [react-hook-form](https://react-hook-form.com/) and [yup](https://www.npmjs.com/package/yup) to validate our user inputs, checking them in our form-input component while passing the yup schema in the screens. [This tutorial](https://dev.to/franciscomendes10866/react-form-validation-with-react-hook-form-and-yup-4a98) is useful to reference. 

## :newspaper: Resources
Engineering can be tricky, so we compiled a list of great resources and videos that we believe will make setting up this project much easier.

### :video_camera: Videos:

* How do I [Paginate](https://www.youtube.com/watch?v=poqTHxtDXwU&t=2s) From FireStore? This a great Video for getting an overview of what pagination is and how to implement it with FireStore.
* [RTK Query](https://www.youtube.com/watch?v=HyZzCHgG3AY&t=160s) Crud overview. Although we used query functions(queryFn), this is a great starting point for implementing RTK query.
* Add users to collection on [Signup](https://www.youtube.com/watch?v=qWy9ylc3f9U). This video uses an older version of FireBase, but we still recommend it since it is very basic and allows anyone to add it to their project.
* Implementing Stripe payment with Firebase, [video 1](https://www.youtube.com/watch?v=5rc0pe2qRjg&t=1119s), [video 2](https://www.youtube.com/watch?v=VnntkusKinM&t=661s). There are not too many extensive videos on this topic, however, with both of these and the official stripe documentation, you should be ready to get payments in your app!


### :gear: Documentation and articles:
* Official Pagination with FireStore [Docs](https://firebase.google.com/docs/firestore/query-data/query-cursors). Highly recommend the FireStore docs, for everything FireStore-related.
* RTK Query custom functions [Docs](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries) since we are not using endpoints like a traditional API, we recommend learning about the queryFn tool that we used to connect RTK to FireStore.
* Unfortunately, you can not look at the stripe FireBase extension docs without downloading them to your own FireBase project. We have instructions on how to set this up further up in this readme. In the meantime, you can look at the official Stripe Docs here, and get the stripe extension downloaded [here](https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments).

## 🔧 Usage
> Be sure to have the [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed.

```bash
expo init [name] --template maet-expo-template
```
Create a Firebase project ([How?](https://firebase.google.com/docs/web/setup)), add a web app, and copy your Firebase config to a **.env** file in the top level of your project:
```
FIREBASE_API_KEY=[...]
FIREBASE_AUTH_DOMAIN=[...]
FIREBASE_PROJECT_ID=[...]
FIREBASE_STORAGE_BUCKET=[...]
FIREBASE_MESSAGING_SENDER_ID=[...]
FIREBASE_APP_ID=[...]
FIREBASE_MEASUREMENT_ID=[...]
```
- Run on Web: `yarn web` or `expo start --web`
- Prebuild: `yarn prebuild` or `expo prebuild -–npm`
    > Expo prebuild checks to make sure all packages are compatible with expo before running it on your device.
- Run on iOS: `yarn ios` or `expo run:ios –d`
- Run on Android: `yarn android` or `expo run:android --device`
- Install dependencies: `yarn`
- Compile TypeScript: `yarn tsc`
- Lint Code: `yarn lint` or `yarn eslint .`
- Format Code: `yarn format` or `yarn eslint . --fix`

### 💻  **Development Practices**
1. **Responsive:** Make sure to utilize responsive sizing for components and using responsive color values (defined in theme.ts) where necessary.
2. **Lightweight Files:** Keep files under ~500 lines of code. If you much longer than this you should probably be creating a different component to import in.
3. **Compilation and Formatting:** Strongly type when possible to cut down on runtime errors while also linting code often to maintain strong formatting.
4. **Naming Conventions:**   
    *Files/Directories:* all lower case with - for spaces (ex. form-input.tsx)   
    *Components/Interfaces:* Capital first letter and CamelCase (ex. \<FormInput />)  
    *Variables:* camelCase (ex. const isLoading)


## 📂 Organization 
`src/components`: useful re-usable component library.  
`src/constants`: app constants, such as theme, that remain consistent throughout the app.   
`src/ducks`: redux features, organized using the slice pattern.   
`src/firebase`: all backend firebase configuration, promise handlers, and api.  
`src/hooks`: useful hooks that can be re-used throughout the app.  
`src/navigation`: react-navigation navigators, including stack and tab navigators.  
`src/screens`: the main screens of the app.  
`src/types`: definitions of important interfaces and types.  
`src/utils`: utility files, including yup form schemas.

## 📋 License
[MIT License](https://opensource.org/licenses/mit-license.html)

Copyright 2022 © Maet LLC
