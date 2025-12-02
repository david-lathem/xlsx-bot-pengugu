export interface RedeemCode {
  redeemCode: string;
  talentName: string;
}

export type queryByCode = Omit<RedeemCode, "talentName">;
export type queryByTalent = Omit<RedeemCode, "redeemCode">;

export interface Talent {
  talentName: string;
  roleId: string;
}

export type queryByTalentName = Omit<Talent, "roleId">;
