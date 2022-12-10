Welcome to PetPal - a Tinder-style app designed to connect pet-owners in need of assistance with pet-lovers who can help
  Developed in Fall 2022 by Aman Bedi, Etna Ozkara, Annie Rhoades, and Tim McGarry
  
(i) why?
  We created PetPal for a class project - CS370 at Emory University. 
  The idea for this app was born out of two main philosophies: 
    -the swiping aspect of Tinder is really fun
    -people who need help taking care of their pets could use a place to connect with others who are interested and available.
  We decided to combine these thoughts into an app where pet-owners can ask for help with their pets, and people who want to take care of pets can
  actually find animals to take care of. 
  
  We know that it can be hard to find someone to help out with your pet, and we know that there are a lot of people out there who love
  playing with animals, so we created PetPal as a fun way to connect these markets. 
  
(ii) how is the technology is architected and organized? 
  We created PetPal using React Native (with Javascript and some CSS). Our backend is set up with AWS amplify. 
  The actual app is organized into different "Screens" (which you can find in the src/screens folder). The flow of the app goes from App.js
  directly into the InitScreen, then into the SignTest screen which is wrapped in the AWS authenticator.

(iii) set-up steps
  In order to set this project up on your own machine, follow these steps:
  1. git clone this project
  2. go to this site and follow the instructions under the heading "React Native CLI Quickstart"
    https://reactnative.dev/docs/environment-setup
    (it would probably work with the Expo instructions as well, we just used the CLI instructions)
  3. if you are planning on running the ios version, make sure to cd into the ios folder and run the command "pod install"
  4. cd to the root folder and connect it to your own AWS database
  5. then open a new terminal, cd into the PetPal3 folder, and run the command "yarn start"
    at this point, the terminal should be running a process to open a simulator
  6. in your original terminal (also in the root folder) run the command "yarn ios start" if you plan to run the ios version
  7. then, it should build and open the app in your simulator, and you can get to editing + running 
  
  
  Once the app is set up, users follow these steps:
    1. create an account
    2. once you sign in, you will be led to the profile creation page
      -if you are a PET OWNER and want help with your pet, create a profile FOR YOUR PET
          -include a picture of the pet, their name, and a little bio of info about them
        -choose the picker option that you want to see "People to take care of my pet"
        (this allows potential pet-sitters to see your pet's profile and allows you to see those potential pet-sitters' profiles)
      -if you are a potential PET SITTER and want to help with someone else's pet, create a profile FOR YOURSELF
          -include a picture of yourself, your name, and a little bio about you
         -choose the picker option that you want to see "Pets to take care of"
         (this allows pet owners to see your profile and allows you to see pets who need taking care of)
     3. SAVE your profile
     4. after that, get to swiping
        -when you swipe right on someone and they swipe right on you, you will see the other profile pop up in your "New Matches" screen
          where you can message them
    
    -if you need help on the swiping page, press the "?" button
    
    
