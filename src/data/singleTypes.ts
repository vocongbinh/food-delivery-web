import { ContactInfoComponent, FooterComponent, FurtherInfoComponent, HeaderComponent, NavigationComponent, SocialComponent } from "./components";
import { Auth, BaseData, DataResponse, MediaData } from "./types";

export interface Global extends BaseData {
    header: NavigationComponent;
    footer:  FooterComponent;
    
}   
export interface AboutPage extends BaseData {
    header: HeaderComponent;
    image: {
        data: MediaData
    },
    furtherInformation: FurtherInfoComponent[];
    contact: {
        header: HeaderComponent,
        contactInformation: ContactInfoComponent[],
        socialNetworks: SocialComponent[]
    },
    team: {
        header: HeaderComponent,
        members: {
            data: DataResponse<Auth>[]
        }
    }
    
}   