export class Comment {
  _id: string;
  title: string;
  content: string;
  date: Date;
  trail: number;
  user: number;
  constructor(pTitle, pContent, pTrail, pUser) {
    this._id = '';
    this.title = pTitle;
    this.content = pContent;
    this.date = new Date();
    this.trail = pTrail;
    this.user = pUser;
  }
}
