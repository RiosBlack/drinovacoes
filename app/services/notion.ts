"use server";
import { Client } from "@notionhq/client";
import { NotionGet, PortfolioItem } from "@/app/types/notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = "12d88898e6df80fc997cd204a0701861";

export async function getPortifolio(): Promise<PortfolioItem[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.results.map((post: any) => ({
    data: (post as NotionGet).properties.Data.rich_text[0]?.plain_text,
    Projeto: (post as NotionGet).properties.Projeto.title[0]?.text?.content,
    Capa: (post as NotionGet).properties.Capa.rich_text[0]?.plain_text,
    Foto1: (post as NotionGet).properties.Foto1.rich_text[0]?.plain_text,
    Foto2: (post as NotionGet).properties.Foto2.rich_text[0]?.plain_text,
    Foto3: (post as NotionGet).properties.Foto3.rich_text[0]?.plain_text,
    Descricoes: (post as NotionGet).properties.Descricoes.rich_text[0]
      ?.plain_text,
    Link: (post as NotionGet).properties.Link.rich_text[0]?.plain_text,
    Tech1: (post as NotionGet).properties.Tech1.rich_text[0]?.plain_text,
    Tech2: (post as NotionGet).properties.Tech2.rich_text[0]?.plain_text,
    Tech3: (post as NotionGet).properties.Tech3.rich_text[0]?.plain_text,
    Tech4: (post as NotionGet).properties.Tech4.rich_text[0]?.plain_text,
    Tech5: (post as NotionGet).properties.Tech5.rich_text[0]?.plain_text,
    Tech6: (post as NotionGet).properties.Tech6.rich_text[0]?.plain_text,
    Index: (post as NotionGet).properties.Index.rich_text[0]?.plain_text,
    DescricaoBreve: (post as NotionGet).properties.DescricaoBreve.rich_text[0]
      ?.plain_text,
    Miniatura: (post as NotionGet).properties.Miniatura.rich_text[0]
      ?.plain_text,
  }));
}

export async function getPortifolioById(id: string): Promise<PortfolioItem[]> {
  const responseDate = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Index",
      title: {
        equals: id,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return responseDate.results.map((post: any) => ({
    Data: (post as NotionGet).properties.Data.rich_text[0]?.plain_text,
    Projeto: (post as NotionGet).properties.Projeto.title[0]?.text?.content,
    Capa: (post as NotionGet).properties.Capa.rich_text[0]?.plain_text,
    Foto1: (post as NotionGet).properties.Foto1.rich_text[0]?.plain_text,
    Foto2: (post as NotionGet).properties.Foto2.rich_text[0]?.plain_text,
    Foto3: (post as NotionGet).properties.Foto3.rich_text[0]?.plain_text,
    Descricoes: (post as NotionGet).properties.Descricoes.rich_text[0]
      ?.plain_text,
    Link: (post as NotionGet).properties.Link.rich_text[0]?.plain_text,
    Tech1: (post as NotionGet).properties.Tech1.rich_text[0]?.plain_text,
    Tech2: (post as NotionGet).properties.Tech2.rich_text[0]?.plain_text,
    Tech3: (post as NotionGet).properties.Tech3.rich_text[0]?.plain_text,
    Tech4: (post as NotionGet).properties.Tech4.rich_text[0]?.plain_text,
    Tech5: (post as NotionGet).properties.Tech5.rich_text[0]?.plain_text,
    Tech6: (post as NotionGet).properties.Tech6.rich_text[0]?.plain_text,
    Index: (post as NotionGet).properties.Index.rich_text[0]?.plain_text,
    DescricaoBreve: (post as NotionGet).properties.DescricaoBreve.rich_text[0]
      ?.plain_text,
    Miniatura: (post as NotionGet).properties.Miniatura.rich_text[0]
      ?.plain_text,
  }));
}

export async function getNotionClient(): Promise<Client> {
  return notion;
}
