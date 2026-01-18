// TODO: Analyze if better typing makes sense here
export type Category = string;

export type Operation = {
  amount: number;
  type: string;
  category: Category | null;
  notes: string;
};
