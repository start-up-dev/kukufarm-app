export const selectContact = (contact, target) => {
  const {displayName} = contact;
  return {name: displayName, target};
};

export const filterContacts = contacts => {
  return contacts
    .sort(({displayName: a}, {displayName: b}) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 1;
    })
    .map(item => {
      const phoneNumbers = removeDuplications(item.phoneNumbers);
      let {displayName, givenName, familyName} = item;
      if (!displayName) displayName = `${givenName} ${familyName}`;

      return {...item, phoneNumbers, displayName};
    })
    .filter(
      ({phoneNumbers, emailAddresses}) =>
        phoneNumbers.length || emailAddresses.length,
    );
};

export const removeDuplications = phoneNumbers => {
  const newOnes = phoneNumbers
    .map(phone => ({
      ...phone,
      number: phone.number,
    }))
    .filter(({number}) => !!number);
  for (let i = newOnes.length - 1; i >= 1; i--)
    if (newOnes[i].number === newOnes[i - 1].number) newOnes.splice(i, 1);
  return newOnes;
};

export const updateContent = (content, key, value) =>
  content.replace(new RegExp(`{{${key}}}`, 'g'), value);

export const isPurchased = userData => {
  const {isPurchased, purchaseData, createdAt} = userData;
  const interval = Date.now() - createdAt;
  if (interval < MSEC_TRIAL_PERIOD) return true;

  return isPurchased && purchaseData;
};
