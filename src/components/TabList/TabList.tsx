import { FC, ReactNode, useState } from 'react';
import Tab from '../Tab/Tab';

export interface TabValue {
  title: string;
  icon?: ReactNode;
}
interface TabListProps {
  tabValues: TabValue[];
  className?: string;
  onClickTab: () => void;
  activeClassName?: string;
  sizeClassName?:string;
}
const TabList: FC<TabListProps> = ({ tabValues, className = "", onClickTab, activeClassName, sizeClassName }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={`flex rounded-xl p-1 gap-1 ${className}`}>
      {tabValues.map((value, index) => (
        <Tab
          key={index}
          active={index === activeTab}
          onClick={() => {
            handleTabClick(index);
            onClickTab();
          }
          }
          icon={value.icon}
          title={value.title}
          activeClassName={activeClassName}
          sizeClassName={sizeClassName}
        />

      ))}
    </div>
  );
}

export default TabList;