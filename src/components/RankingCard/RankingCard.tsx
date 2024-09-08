import { Token } from '@/data/types'
// import { Table, TableBody, TableRow, TableCell, styled } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
// const CustomTableCell = styled(TableCell)({
//     borderBottom: 'none',
//     padding: '10px'
// });


const RankingCard = ({ title, tokens }: { title: string, tokens: any[] }) => {
    return (
        <div className='p-2 bg-white rounded-xl'>
            <div className='flex justify-between items-end p-4'>
                <span className='lg:text-xl text-base font-bold flex items-center '>{title} <ArrowUpRightIcon className='w-5 h-5 ml-2' /> </span>
                <span className="font-semibold lg:text-sm text-xs text-blue-500">See more</span>
            </div>
            {/* <Table >
                <TableBody>
                    {(tokens).map((token, index) => (
                        <TableRow
                            key={token.market_cap_rank}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <CustomTableCell >{index + 1}</CustomTableCell>
                            <CustomTableCell component="th" scope="row">
                                <div className="flex items-center">
                                    <Image src={token.item.large} width={60} height={60} alt="" className="w-4 lg:w-6 mr-4" />
                                    <span> {token.item.name}</span>
                                </div>
                            </CustomTableCell >
                            <CustomTableCell align="right">${Number(token.item.data.price).toFixed(5)}</CustomTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </div>
    )
}

export default RankingCard