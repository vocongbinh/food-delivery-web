"use client"
import React, { useMemo } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

import { Table, TableProps } from 'antd';
import { IconButton } from '@mui/material';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { Dish } from '@/types';
import { UserWishlistApi } from '@/apis/user-wishlist';
import { UserWishlistRes } from '@/types/user-wishlist';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import ConfirmRemoveDialog from '@/components/ConfirmRemoveDialog/ConfirmRemoveDialog';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { m } from 'framer-motion';

interface DataType extends UserWishlistRes {
  key: string;
  delete: boolean;
  stockStatus: string;
  action: string;
}

export default function WishListPage() {
  const { data: wishlist, isLoading } = useQuery({ queryKey: ['wishlist'], queryFn: () => UserWishlistApi.getWishlist()})
  const { mutate } = useCustomMutation({
      key: "user-wishlist",
      type: "delete",
      queryKey: ["wishlist"],
    });
    const columns: TableProps<DataType>['columns'] = [
      {
        title: '',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) =>
          <ConfirmRemoveDialog isOpen={true} title='Are you sure to remove Dish from Wishlist?' handleConfirm={() => {
            mutate({ id: record.id })
          }}>
            <IconButton
    
            ><TrashIcon className='h-6 w-6 dark:text-white text-red-500' /></IconButton>
          </ConfirmRemoveDialog>
        ,
      },
      {
        title: 'Dish Image',
        dataIndex: 'image',
        key: 'image',
        onHeaderCell: (column) => { return { className: 'text-black dark:text-white text-base' } },
        render: (text, record) => {
          const imageUrl = record.imageUrl!.split(", ")[0]
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={imageUrl} alt={imageUrl} className='h-16 w-16 ext-black dark:text-white text-base' />
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: (column) => { return { className: 'text-black dark:text-white text-base' } },
        render: (text, record) => <span className='text-black dark:text-white text-base'>{record.name}</span>,
      },
      {
        title: 'Unit Price',
        dataIndex: 'price',
        key: 'price',
        onHeaderCell: (column) => { return { className: 'text-black dark:text-white text-base' } },
        render: (text, record) => <span className='text-black dark:text-white text-base'>{record.price}</span>,
      },
      {
        title: 'Stock Status',
        dataIndex: 'stockStatus',
        key: 'stockStatus',
        onHeaderCell: (column) => { return { className: 'text-black dark:text-white text-base' } },
        render: (text, record) => <span className='text-black dark:text-white text-base'>{record.stockStatus}</span>,
    
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => <ButtonPrimary>ADD TO CART</ButtonPrimary>
      }
    ]
  const data: DataType[] = useMemo(() => (wishlist || []).map((item) => ({ ...item, key: item.id.toString(), delete: true, action: 'Add to Cart', stockStatus: 'In Stock', dishId: item.dishId })), [wishlist])
  return (
    <div className='container py-10'>
      <h1 className='flex justify-items-center gap-4 text-xl dark:text-white text-black'>My WishList <PencilSquareIcon className='h-6 w-6 dark:text-white text-black' /></h1>
      {isLoading ? <Spinner /> : <Table<DataType> columns={columns}
        dataSource={data} className='mt-10' />}

    </div>
  )
}
