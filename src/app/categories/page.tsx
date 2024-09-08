
import CardCategory from "@/components/CardCategory/CardCategory";
import Heading1 from "@/components/Heading/Heading1";
import { Category } from "@/data/types";
import { getPrefetchQuery } from "@/hooks/useCustomQuery";
import { FC } from "react";
import bg from "../../../public/bg_image.png";
import { QueryClient } from "@tanstack/react-query";
interface CategoriesPageProps {
}
const CategoriesPage: FC<CategoriesPageProps> = async ({ }) => {
    const queryClient = new QueryClient();
    const categories: Category[] = await queryClient.fetchQuery(getPrefetchQuery({
        key: "categories"
    }));
    return <div className="py-20 lg:px-20 px-10" style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
    }}>
        <Heading1 isCenter={false} desc="Choose a category and find the application you need">Categories</Heading1>
        <div className={`grid gap-6 md:gap-8 md:grid-cols-3 lg:grid-cols-4`}>
            {(categories as Category[]).map((item, index) => {
                return <CardCategory index={index + 1} key={index} category={item} />;
            })}
        </div>
    </div>
}
export default CategoriesPage;