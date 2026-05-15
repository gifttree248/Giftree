export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    _type?: string;
    asset?: {
      _ref?: string;
      _type?: string;
      url?: string;
    };
    alt?: string;
  } | null;
};

