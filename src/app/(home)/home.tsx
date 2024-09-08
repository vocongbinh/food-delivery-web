"use client"
import { useCustomQuery } from '@/hooks/useCustomQuery'
import React from 'react'
import { Advertisement, Application, Blog, Category, Community, DataResponse } from '@/data/types';
import SectionAdvertisements from '@/components/SectionAdvertisements/SectionAdvertisements';
import SectionAppsOfCategory from '@/components/SectionAppsOfCategory/SectionAppsOfCategory';
import SectionBlog from '@/components/SectionBlog/SectionBlog';
import { retrieveDataFromResponse } from '@/utils/retrieveDataFromResponse';
import SectionCommunities from '@/components/SectionCommunities/SectionCommunities';
import { useQuery } from '@tanstack/react-query';
import { RestaurantsApi } from '@/apis/restaurants';

const Home = () => {
    return (
        <>
        </>
    )
}

export default Home