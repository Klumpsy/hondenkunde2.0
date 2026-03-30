import { getPartners } from "@/app/pocketbase/pocketbase";
import Footer from "./Footer";

const FooterWrapper = async () => {
  const partners = await getPartners();
  return <Footer partners={partners} />;
};

export default FooterWrapper;
