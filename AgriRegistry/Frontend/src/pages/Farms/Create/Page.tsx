//import { useState } from "react";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";

const Page = () => {
    //const [farmName, setFarmName] = useState<string>('');
    //const [hectares, setHectares] = useState<number | null>(null);
    //const [fullAddress, setFullAddress] = useState<string>('');
    //const [district, setDistrict] = useState<number | null>(null);

    return (
        <div>
            <h5>Add New Farm</h5>
            <Separator />
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label >Farm Name</Label>
                <Input placeholder="Name" />
            </div>
            

            {/*<LocationList />*/}
        </div>
    );
};

export default Page;
