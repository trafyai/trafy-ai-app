import Image from "next/image";
import TrafyAi from "@components/trafy-chat-ai/TrafyAi";
export default function Home() {
  return (
   <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
   <TrafyAi/>
   </div>
  );
}
