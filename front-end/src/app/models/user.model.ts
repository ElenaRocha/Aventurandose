export class User {
  _id: string;
  name: string;
  surname: string;
  alias: string;
  email: string;
  password: string;
  comments: Array<number>;
  constructor(pName, pSurname, pAlias, pEmail, pPassword) {
    this._id = '';
    this.name = pName;
    this.surname = pSurname;
    this.alias = pAlias;
    this.email = pEmail;
    this.password = pPassword;
    this.comments = [];
  }
}
