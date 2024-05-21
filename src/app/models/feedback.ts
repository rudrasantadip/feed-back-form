export interface FeedBack
{
    emailAddress:string;
    eventName:string;
    likedManagement:boolean;
    likedOrganization:boolean;
    likedValueAddition:boolean;
    contentRating:number;
    managementRating:number;
    informationRating:number;
    toRecommend?:string;
    remarks?:string;
    rating?:number;
}

