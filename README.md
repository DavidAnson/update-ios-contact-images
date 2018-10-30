# update-ios-contact-images.js

There are various conditions where Apple iOS can't (or won't) synchronize [Contact photos](https://support.apple.com/kb/PH2662) between iPhone/iPad devices.
If you're in this situation and want it to "just work", you can configure each device manually.
Or you can run this script to do that for you.

`update-ios-contact-images.js` takes a list of email addresses and optional image links and sets the photo for matching contacts in your address book.
If an image link is provided, it's used as-is; if not, the [Gravatar](https://gravatar.com/) for that email address is used instead.

## Instructions

1. Install [Scriptable](https://scriptable.app/) on your iPhone or iPad
2. Create a new script from `update-ios-contact-images.js`
3. Customize the `accounts` array for the contacts you care about
4. Run the script, review the output
5. Repeat as necessary on other devices