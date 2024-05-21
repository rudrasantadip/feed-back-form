export interface Participant
{
    MobileNumber:string  | undefined;
    FullName:string | undefined;
    EmailAddress:string;
    EventName:string;
    LikedEventManagement:boolean;
    LikedEventOrganization:boolean;
    LikedValueAddition:boolean;
    ContentRating:number;
    ManagementRating:number;
    InformationRating:number;
    toRecommend:string;
    Remarks:string;
    Rating:number;
}