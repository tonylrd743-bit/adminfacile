export type ChantierEstimateResult = {
  title: string;
  estimation: string;
  priceMin: number;
  priceMax: number;
  businessContext: string;
  estimatedTime: string;
  profitability: string;
  difficulty: "Faible" | "Moyenne" | "Élevée" | "Complexe";
  summary: string;
  whyThisPrice: string[];
  marketPosition: string;
  professionalAdvice: string[];
  recapRows: Array<{
    label: string;
    detail: string;
    amount: string;
  }>;
  badges: string[];
  emailSubject: string;
  emailBody: string;
  quoteService: string;
  quoteDetails: string;
};
