export interface PortfolioItem {
  data: string;
  Projeto?: string;
  Capa?: string;
  Foto1?: string;
  Foto2?: string;
  Foto3?: string;
  Descricoes?: string;
  Link?: string;
  Tech1?: string;
  Tech2?: string;
  Tech3?: string;
  Tech4?: string;
  Tech5?: string;
  Tech6?: string;
  Index?: string;
  DescricaoBreve?: string;
  Miniatura?: string;
}

export interface NotionGet {
  properties: {
    Projeto: { title: { text: { content: string } }[] };
    Capa: { rich_text: { plain_text: string }[] };
    Foto1: { rich_text: { plain_text: string }[] };
    Foto2: { rich_text: { plain_text: string }[] };
    Foto3: { rich_text: { plain_text: string }[] };
    Descricoes: { rich_text: { plain_text: string }[] };
    Link: { rich_text: { plain_text: string }[] };
    Tech1: { rich_text: { plain_text: string }[] };
    Tech2: { rich_text: { plain_text: string }[] };
    Tech3: { rich_text: { plain_text: string }[] };
    Tech4: { rich_text: { plain_text: string }[] };
    Tech5: { rich_text: { plain_text: string }[] };
    Tech6: { rich_text: { plain_text: string }[] };
    Index: { rich_text: { plain_text: string }[] };
    DescricaoBreve: { rich_text: { plain_text: string }[] };
    Miniatura: { rich_text: { plain_text: string }[] };
    Data: { rich_text: { plain_text: string }[] };
  };
}
