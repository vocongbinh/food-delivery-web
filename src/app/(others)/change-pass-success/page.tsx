"use client"
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import { User } from '@/data/types'
import { useCustomMutation } from '@/hooks/useCustomMutation'
import { getPrefetchQuery, useCustomQuery } from '@/hooks/useCustomQuery'
import { uploadImageToStrapi, urlToFile } from '@/utils/apiHelpers'
import http from '@/utils/http'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ChangePassSuccess = () => {
  return (
    <div className='p-4 flex flex-col gap-4 items-center'>
      <CheckCircleIcon className='w-14 h-14 text-green-500' />
      <h2 className='font-semibold text-2xl text-center'>Password changed</h2>
      <span className='text-sm text-center py-5'>Your password has been successfully changed.<br />
        Please log in with the new password. </span>
      <Link className='w-full' href="/login">
        <ButtonPrimary className='w-full'>Log In</ButtonPrimary>
      </Link>
    </div>
  )
}

export default ChangePassSuccess