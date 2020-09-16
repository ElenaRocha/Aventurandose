export class Trail {
  _id: string;
  name: string;
  description: string;
  time: number;
  length: number;
  slope: number;
  circular: boolean;
  province: string;
  location: Array<number>;
  transport: string;
  cathegories: Array<number>;
  tags: Array<number>;
  comments: Array<number>;
  constructor(
    pName,
    pDescription,
    pTime,
    pLength,
    pSlope,
    //pCircular,
    pProvince,
    //pLocation,
    pTransport
  ) {
    this._id = '';
    this.name = pName;
    this.description = pDescription;
    this.time = pTime;
    this.length = pLength;
    this.slope = pSlope;
    this.circular = true;
    this.province = pProvince;
    this.location = [];
    this.transport = pTransport;
    this.cathegories = [];
    this.tags = [];
    this.comments = [];
  }
}
