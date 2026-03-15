export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
  };

  mission: {
    title: string;
    paragraphs: string[];
  };

  platform: {
    title: string;
    paragraphs: string[];
  };

  features: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };

  disclaimer: {
    title: string;
    paragraphs: string[];
  };
}
