// update-ios-contact-images
// A Scriptable (https://scriptable.app/) script to update contact photos on iOS
// Takes a list of email accounts and image URLs and assigns each image to the corresponding contact
// https://github.com/DavidAnson/update-ios-contact-images

// List of email accounts and images to update
const accounts = [
  {
    email: "test1@example.com"
    // No "image" property; uses Gravatar
  },
  {
    email: "test2@example.com",
    image: "https://example.com/images/test2.jpg"
  }
];

// MD5 hash for Gravatar (see https://github.com/blueimp/JavaScript-MD5 and https://cdnjs.com/libraries/blueimp-md5)
eval(await (new Request("https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js")).loadString());

// Load all address book contacts
const contacts = await Contact.all(await ContactsContainer.all());

// For all accounts...
await Promise.all(accounts.map(account => {
  // Normalize email address
  const emailLower = account.email.trim().toLowerCase();
  // For all contacts with that email...
  return Promise.all(contacts.
    filter(contact => contact.emailAddresses.some(address => address.value.toLowerCase() === emailLower)).
    map(async contact => {
      // Use specified image or fallback to Gravatar (see https://en.gravatar.com/site/implement/images/)
      const url = account.image || `https://www.gravatar.com/avatar/${md5(emailLower)}`;
      // Load image from web
      contact.image = await (new Request(url).loadImage());
      // Update contact
      Contact.update(contact);
      console.log(`Updated contact image for "${emailLower}" to "${url}"`);
    }));
}));

// Save changes
Contact.persistChanges();
console.log("Saved changes");
