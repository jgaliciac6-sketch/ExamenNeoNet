export type ActionStateType = {
  errors: string[];
  success: boolean;
  message?: string;
};

export const initialActionState: ActionStateType = {
  errors: [],
  success: false,
};
