import { Advertisement } from '@/data/types';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import React from 'react'
import AdvertisementsSlider from '../AdvertisementsSlider/AdvertisementsSlider';
const SectionAdvertisements = ({ advertisements }: { advertisements: Advertisement[] }) => {


    return (
        <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-2 aspect-h-2 sm:aspect-h-1 overflow-hidden z-0">
            <AdvertisementsSlider
                href={"/"}
                advertisements={advertisements}
                className="absolute inset-0"
                galleryClass="absolute inset-0"
                ratioClass="absolute inset-0"
            />

        </div>
    )

}

export default SectionAdvertisements