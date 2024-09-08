import { MediaData } from "@/data/types";
import { getStrapiMedia } from "@/utils/apiHelpers";
import Image from "next/image";


export default function Media({ data }: { data: MediaData }) {
  const imgUrl = getStrapiMedia(data.attributes.url);
  return (
    <div className="flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <Image
        src={imgUrl || ""}
        alt="none provided"
        className="object-cover w-full h-full rounded-3xl overflow-hidden"
        width={400}
        height={400}
      />
    </div>
  );
}