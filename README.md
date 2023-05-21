# Discord Account Cleaner
* ESM Discord selfbot util


## How to use

```javascript
import accountCleaner from "./src.js";

async function cleanAccount(auth) {
  const bot = new accountCleaner(auth);
  const res = await bot.verifyAuth();

  if (!res.isValid) {
    throw new Error("Invalid Token");
  }

  bot.Wipe();
}

Array.isArray(auth) ? auth.map(cleanAccount) : cleanAccount(auth);
```
 If you wanna do it to plural accounts just change the value of the auth variable from a string to an array.
 
 ## Example: 
 
 ```javascript
 const auth = ["token 1", "token 2"];
 ```

## Updates
* Currently nun

## Developer
* fanta#1337
