"use client";
import React, { FC, Fragment } from "react";
import ButtonClose from "../ButtonClose/ButtonClose";
import MessageItem from "./MessageItem";
import Input from "../Input/Input";
import { CogIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ChatbotApi } from "@/apis/chatbot";
import { Popover, Transition } from "@headlessui/react";
interface ChatbotProps {
  className?: string;
}

export interface Message {
  text: string;
  isUser: boolean;
}
const Chatbot: FC<ChatbotProps> = ({ className = "" }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue("");
    try {
      const resMessage = await ChatbotApi.getMessageRes(inputValue);
      setMessages([
        ...messages,
        { text: inputValue, isUser: true },
        { text: resMessage, isUser: false },
      ]);
    } catch (e) {
      throw new Error("Can't not get response message");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  return (
    <div className="ControlSelections relative z-40 hidden md:block">
      <div className="fixed right-3 bottom-3 z-40 flex items-center">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${
                  open ? " focus:ring-2 ring-primary-500" : ""
                }`}
              >
                <CogIcon className="w-8 h-8" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute bottom-0 right-14 z-10 mt-3 w-screen max-w-sm h-[400px]">
                  <div
                    className={`w-full h-full rounded-xl ${className} flex flex-col z-10 bg-white`}
                  >
                    <div className="px-4 py-3 bg-blue-400 rounded-t-xl w-full flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {" "}
                        DFood Chatbot
                      </span>
                      <ButtonClose onClick={() => close()} />
                    </div>
                    <div className="flex flex-col gap-4 p-4 flex-1 overflow-auto">
                      {messages.map((message, index) => (
                        <MessageItem
                          className={`${
                            message.isUser == true ? "self-end" : "self-start"
                          } max-w-[84%]`}
                          key={index}
                          message={message}
                        />
                      ))}
                    </div>
                    <div className="rounded-2xl p-2 w-full flex gap-2 items-center justify-between">
                      <input
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="w-full focus:outline-none rounded-2xl bg-blue-200 p-2 outline-none border-none"
                        placeholder="Type a message"
                      />
                      <PaperAirplaneIcon
                        className="w-6 h-6 text-blue-500 hover:text-blue-600 cursor-pointer"
                        onClick={handleSend}
                      />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Chatbot;
