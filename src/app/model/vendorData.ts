export interface Vendor {
    vendorId: number;
    vendorName: string;
    vendorLicenseOwner: string;
    registrationNumber: string;
    gstNumber: string;
    vendorAddress: string;
    state: string;
    city: string;
    postalCode: string;
    phoneNumber: string;
    vendorUsername: string;
    createdDate: Date;
    updatedDate: Date;
    role: string;
    pendingRequest: boolean;
    enabled: boolean;
    passwordChangedFirst: boolean;
}