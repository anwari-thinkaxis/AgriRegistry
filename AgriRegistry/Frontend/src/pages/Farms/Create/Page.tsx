//import { useState } from "react";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

const Page = () => {
    //const [farmName, setFarmName] = useState<string>('');
    //const [hectares, setHectares] = useState<number | null>(null);
    //const [fullAddress, setFullAddress] = useState<string>('');
    //const [district, setDistrict] = useState<number | null>(null);

    return (
        <div>
            <h5>Add New Farm</h5>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
            </div>
            

            {/*<LocationList />*/}
        </div>
    );
};

export default Page;
