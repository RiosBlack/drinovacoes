import { portfolioItems } from "@/app/data/portfolio";
import { PortfolioItem } from "@/app/types/portfolio";

export async function getPortifolio(): Promise<PortfolioItem[]> {
  return portfolioItems;
}

export async function getPortifolioById(id: string): Promise<PortfolioItem[]> {
  return portfolioItems.filter((item) => item.Index === id);
}
