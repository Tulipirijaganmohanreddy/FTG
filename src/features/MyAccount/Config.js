export const MyAccount = {
  title: "MY ACCOUNT",

  fields: [
    {
      id: "1",
      Id:'username',
      label: "Username",
    },
    {
      id: "2",
      Id:"password",
      label: "Password",
    },
  ],

  inputFields: [
    {
      id: 3,
      Id:'userFirstName',
      name: "first_name",
      label: "First Name",
      type: "text",
    },

    {
      id: 4,
      Id:'userMiddleName',
      name: "middle_name",
      label: "Middle Name",
      type: "text",
    },

    {
      id: 5,
      Id:'userLastName',
      name: "last_name",
      label: "Last Name",
      type: "text",
    },

    {
      id: 6,
      Id:'userEmail',
      name: "email",
      label: "Email",
      type: "text",
    },
  ],
  subHead: "Edit",
  footer: "Log Out",
  changeUsernameFields: [
    {
      id: "1",
      Id:'oldUsername',
      label: "",
      name: "old_user_name",
      placeholder: "Enter Old Username",
      inputType: "text",
    },
    {
      id: "2",
      Id:'newUsername',
      label: "",
      name: "new_user_name",
      placeholder: "Enter New Username",
      inputType: "text",
    },
    {
      id: "3",
      Id:'confirmUsername',
      label: "",
      name: "confirm_user_name",
      placeholder: "Confirm New Username",
      inputType: "text",
    },
  ],
  changePasswordFields: [
    {
      id: "1",
      Id:'oldPassword',
      label: "",
      name: "old_password",
      placeholder: "Enter Old Password",
    },
    {
      id: "2",
      Id:'newPassword',
      label: "",
      name: "new_password",
      placeholder: "Enter New Password",
    },
    {
      id: "3",
      Id:'confirmPassword',
      label: "",
      name: "confirm_password",
      placeholder: "Confirm New Password",
    },
  ],
  title2: "Change Username",
  title3: "Change Password",
  passwordText:
    "8-characters minimum, must contain a capital letter, contain a small letter, contain a number, contain a special character[!@#$%^&_*()\-=+].",
  btnText1: "Cancel",
  btnText2: "Save",
};
