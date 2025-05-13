import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { ProvinceLinksDialog } from "../components/ProvinceLinksDialogs";
import { HoverEffect } from "../components/ui/card-hover-effect";

interface ProvinceLinksOption {
    title: String;
    link: String;
}

export default function PNPResourcesPage() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [showLinksDialog, setShowLinksDialog] = useState(false);
    const [provinceLinks, setProvinceLinks] = useState<ProvinceLinksOption[]>([]);

  return (
    <Layout>
        <div className="w-[80%] mx-auto mt-24 text-center">
            <HoverEffect items={provinces} setProvinceLinks={setProvinceLinks} setShowLinksDialog={setShowLinksDialog} />
        </div>
          <ProvinceLinksDialog
              isOpen={showLinksDialog}
              onClose={() => setShowLinksDialog(false)}
              options={provinceLinks || []}
              onOptionSelect={() => { }}
          />
    </Layout>
  );
}

const provinces = [
    { code: 'IRCC', name: 'IRCC', flag: 'https://images.unsplash.com/photo-1607578774871-249a5b07c380?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWRhJTIwZmxhZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { code: 'ON', name: 'Ontario', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Ontario.svg/500px-Flag_of_Ontario.svg.png' },
    { code: 'BC', name: 'British Columbia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/500px-Flag_of_British_Columbia.svg.png' },
    { code: 'AB', name: 'Alberta', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/500px-Flag_of_Alberta.svg.png' },
    // { code: 'QC', name: 'Quebec', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/500px-Flag_of_Quebec.svg.png' },
    { code: 'NS', name: 'Nova Scotia', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Nova_Scotia.svg/500px-Flag_of_Nova_Scotia.svg.png' },
    { code: 'MB', name: 'Manitoba', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Manitoba.svg/500px-Flag_of_Manitoba.svg.png' },
    { code: 'SK', name: 'Saskatchewan', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/500px-Flag_of_Saskatchewan.svg.png' },
    { code: 'NB', name: 'New Brunswick', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_New_Brunswick.svg/500px-Flag_of_New_Brunswick.svg.png' },
    { code: 'NL', name: 'Newfoundland and Labrador', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Newfoundland_and_Labrador.svg/500px-Flag_of_Newfoundland_and_Labrador.svg.png' },
    { code: 'PE', name: 'Prince Edward Island', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Flag_of_Prince_Edward_Island.svg/500px-Flag_of_Prince_Edward_Island.svg.png' },
];
