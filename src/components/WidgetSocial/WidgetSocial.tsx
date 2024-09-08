import React, { FC } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
interface WidgetSocialProps {
  isInternal?: boolean;
  isIOS?: boolean;
  isAndroid?: boolean;
  isTelegram?: boolean;
  className?: string;
}
const WidgetSocial: FC<WidgetSocialProps> = ({ isInternal = false, isIOS = false, isAndroid = false, isTelegram = false, className }) => {
  return (
    <div className={`flex ${className} gap-1`}>
      {isInternal && <GlobeAltIcon className='w-4 h-4' style={{color: "#9395A4"}} />}
      {isInternal && <Image width={16} height={16} alt='' src="/icons/apple.svg" />}
      {isInternal && <Image width={16} height={16} alt='' src="/icons/android.svg" />}
      {isInternal && <Image width={16} height={16} alt='' src="/icons/telegram.svg" />}
    </div>
  )
}

export default WidgetSocial