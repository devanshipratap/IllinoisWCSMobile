/*
* Helper function for logging in using
* Google's Expo package for authentication
* */

import React from 'react';
import * as Google from 'expo-google-app-auth';
import { clientId } from './auth.json';

// Function to sign in to the app
export async function signInHelper(){

    try {
        const result = await Google.logInAsync({
            iosClientId: clientId,
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {
            console.log(result.user);
            // Return useful information needed in the app
            return (
                {
                    signedIn: true,
                    name: result.user.name,
                    email: result.user.email
                }
            );
        } else {
            console.log("Request cancelled")
        }
    } catch (e) {
        console.log("Error", e)
    }
}

