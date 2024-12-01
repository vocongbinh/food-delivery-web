export type GroupOption = {
  id: number;
  optionItems: GroupOptionItem[];
  name: string;
  minimum: number;
  maximum: number;
  optional: boolean;
};

export type GroupOptionItem = {
  id: number;
  name: string;
  price: number;
};
export type GroupOptionItemRequest = Omit<GroupOptionItem, "id">;
export type GroupOptionRequest = {
  optionItems: GroupOptionItemRequest[];
  name: string;
  minimum: number;
  maximum: number;
  isOptional: boolean;
  restaurantId: number;
};
