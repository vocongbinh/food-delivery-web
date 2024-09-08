"use client"
import { useCustomQuery } from '@/hooks/useCustomQuery'
import React from 'react'
import SectionAdvertisements from '@/components/SectionAdvertisements/SectionAdvertisements';
import SectionAppsOfCategory from '@/components/SectionAppsOfCategory/SectionAppsOfCategory';
import SectionBlog from '@/components/SectionBlog/SectionBlog';
import { retrieveDataFromResponse } from '@/utils/retrieveDataFromResponse';
import SectionCommunities from '@/components/SectionCommunities/SectionCommunities';
import { useQuery } from '@tanstack/react-query';
import { RestaurantsApi } from '@/apis/restaurants';
import SectionDishOfType from '@/components/SectionDishOfType/SectionDishOfType';
import { DEMO_POSTS_AUDIO } from '@/data/posts';
import { DishType } from '@/types/dishType';
import SectionDishOfType2 from '@/components/SectionDishOfType2/SectionDishOfType2';
const Home = () => {
    const dishTypes: DishType[] = [
        {
            id: "1",
            name: "Food"
        },
        {
            id: "1",
            name: "Dish"
        }
    ]
    const renderDishOfType = () => dishTypes.map((dishType, index) => index % 2 == 0 ? <SectionDishOfType className='mt-10' key={dishType.id} heading={dishType.name} subHeading='Delicious' posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)} /> :
        <SectionDishOfType2 className='mt-10' key={dishType.id} subHeading="delicious" heading={dishType.name} posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)} />)
    return (
        <>
            {renderDishOfType()}
        </>
    )
}

export default Home