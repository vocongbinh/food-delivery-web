import React, { FC } from 'react'
import { Message } from './Chatbot'

interface MessageItemProps {
    className?: string;
    message: Message
}
const MessageItem:FC<MessageItemProps> = ({message, className = ""}) => {
    const {text, isUser} = message
  return (
    <div className = {`inline-flex items-center gap-4 justify-between py-2 px-4 ${isUser ? 'bg-[#cfcfcf] rounded-t-3xl rounded-bl-3xl': 'bg-blue-500 rounded-t-3xl rounded-br-3xl'} ${className}`}>
        <span className={`${isUser ? 'text-black' : 'text-white'}`}>{text}</span>
    </div>
  )
}

export default MessageItem