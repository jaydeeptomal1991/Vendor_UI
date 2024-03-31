import { Vendor } from "./vendorData";

export class vendorListData {
    statusCode: number | undefined;
    message: string | undefined;
    // data: Array<vendorData> | undefined;
    data: Vendor[] = [];
}              