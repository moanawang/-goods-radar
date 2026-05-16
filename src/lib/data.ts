export type Stall = {
  id: string;
  stallNumber: string;
  ownerName: string;
  ipList: string[];
  description: string;
  imageUrl: string;
  createdAt: string;
};

export type StallRow = {
  id: string;
  stall_number: string;
  owner_name: string;
  ip_list: string[];
  description: string;
  image_url: string;
  created_at: string;
};

export const popularIps = [
  "鬼灭之刃",
  "咒术回战",
  "间谍过家家",
  "灌篮高手",
  "排球少年",
];

export const ipAliases: Record<string, string[]> = {
  鬼灭之刃: ["jump系", "日本ip"],
  咒术回战: ["jump系", "日本ip"],
  间谍过家家: ["日本ip", "萌物ip"],
  灌篮高手: ["运动番", "日本ip"],
  排球少年: ["运动番", "jump系"],
};

export function mapStallRow(row: StallRow): Stall {
  return {
    id: row.id,
    stallNumber: row.stall_number,
    ownerName: row.owner_name,
    ipList: row.ip_list,
    description: row.description,
    imageUrl: row.image_url,
    createdAt: row.created_at,
  };
}
