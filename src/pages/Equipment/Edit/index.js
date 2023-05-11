import { getEquipmentDetail } from "@/api";
import { EquipmentForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Equipment() {
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await getEquipmentDetail(router.query.id);
      setData(res.data);
    })();
  }, [router]);
  return <EquipmentForm title="Edit Equipment" editData={data} />;
}