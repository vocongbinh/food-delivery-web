"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import NcModal from "@/components/NcModal/NcModal";
import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import { ReviewsApi } from "@/apis/reviews";
import { useCustomMutation } from "@/hooks/useCustomMutation";

export interface ModalEditCommentProps {
  show: boolean;
  id: number;
  restaurantId: number;
  onCloseModalEditComment: () => void;
}

const ModalEditComment: FC<ModalEditCommentProps> = ({
  show,
  id,
  restaurantId,
  onCloseModalEditComment,
}) => {
  const [rating, setRating] = useState<number>(0);
  const { mutate } = useCustomMutation({
    key: "reviews",
    id,
    type: "update",
    queryKey: ["reviews", restaurantId],
});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = async() => {
    const data = {
      comment: textareaRef.current?.value || "",
    }
    mutate(data)
    onCloseModalEditComment()
  }
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
          (element as HTMLTextAreaElement).setSelectionRange(
            (element as HTMLTextAreaElement).value.length,
            (element as HTMLTextAreaElement).value.length
          );
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <SingleCommentForm
        rating={rating}
        setRating={setRating}
        className="mt-0"
        onClickCancel={onCloseModalEditComment}
        onClickSubmit={handleSubmit}
        defaultValue={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi consequuntur perferendis maxime quia, quisquam eveniet asperiores fuga laudantium necessitatibus assumenda!"
        }
        textareaRef={textareaRef}
        rows={8}
      />
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalEditComment}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Editing comment"
    />
  );
};

export default ModalEditComment;
