"use client"

import ButtonPrimary from '@/components/Button/ButtonPrimary'
import { User } from '@/data/types'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { getPrefetchQuery, useCustomQuery } from '@/hooks/useCustomQuery'
import { uploadImageToStrapi, urlToFile } from '@/utils/apiHelpers'
import { http } from '@/utils/http'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LoginSuccess = () => {
  const { data } = useSession();
  const queryClient = new QueryClient();
  useEffect(() => {
    const fetchMe = async () => {
      const data: User = await queryClient.fetchQuery(getPrefetchQuery({ key: "users/me" }))
      if (!data.avatar) {
        // const file = await urlToFile(image, "avatar.jpg");
        // const avatarId = await uploadImageToStrapi(file);
        await http.put(`/users/${data.id}`, { avatar: 164 });
      }
    }
    fetchMe()
    const session = data as any;
    if (session?.jwt) {
      localStorage.setItem("token", session.jwt as string);
    }
  }, [data]);
  return (
    <div className='p-4 flex flex-col gap-4 items-center'>
      <CheckCircleIcon className='w-14 h-14 text-green-500' />
      <h2 className='font-semibold text-2xl text-center'>You Successfully logged in!</h2>
      <span className='text-sm text-center py-5'>Please set your email and password in  “Account Setting” page.</span>
      <Link className='w-full' href="/settings">
        <ButtonPrimary className='w-full'>Go to &quot;Profile Setting&quot;</ButtonPrimary>
      </Link>
    </div>
  )
}

export default LoginSuccess