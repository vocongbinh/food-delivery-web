"use client"
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import Button from '@/components/Button/Button'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor';
import { useCustomMutation } from '@/hooks/useCustomMutation';

const CreatePostPage = () => {
    const [content, setContent] = useState('');
    const { mutate } = useCustomMutation({ key: "blogs", type: "create", })
    const handleSave = () => {
        const data = {
            content: content,
            name: "binhh"
        }
        mutate({ data })
    }

    return (
        <div className='container'>
            <header className='flex justify-between py-4'>
                < Button className="!hidden md:!flex " pattern="white" sizeClass="px-6 py-2">
                    <ArrowLeftIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
                    <span>My post</span>
                </Button>
                <h2 className='md:text-xl text-base font-bold'>Create New Post</h2>
                < Button onClick={handleSave} className="!hidden md:!flex " pattern="primary" sizeClass="px-6 py-2">
                    <span>Save And Publish</span>
                </Button>
            </header>
            <div className='mt-20'>
                <div>
                    <label>Content</label>
                    <RichTextEditor value={content} onChange={setContent} />

                </div>
                
               

            </div>
        </div>
    )

}

export default CreatePostPage