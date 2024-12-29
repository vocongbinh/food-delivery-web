"use client";
import React, { FC, Fragment } from "react";
import ButtonClose from "../ButtonClose/ButtonClose";
import MessageItem from "./MessageItem";
import Input from "../Input/Input";
import { CogIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ChatbotApi } from "@/apis/chatbot";
import styles from "./Chatbot.module.css";
import clsx from "clsx";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
interface ChatbotProps {
  className?: string;
}

export interface Message {
  text: string;
  isUser: boolean;
}
const Chatbot: FC<ChatbotProps> = ({ className = "" }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    setMessages([...messages, { text: inputValue, isUser: true }]);
    setInputValue("");
    try {
      setLoading(true);
      console.log(inputValue)
      const resMessage = await ChatbotApi.getMessageRes(inputValue);
      setLoading(false);
      setMessages([
        ...messages,
        { text: inputValue, isUser: true },
        { text: resMessage, isUser: false },
      ]);
    } catch (e:any) {
      throw new Error(e.message);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="ControlSelections relative z-40 hidden md:block">
      <div className="fixed right-10 bottom-6 z-40 flex items-center">
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`w-16 h-16 hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-full shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${open ? " focus:ring-2 ring-primary-500" : ""
                  }`}
              >
                <Image src="/chatbot.png" alt="chatbot" fill className="rounded-full" />
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
                <Popover.Panel className="absolute bottom-0 right-20 z-10 mt-3 w-screen max-w-sm h-[450px]">
                  <div
                    className={`w-full h-full rounded-xl ${className} flex flex-col z-10 bg-white`}
                  >
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-700 rounded-t-xl w-full flex items-center justify-between">
                      <div className="text-white flex items-center">
                        <Image src="/chatbot.png" width={50} height={50} alt="" />
                        <div>
                          <h2 className="font-semibold">Dfood Chatbot</h2>
                          <h2 className="text-xs text-neutral-200">24x7 Support Bot</h2>
                        </div>


                      </div>

                      <ButtonClose onClick={() => close()} />
                    </div>
                    <div className="flex flex-col gap-4 p-4 flex-1 overflow-auto">
                      {messages.map((message, index) => (
                        <MessageItem
                          className={`${message.isUser == true ? "self-end" : "self-start"
                            } max-w-[84%]`}
                          key={index}
                          message={message}
                        />
                      ))}
                      {loading && (
                        <div className="flex items-center w-fit gap-2 bg-gray-100 px-3 py-3 rounded-2xl">
                          <div
                            className={`w-2 h-2 bg-black rounded-full ${clsx(
                              styles.translateUp
                            )}`}
                          ></div>
                          <div
                            className={`w-2 h-2 bg-black rounded-full ${clsx(
                              styles.translateDown
                            )}`}
                          ></div>
                          <div
                            className={`w-2 h-2 bg-black rounded-full ${clsx(
                              styles.translateUp
                            )}`}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 w-full flex gap-2 items-center justify-between border-t-1 border-neutral-200 shadow-2xl">
                      <input
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="w-full focus:outline-none focus:ring-0 focus:border-none outline-none border-none text-sm"
                        placeholder="Type a message..."
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
