# Discord Account Cleaner
* ESM Discord selfbot util


## How to use

```javascript
import accountCleaner from "./src";

const auth = "Client token here";

Array.isArray(auth) ? (async () => {
    for (var i = 0; i < auth.length; i++) {
        const bot = new accountCleaner(auth[i]);
        const res = await bot.verifyAuth();
        if(res.isValid) bot.Wipe();
        else throw new Error("Invalid Token")
    }
})() : (async () => {
    const bot = new accountCleaner(auth);
    const res = await bot.verifyAuth();
    if(res.isValid) bot.Wipe();
    else throw new Error("Invalid Token")
})()
```
 If you wanna do it to plural accounts just change the value of the auth variable from a string to an array.
 
 ## Example: 
 
 ```javascript
 const auth = ["token 1", "Token 2"];
 ```

## Updates
* Currently nun

## Developer
* fanta#1337
