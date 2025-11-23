**NOTE**

**(Use this script at your own risk. I’m not responsible for anything that happens to your X/Twitter account as a result of using it. By choosing to run it, you accept full responsibility for any actions, restrictions, or consequences that may occur.)**

**(This script exists purely to work around X’s rate-limit issues by skipping the full profile load and going straight to the /about page inside an embedded frame. It does not use the API and does not perform any actions on your behalf; but as with any third-party script, please use it with caution.)**






**Installation**

1. Goto https://www.tampermonkey.net/ and install extension for your browser

2. In the TamperMonkey extension drop-down:

   a. Click "Create a new script" to open the script editor

   b. In the New Script editor:

3. Select all template code with Ctrl + A
4. Paste contents of the x-about-popup.js script
5. Save script with Ctrl + S (Until an indicator at the top of your window shows it has saved.)
6. Close the script editor
7. Navigate to www.x.com (If you already have an active tab, simply refresh.)
8. Ensure script is running by opening drop down. (If it is your only script, simply check if the TamperMonkey extension Icon displays the number "1" to the top right of the logo.)

--------------------------------------------------------------------------------------

**Usage**

1. hold "F" and Right Click on a page element (Profile Picture, Username) that will redirect you to a users page.

2. An embedded frame will open showing the users "About" section:
   ("Date joined", "Account based in", "Verified since/"Last on", and "Connected via")

3. When done, scroll with your mouse outside of the frame, or simply click anywhere outside of it and then move onto the next one!


==============
**IMPORTANT!**
==============

**DO**

Simply open a profiles about page once. When done, scroll with your mouse outside of the frame, or simply click anywhere outside of it and then move onto the next one.

**DON'T**

Stack pop-up's by F + Right Clicking within the initial pop-up frame.

Just use it like I explained to try and avoid encountering rate limit errors.


--------------------------------------------------------------------------------------

**The URL that this opens is simply**

"www.x.com/{user}/about":

Date joined
{Month} {Year}
Account based in
{Country}
Verified since
Since {Month} {Year}
{X} username changes
Last on {Month} {Year}
Connected via
{Platform}


NOTE:
(This was made to counteract X's rate limiting errors caused by needlessly loading the users profile to click on the about section directly. It should help prevent this by skipping that entirely and directing you straight to /about)
(Use at your own risk. I am not responsible for anything that may happen to your account from the use of this script. By using this script you are fully responsible for any actions or restrictions placed onto your X/Twitter account.)
(NOTE: I am only including this in case someone were to misuse the script, leading to X taking action on their account.)
