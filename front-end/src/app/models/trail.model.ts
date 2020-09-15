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
  cathegories: Array<string>;
  tags: Array<string>;
  comments: Array<string>;
  constructor(
    pName,
    pDescription,
    pTime,
    pLength,
    pSlope,
    pCircular,
    pProvince,
    pLocation,
    pTransport,
    pCathegories
  ) {
    this._id = '';
    this.name = pName;
    this.description = pDescription;
    this.time = pTime;
    this.length = pLength;
    this.slope = pSlope;
    this.circular = pCircular;
    this.province = pProvince;
    this.location = pLocation;
    this.transport = pTransport;
    this.cathegories = pCathegories;
    this.tags = [];
    this.comments = [];
  }
}
