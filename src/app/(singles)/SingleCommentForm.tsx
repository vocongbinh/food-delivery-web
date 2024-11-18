"use client"
import React, { FC, RefObject } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useAuthContext } from "@/contexts/auth/auth-context";

export interface SingleCommentFormProps {
  className?: string;
  onClickSubmit: () => void;
  onClickCancel?: () => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  defaultValue?: string;
  rows?: number;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = "",
  rows = 4,
}) => {
  const token = "đsd";
  const [text, setText] = React.useState("");
  const handleCancel = () => {
    setText("")
  }
  console.log(text)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textareaRef.current) {
      onClickSubmit();
      setText("")
    }
  };


  return (
    <form action="#" className={`nc-SingleCommentForm ${className}`} onSubmit={handleSubmit}>
      <Textarea
        placeholder="Enter review text"
        ref={textareaRef}
        value={text}
        required={true}
        onChange={(e) => setText(e.target.value)}
        rows={rows}
      />

      {token == "" ?
        <span className="text-sm"><Link href="/login" className="text-blue-600 font-semibold">Sign in</Link> to leave a review</span> :
        <div className="mt-2 justify-between flex">
          <span className="text-sm">Write a comment and rate app to submit a review</span>
          <div className="flex gap-2">
            {text.trim() !== "" && <Button onClick={handleCancel} pattern="white" className="border border-red-500 text-red-500">Cancel</Button>}
            <ButtonPrimary type="submit" className="rounded-full">
              Post Review
            </ButtonPrimary></div>
        </div>}



    </form>
  );
};

export default SingleCommentForm;
